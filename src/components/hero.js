import React from "react"
import { useTranslation } from "react-i18next"

import Interface from "./images/interface"
import Squiggles from "./squiggles"

const Hero = () => {
  const { t } = useTranslation()

  return (
    <div id="hero">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div style={{flexBasis: "40%"}} className="flex flex-col items-center justify-center ml-16 mr-16">
            <div style={{maxWidth: "400px"}} className="flex flex-col items-start">
              <h1 className="mb-4">{t("hero.title")}</h1>
              <p className="mb-8">{t("hero.subtitle")}</p>
              <a href={t("common.roomUrl")} className="mvc-btn primary">{t("common.makeRoom")} →</a>
            </div>
          </div>
          <div style={{flexBasis: "60%"}}>
            <Interface />
          </div>
        </div>
        <Squiggles style={{marginTop: "-120px"}} />
      </div>
    </div>
  )
}

export default Hero
