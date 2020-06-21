import React from "react"
import { useTranslation } from "react-i18next"

import WhoImage from "./images/who"

const Who = () => {
  const { t } = useTranslation()

  return (
    <div id="who">
      <div className="flex flex-row">
        <div style={{flexBasis: "50%"}} className="flex flex-col items-start">
          <div style={{margin: "auto", maxWidth: "360px"}}>
            <h2 className="mb-4">{t("who.title")}</h2>
            <p className="mb-12">{t("who.subtitle")}</p>
            <a href={t("common.roomUrl")} className="mvc-btn primary">{t("common.makeRoom")} →</a>
          </div>
        </div>
        <div style={{flexBasis: "50%"}}>
          <div style={{marginRight: "auto", maxWidth: "600px"}}>
            <WhoImage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Who
