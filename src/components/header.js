import React from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

const Header = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()

  return (
    <div style={{top: 0, zIndex: 1}} id="header" className="fixed md:static w-full">
      <div className="flex justify-end items-center w-full p-4">
        <a className="mvc-link mr-12" href="#features">{t("header.features")}</a>
        <a className="mvc-link mr-12" href="/articles">{t("header.articles")}</a>
        <a
          onClick={() => {
            trackEvent({ category: 'call-to-action', action: 'create-room', name: 'header' })
          }}
          href={t("common.roomUrl")}
          className="mvc-btn"
        >{t("common.makeRoom")} →</a>
      </div>
    </div>
  )
}

export default Header
