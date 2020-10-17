import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/help.scss"

const Help = () => {
  const { t } = useTranslation()

  return (
    <div className="help flex flex-col md:flex-row justify-between pl-8 pr-8">
      <div className="mt-24">
        <h1 className="mb-8">{t("help.title")}</h1>
        <p className="mb-8">{t("help.description")}</p>
        <div style={{fontSize: "12px"}}>
          <span className="mr-1">{t("help.emailUs")}</span>
          <a style={{fontSize: "12px"}} className="mvc-link" href={`mailto:${t('footer.contactEmail')}`}>{t('footer.contactEmail')}</a>
        </div>
      </div>
      <div className="flex-grow">
      </div>
      <div className="help__chat">
        <div id="fc_frame" />
      </div>
    </div>
  )
}

export default Help
