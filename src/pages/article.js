import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ArticlePage = ({ pageContext: { description, html, meta } }) => {
  return (
    <Layout>
      <SEO page="article" meta={meta} />
      <div className="mt-12 m-auto lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
        <h1 className="mb-4">{description}</h1>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  )
}

export default ArticlePage
