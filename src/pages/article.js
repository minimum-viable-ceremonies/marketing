import React, { useRef, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../data/locales"

const ArticlePage = ({ pageContext: { slug, html, title, custom_excerpt, featured_image } }) => {
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
      <SEO page="article" meta={{
        title: title,
        description: custom_excerpt,
        url: `${document.location.origin}/articles/${slug}`,
        image: featured_image
      }} />
      <div ref={articleRef} className="article pb-24 mt-24 md:mt-12 m-auto max-w-screen-sm">
        <h1 className="mb-6">{title}</h1>
        <div className="article__content" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  )
}

export default ArticlePage
