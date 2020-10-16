import React from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

const Header = ({ breadcrumb }) => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()

  return (
    <div style={{top: 0, zIndex: 1}} id="header" className="fixed md:static w-full">
      <div className="flex justify-between items-center w-full p-4">
        <div className="header-breadcrumb">{breadcrumb}</div>
        <div className="flex-grow"></div>
        <a className="mvc-link mr-12" href="/#features">{t("header.features")}</a>
        <a className="mvc-link mr-12" href="/learn">{t("header.learning")}</a>
        <a
          onClick={() => {
            trackEvent({ category: 'call-to-action', action: 'create-room', name: 'header' })
          }}
          href={t("common.roomUrl")}
          className="mvc-btn cta-link"
        >{t("common.makeRoom")}</a>
      </div>
    </div>
  )
}

export default Header
