import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Marketing from "../components/marketing"

import "../data/locales"

const IndexPage = () => (
  <Layout>
    <SEO page="home" />
    <Marketing />
  </Layout>
)

export default IndexPage
