import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"
import Confetti from "react-dom-confetti"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import "../../data/locales"
import { successData } from "../../data/confettiData"

const SlackPage = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const [confetti, setConfetti] = useState(false)
  useEffect(() => { setConfetti(true) }, [])

  return (
    <Layout>
      <SEO page="slack_success" />
      <center>
        <div style={{position: 'fixed', right: 0, top: '50%'}}>
          <Confetti active={confetti} config={{
            ...successData,
            elementCount: 100,
            startVelocity: 40,
            dragFriction: 0.05,
            spread: "200"
          }} />
        </div>
        <div style={{position: 'fixed', left: 0, top: '50%'}}>
          <Confetti active={confetti} config={{
            ...successData,
            startVelocity: 100,
            dragFriction: 0.2,
            spread: "200"
          }} />
        </div>
        <h1 className="mb-12">{t(`slack.success.title`)}</h1>
        <p className="text-lg mb-12">{t(`slack.success.helptext`)}</p>
        <div className="mb-24">
          <p className="mb-4">{t(`slack.success.instruction`)}</p>
          <code>{t(`slack.success.code`)}</code>
        </div>
        <a
          onClick={() => trackEvent({ category: 'call-to-action', action: 'create-room', name: 'slack-page' })}
          href={t("common.roomUrl")}
          className="cta-link primary"
        >{t("common.makeRoom")}</a>
      </center>
    </Layout>
  )
}

export default SlackPage
