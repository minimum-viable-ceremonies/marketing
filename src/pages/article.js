import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ArticlePage = ({ pageContext: { description, html, meta } }) => {
  return (
    <Layout>
      <SEO page="article" meta={meta} />
      <h1>{description}</h1>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  )
}

export default ArticlePage
