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
      title: String
      slug: String
      blurb: String
      preview: String
      published: Boolean
      author: Author
    }
  `)
)

exports.createPagesStatefully = ({ actions: { createNode }, createContentDigest }) => {
  if (!process.env.NOTION_COLLECTION_ID || !process.env.NOTION_COLLECTION_VIEW) { return }
  console.log('Fetching blog articles from Notion...')
  const agent = createAgent()

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
                  path: `/articles/${parameterize(titleString)}`,
                  blurb: parseBlurb(properties, schema),
                  preview: parsePreview(properties, schema),
                  published: parsePublished(properties, schema),
                  html: content
                }),
                contentDigest: createContentDigest(id),
                description: titleString
              }
            })
          ))
        ))
      ))
  })
}

const parseBlurb = (properties, { blurb }) =>
  properties[blurb] && properties[blurb][0][0]

const parsePreview = (properties, { preview }) =>
  properties[preview] && properties[preview][0][0]

const parsePublished = (properties, { published }) =>
  !!properties[published]

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
  const { type, content, description } = node.internal

  if (type === 'Article') {
    const { slug, blurb, published, preview, author, html } = JSON.parse(content)
    console.log(`creating article ${slug}...`)

    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'blurb', value: blurb })
    createNodeField({ node, name: 'preview', value: preview})
    createNodeField({ node, name: 'published', value: published })
    createNodeField({ node, name: 'author', value: author })
    createNodeField({ node, name: 'title', value: description })
    createPage({
      path: `/articles/${slug}`,
      component: require.resolve('./src/pages/article.js'),
      context: { slug, blurb, preview, published, description, html }
    })
  }
}
