import React from "react"
import { useTranslation } from "react-i18next"

const Header = () => {
  const { t } = useTranslation()

  return (
    <div style={{top: 0, zIndex: 1}} id="header" className="fixed md:static w-full">
      <div className="flex justify-end items-center w-full p-4">
        <a className="mvc-link mr-12" href="#features">{t("header.features")}</a>
        <a href={t("common.roomUrl")} className="mvc-btn">{t("common.makeRoom")} →</a>
      </div>
    </div>
  )
}

export default Header
