import React from "react"
import { useTranslation } from "react-i18next"

const GetStarted = () => {
  const { t } = useTranslation()

  return (
    <div id="get-started" className="mt-16 mb-16 text-center">
      <h2 className="mb-2">{t(`getStarted.title`)}</h2>
      <p className="mb-4">{t(`getStarted.subtitle`)}</p>
      <a href={t("common.roomUrl")} className="mvc-btn primary">{t("common.makeRoom")} →</a>
    </div>
  )
}

export default GetStarted
