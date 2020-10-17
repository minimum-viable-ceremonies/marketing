import React, { useEffect } from "react"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Help from "../components/help"

import "../data/locales"

const HelpPage = () => {
  const { trackPageView } = useMatomo()

  useEffect(() => { trackPageView() }, [trackPageView])

  return (
    <Layout options={{openChat: true}}>
      <SEO page="help" />
      <Help />
    </Layout>
  )
}

export default HelpPage
