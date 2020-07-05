import React from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

const GetStarted = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()

  return (
    <div id="get-started" className="mb-16 text-center">
      <h2 className="mb-2">{t(`getStarted.title`)}</h2>
      <p className="mb-4">{t(`getStarted.subtitle`)}</p>
      <a
        onClick={() => trackEvent({ category: 'call-to-action', action: 'create-room', name: 'get-started' })}
        href={t("common.roomUrl")}
        className="mvc-btn primary"
      >{t("common.makeRoom")} →</a>
    </div>
  )
}

export default GetStarted
