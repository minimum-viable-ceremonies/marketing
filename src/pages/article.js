import React, { useEffect } from "react"
import { useMatomo } from "@datapunt/matomo-tracker-react"
import { document } from "browser-monads"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import initTranslations from "../locales/react"
initTranslations('marketing')

const ArticlePage = ({ pageContext: { slug, html, title, custom_excerpt, feature_image, primary_tag } }) => {
  const { trackPageView } = useMatomo()
  const { name } = primary_tag || {}

  useEffect(() => { trackPageView() }, [trackPageView])

  return (
    <Layout breadcrumb={<Link to="/learn">Back</Link>}>
      <SEO page="article" meta={{
        title: title,
        description: custom_excerpt,
        url: `${document.location.origin}/articles/${slug}`,
        image: feature_image
      }} />
      <div className="article pb-24 mt-24 md:mt-12 m-auto max-w-screen-sm">
        {feature_image && name !== 'update' && <img className="article-hero mb-8 w-full h-auto" alt={title} src={feature_image} />}
        <h1 className="mb-6">{title}</h1>
        <div className="article__content" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  )
}

export default ArticlePage
