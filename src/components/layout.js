import React from "react"
import FreshChat from "react-freshchat"
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react"
import "../styles/layout.scss"

const Layout = ({ children }) => (
  <MatomoProvider value={process.env.MATOMO_SITE_ID ? createInstance({
    urlBase: process.env.MATOMO_URL,
    siteId: process.env.MATOMO_SITE_ID
  }) : {}}>
    <FreshChat
      token={process.env.FRESHCHAT_TOKEN}
      host={process.env.FRESHCHAT_HOST}
      siteId={process.env.FIREBASE_DOMAIN}
    />
    <main>{children}</main>
  </MatomoProvider>
)

export default Layout
