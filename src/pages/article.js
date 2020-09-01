import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ArticlePage = ({ pageContext }) => {
  return (
    <Layout>
      <SEO page="article" />
      <div dangerouslySetInnerHTML={{__html: pageContext.content}} />
    </Layout>
  )
}

export default ArticlePage
