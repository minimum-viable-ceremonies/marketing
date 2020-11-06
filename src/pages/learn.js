import React from "react"

import Layout from "../components/layout"
import Learn from "../components/learn"
import SEO from "../components/seo"

import initTranslations from "../locales/react"
initTranslations('marketing')

const LearnPage = () => {
  return (
    <Layout>
      <SEO page="learn" />
      <Learn />
    </Layout>
  )
}

export default LearnPage
