import React, { useRef, useMemo, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../data/locales"

const ArticlePage = ({ pageContext: { html, meta } }) => {
  const title = useMemo(() => meta ? meta.title : '', [meta])
  const articleRef = useRef()
  useEffect(() => {
    if (!articleRef.current) { return }

    articleRef.current.querySelectorAll('iframe').forEach(({ parentElement }) => {
      parentElement.style.opacity = "1"
      parentElement.nextElementSibling.style.opacity = "0"
    })
  }, [articleRef])

  return (
    <Layout>
      <SEO page="article" meta={meta} />
      <div ref={articleRef} className="article pb-24 mt-24 md:mt-12 m-auto max-w-screen-sm">
        <h1 className="mb-4">{title}</h1>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  )
}

export default ArticlePage
