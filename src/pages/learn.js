import React from "react"

import Layout from "../components/layout"
import Learn from "../components/learn"
import SEO from "../components/seo"

import "../data/locales"

const LearnPage = () => {
  return (
    <Layout>
      <SEO page="articles" />
      <Learn />
    </Layout>
  )
}

export default LearnPage
