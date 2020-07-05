import React from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import WhoImage from "./images/who"

const Who = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()

  return (
    <div id="who" className="mb-16 md:mb-32">
      <div className="flex flex-col md:flex-row md:items-center">
        <div style={{flexBasis: "50%"}} className="flex flex-col items-start">
          <div className="ml-auto mr-auto mb-16 md:mb-0 text-center md:text-left" style={{maxWidth: "360px"}}>
            <h2 className="mb-4">{t("who.title")}</h2>
            <p className="mb-12">{t("who.subtitle")}</p>
            <a
              onClick={() => trackEvent({ category: 'create-room', action: 'who' })}
              href={t("common.roomUrl")}
              className="mvc-btn primary"
            >{t("common.makeRoom")} →</a>
          </div>
        </div>
        <div className="pr-8 pl-8 md:p-0" style={{flexBasis: "50%"}}>
          <div style={{marginRight: "auto", maxWidth: "600px"}}>
            <WhoImage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Who
