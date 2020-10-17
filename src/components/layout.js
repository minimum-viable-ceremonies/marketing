import React from "react"
import FreshChat from "react-freshchat"
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react"
import "../styles/layout.scss"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, breadcrumb, options = {} }) => (
  <MatomoProvider value={process.env.MATOMO_SITE_ID ? createInstance({
    urlBase: process.env.MATOMO_URL,
    siteId: process.env.MATOMO_SITE_ID
  }) : {}}>
    {process.env.FRESHCHAT_TOKEN && <FreshChat
      token={process.env.FRESHCHAT_TOKEN}
      host={process.env.FRESHCHAT_HOST}
      siteId={process.env.FIREBASE_DOMAIN}
      frameDivId="freshchat"
      onInit={widget => options.openChat && widget.open()}
    />}
    <Header breadcrumb={breadcrumb} />
    <main>{children}</main>
    <Footer />
  </MatomoProvider>
)

export default Layout
