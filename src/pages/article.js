import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ArticlePage = ({ pageContext: { description, html } }) => {
  return (
    <Layout>
      <SEO page="article" />
      <h1>{description}</h1>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  )
}

export default ArticlePage
