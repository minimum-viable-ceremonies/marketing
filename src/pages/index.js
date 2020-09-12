import React, { useEffect } from "react"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import What from "../components/what"
import Who from "../components/who"
import How from "../components/how"
import Features from "../components/features"
import GetStarted from "../components/getStarted"
import Testimonials from "../components/testimonials"

import "../data/locales"

const IndexPage = () => {
  const { trackPageView } = useMatomo()

  useEffect(() => { trackPageView() }, [trackPageView])

  return (
    <Layout>
      <SEO page="home" />
      <Hero />
      <What />
      <Who />
      <How />
      <Features />
      <GetStarted />
      <Testimonials />
    </Layout>
  )
}

export default IndexPage
