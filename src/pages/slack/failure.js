import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"
import Confetti from "react-dom-confetti"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { failureData } from "../../data/confettiData"

import initTranslations from "../../locales/react"
initTranslations('marketing')

const SlackFailurePage = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const [confetti, setConfetti] = useState(false)
  useEffect(() => { setConfetti(true) }, [])

  return (
    <Layout>
      <SEO page={`slack_failure`} />
      <center>
        <div style={{position: 'fixed', right: 0, top: '50%'}}>
          <Confetti active={confetti} config={{
            ...failureData,
            elementCount: 100,
            startVelocity: 40,
            dragFriction: 0.05,
            spread: "200"
          }} />
        </div>
        <div style={{position: 'fixed', left: 0, top: '50%'}}>
          <Confetti active={confetti} config={{
            ...failureData,
            startVelocity: 100,
            dragFriction: 0.2,
            spread: "200"
          }} />
        </div>
        <h1 className="mb-12">{t(`slack.failure.title`)}</h1>
        <p className="text-lg mb-12">{t(`slack.failure.helptext`)}</p>
        <a
          onClick={() => trackEvent({ category: 'call-to-action', action: 'retry-slack', name: 'slack-page' })}
          href={`https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=commands`}
          className="cta-link primary"
        >{t("common.tryAgain")}</a>
      </center>
    </Layout>
  )
}

export default SlackFailurePage
