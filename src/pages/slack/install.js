import React from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import "../../data/locales"

const SlackInstallPage = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()

  return (
    <Layout>
      <SEO page={`slack_install`} />
      <center>
        <h1 className="mb-12">{t(`slack.install.title`)}</h1>
        <p className="text-lg mb-12">{t(`slack.install.helptext`)}</p>
        <a
          onClick={() => trackEvent({ category: 'call-to-action', action: 'install-slack', name: 'slack-page' })}
          href={`https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=commands`}
          className="cta-link primary"
        >{t("slack.install.callToAction")}</a>
      </center>
    </Layout>
  )
}

export default SlackInstallPage
