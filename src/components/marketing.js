import React, { useEffect } from "react"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Header from "./header"
import Hero from "./hero"
import What from "./what"
import Who from "./who"
import How from "./how"
import Features from "./features"
import GetStarted from "./getStarted"
import Testimonials from "./testimonials"
import Footer from "./footer"

const Marketing = () => {
  const { trackPageView } = useMatomo()

  useEffect(() => { trackPageView() }, [trackPageView])

  return <>
    <Header />
    <Hero />
    <What />
    <Who />
    <How />
    <Features />
    <GetStarted />
    <Testimonials />
    <Footer />
  </>
}

export default Marketing
