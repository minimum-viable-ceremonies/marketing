exports.createPages = async ({ graphql, actions: { createPage } }) => (
  await graphql(`query {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] },
    ) {
      edges {
        node {
          slug
          title
          html
          meta_description
          published_at
          feature_image
          primary_tag { name }
          authors { name }
        }
      }
    }
  }`).then(({ data }) => (
    data.allGhostPost.edges
      .filter(({ node }) => ['resource', 'policy', 'update'].includes((node.primary_tag || {}).name))
      .forEach(({ node }) => (
        createPage({
          path: `/articles/${node.slug}`,
          component: require.resolve('./src/pages/article.js'),
          context: node
        })
      )
    )
  ))
)
