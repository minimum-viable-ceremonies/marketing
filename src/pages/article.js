import React, { useEffect } from "react"
import { document } from "browser-monads"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ArticlePage = ({ pageContext: { description, html, meta } }) => {

  useEffect(() => {
    document.querySelectorAll('.article iframe').forEach(({ parentElement }) => {
      parentElement.style.opacity = "1"
      parentElement.nextElementSibling.style.opacity = "0"
    })
  }, [])

  return (
    <Layout>
      <SEO page="article" meta={meta} />
      <div className="article mt-12 m-auto max-w-screen-sm">
        <h1 className="mb-4">{description}</h1>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  )
}

export default ArticlePage
