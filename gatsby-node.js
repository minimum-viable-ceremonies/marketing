const { createAgent } = require("notionapi-agent")
const Notion = require("get-notion-contents").default
const notion = new Notion('')
const parameterize = require('parameterize')

const authors = {}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => (
  createTypes(`
    type Article implements Node {
      fields: ArticleField
    }
    type Author {
      email: String
      name: String
      avatar: String
    }
    type ArticleMeta {
      title: String
      blurb: String
      image: String
    }
    type ArticleField {
      type: String
      slug: String
      author: Author
      html: String
      timestamp: Date
      meta: ArticleMeta
    }
  `)
)

exports.sourceNodes = async ({ reporter, createContentDigest, actions: { createNode } }) => {
  if (!process.env.NOTION_COLLECTION_ID || !process.env.NOTION_COLLECTION_VIEW) { return }
  const agent = createAgent()
  const { start, end, error } = reporter.activityTimer('fetch articles from Notion')
  start()

  await agent.queryCollection({
    collectionId: process.env.NOTION_COLLECTION_ID,
    collectionViewId: process.env.NOTION_COLLECTION_VIEW,
    loader: { type: 'table' }
  }).then(({ result: { blockIds }, recordMap: { collection, block } }) => {
    const schema = Object.entries(Object.values(collection)[0].value.schema)
      .map(([key, { name }]) => [name, key])
      .reduce((result, [name, key]) => ({ ...result, [name]: key }), {})

    return Promise.all(
      Object
        .entries(block)
        .filter(([id]) => blockIds.includes(id))
        .filter(([_, { value: { properties } }]) => process.env.NODE_ENV === 'development' || parsePublished(properties, schema))
        .map(([_, { value: { id, properties } }]) => (
          notion.getPageById(id).then(({ titleString, content }) => (
            parseAuthor(agent, properties, schema).then(author => (
              createNode({
                id,
                parent: null,
                children: [],
                contentType: 'Article',
                internal: {
                  type: 'Article',
                  mediaType: 'text/html',
                  content: JSON.stringify({
                    author,
                    slug: parameterize(titleString),
                    type: parseType(properties, schema),
                    timestamp: parseTimestamp(properties, schema),
                    meta: {
                      title: titleString,
                      blurb: parseBlurb(properties, schema),
                      image: parsePreview(properties, schema),
                    },
                    html: content
                  }),
                  contentDigest: createContentDigest(id)
                }
              })
            ))
          ))
        ))
    )
  }).then(end).catch(error)
}

const parseType = (properties, { type }) =>
  properties[type] && properties[type][0][0]

const parseBlurb = (properties, { blurb }) =>
  properties[blurb] && properties[blurb][0][0]

const parsePreview = (properties, { preview }) =>
  properties[preview] && properties[preview][0][0]

const parsePublished = (properties, { published }) =>
  properties[published] && properties[published][0][0] === 'Yes'

const parseTimestamp = (properties, { timestamp }) =>
  properties[timestamp] && properties[timestamp][0][1][0][1].start_date

const parseAuthor = async (agent, properties, { author }) => {
  if (!properties || !properties[author]) { return }
  const id = properties[author][0][1][0][1]

  if (!authors[id]) {
    await agent.getRecordValues({ requests: [{ id, table: 'notion_user' }] }).then(
      ({ results: { 0: { value: { given_name, family_name, profile_photo, email } } } }) => (
        authors[id] = {
          email,
          name: [given_name, family_name].join(' '),
          avatar: profile_photo
        }
    ))
  }

  return authors[id]
}

exports.onCreateNode = ({ node, getNode, actions: { createNodeField, createPage } }) => {
  const { content } = node.internal

  if (node.contentType === 'Article') {
    const { slug, type, blurb, preview, author, timestamp, html, meta } = JSON.parse(content)
    createNodeField({ node, name: 'type', value: type })
    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'author', value: author })
    createNodeField({ node, name: 'html', value: html })
    createNodeField({ node, name: 'timestamp', value: timestamp })
    createNodeField({ node, name: 'meta', value: meta })
  }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => (
  await graphql(`query {
    allArticle {
      edges {
        node {
          id
          fields { slug html meta { title blurb image } }
        }
      }
    }
  }`).then(({ data }) => (
    data.allArticle.edges.forEach(({ node: { fields } }) => (
      createPage({
        path: `/articles/${fields.slug}`,
        component: require.resolve('./src/pages/article.js'),
        context: fields
      })
    ))
  ))
)
