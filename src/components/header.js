import React from "react"
import { useTranslation } from "react-i18next"

const Header = () => {
  const { t } = useTranslation()

  return (
    <div id="header" className="flex justify-end items-center w-full p-4">
      <a className="mvc-link mr-12" href="#features">{t("header.features")}</a>
      <button className="mvc-btn mr-12">{t("common.makeRoom")}</button>
    </div>
  )
}

export default Header
