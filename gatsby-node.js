const { createAgent } = require("notionapi-agent")
const Notion = require("get-notion-contents").default
const notion = new Notion('')
const parameterize = require('parameterize')
const path = require('path')

exports.createSchemaCustomization = ({ actions: { createTypes } }) => (
  createTypes(`
    type Article implements Node {
      fields: ArticleField
    }
    type ArticleField {
      title: String
      slug: String
      path: String
      blurb: String
      preview: String
      published: Boolean
    }
  `)
)

exports.createPagesStatefully = ({ actions: { createNode }, createContentDigest }) => {
  if (!process.env.NOTION_COLLECTION_ID || !process.env.NOTION_COLLECTION_VIEW) { return }
  console.log('Fetching blog articles from Notion...')

  createAgent().queryCollection({
    collectionId: process.env.NOTION_COLLECTION_ID,
    collectionViewId: process.env.NOTION_COLLECTION_VIEW,
    loader: { type: "table" }
  }).then(({ result: { blockIds }, recordMap: { collection, block } }) => {
    const schema = Object.entries(Object.values(collection)[0].value.schema)
      .map(([key, { name }]) => [name, key])
      .reduce((result, [name, key]) => ({ ...result, [name]: key }), {})

    Object
      .entries(block)
      .filter(([id]) => blockIds.includes(id))
      .map(([_, { value: { id, properties } }]) => (
        notion.getPageById(id).then(({ title, titleString, content }) => (
          createNode({
            id,
            parent: null,
            children: [],
            contentType: 'Article',
            internal: {
              type: 'Article',
              mediaType: 'text/html',
              content: JSON.stringify({
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
  })
}

const parseBlurb = (properties, { blurb }) =>
  properties[blurb] && properties[blurb][0][0]

const parsePreview = (properties, { preview }) =>
  properties[preview] && properties[preview][0][0]

const parsePublished = (properties, { published }) =>
  !!properties[published]

exports.onCreateNode = ({ node, actions: { createNodeField, createPage } }) => {
  const { type, content, description } = node.internal

  if (type === 'Article') {
    const { slug, path, blurb, published, preview, html } = JSON.parse(content)
    console.log(`creating article at ${path}...`)

    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'path', value: path })
    createNodeField({ node, name: 'blurb', value: blurb })
    createNodeField({ node, name: 'preview', value: preview})
    createNodeField({ node, name: 'published', value: published })
    createNodeField({ node, name: 'title', value: description })
    createPage({
      path,
      component: require.resolve('./src/pages/article.js'),
      context: { slug, path, blurb, preview, published, description, html }
    })
  }
}
