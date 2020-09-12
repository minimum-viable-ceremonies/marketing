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
    type ArticleField {
      type: String
      title: String
      slug: String
      blurb: String
      preview: String
      published: Boolean
      timestamp: Date
      author: Author
    }
  `)
)

exports.createPagesStatefully = ({ reporter, actions: { createNode }, createContentDigest }) => {
  if (!process.env.NOTION_COLLECTION_ID || !process.env.NOTION_COLLECTION_VIEW) { return }
  const agent = createAgent()
  const { start, end, error } = reporter.activityTimer('fetch articles from Notion')
  start()

  agent.queryCollection({
    collectionId: process.env.NOTION_COLLECTION_ID,
    collectionViewId: process.env.NOTION_COLLECTION_VIEW,
    loader: { type: 'table' }
  }).then(({ result: { blockIds }, recordMap: { collection, block } }) => {
    const schema = Object.entries(Object.values(collection)[0].value.schema)
      .map(([key, { name }]) => [name, key])
      .reduce((result, [name, key]) => ({ ...result, [name]: key }), {})

    Object
      .entries(block)
      .filter(([id]) => blockIds.includes(id))
      .map(([_, { value: { id, properties } }]) => (
        notion.getPageById(id).then(({ title, titleString, content }) => (
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
                  blurb: parseBlurb(properties, schema),
                  preview: parsePreview(properties, schema),
                  timestamp: parseTimestamp(properties, schema),
                  published: parsePublished(properties, schema),
                  meta: {
                    title: parseMetaTitle(properties, schema),
                    description: parseMetaDescription(properties, schema),
                    image: parseMetaImage(properties, schema)
                  },
                  html: content
                }),
                contentDigest: createContentDigest(id),
                description: titleString
              }
            })
          ))
        ))
      ))
  }).then(end).catch(error)
}

const parseType = (properties, { type }) =>
  properties[type] && properties[type][0][0]

const parseBlurb = (properties, { blurb }) =>
  properties[blurb] && properties[blurb][0][0]

const parsePreview = (properties, { preview }) =>
  properties[preview] && properties[preview][0][0]

const parsePublished = (properties, { published }) =>
  !!properties[published]

const parseTimestamp = (properties, { timestamp }) =>
  properties[timestamp] && properties[timestamp][0][1][0][1].start_date

const parseMetaTitle = (properties, { metatitle }) =>
  properties[metatitle] && properties[metatitle][0][0]

const parseMetaDescription = (properties, { metadescription }) =>
  properties[metadescription] && properties[metadescription][0][0]

const parseMetaImage = (properties, { metaimage }) =>
  properties[metaimage] && properties[metaimage][0][0]

const parseAuthor = async (agent, properties, { author }) => {
  if (!properties[author]) { return }
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

exports.onCreateNode = ({ node, actions: { createNodeField, createPage } }) => {
  const { content, description } = node.internal

  if (node.contentType === 'Article') {
    const { type, slug, blurb, published, preview, author, timestamp, html, meta } = JSON.parse(content)
    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'blurb', value: blurb })
    createNodeField({ node, name: 'preview', value: preview})
    createNodeField({ node, name: 'published', value: published })
    createNodeField({ node, name: 'author', value: author })
    createNodeField({ node, name: 'timestamp', value: timestamp })
    createNodeField({ node, name: 'title', value: description })
    createNodeField({ node, name: 'meta', value: meta })
    createNodeField({ node, name: 'type', value: type })
    createPage({
      path: `/articles/${slug}`,
      component: require.resolve('./src/pages/article.js'),
      context: { slug, blurb, preview, published, description, html, meta }
    })
  }
}
