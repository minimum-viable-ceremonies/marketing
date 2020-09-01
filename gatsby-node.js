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
      slug: String
      path: String
      title: String
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
  }).then(({ result: { blockIds }, recordMap: { block } }) => (
    Object.entries(block)
    .filter(([id]) => blockIds.includes(id))
    .map(([_, { value: { id } }]) => (
      notion.getPageById(id).then(({ title, titleString, content }) => (
        createNode({
          id,
          parent: null,
          children: [],
          contentType: 'Article',
          internal: {
            type: 'Article',
            mediaType: 'text/html',
            content: title.concat(content),
            contentDigest: createContentDigest(id),
            description: titleString
          }
        })
      ))
    ))
  ))
}

exports.onCreateNode = ({ node, actions: { createNodeField, createPage } }) => {
  const { description, content, type } = node.internal

  if (type === 'Article') {
    const slug = parameterize(description)
    const path = `/articles/${slug}`
    console.log(`creating article at ${path}...`)

    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'title', value: description })
    createNodeField({ node, name: 'path', value: path })
    createPage({
      path,
      component: require.resolve('./src/pages/article.js'),
      context: { description, content }
    })
  }
}
