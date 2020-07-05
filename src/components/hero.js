import React from "react"
import { useTranslation } from "react-i18next"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Interface from "./images/interface"
import Squiggles from "./squiggles"

const Hero = () => {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()

  return (
    <div id="hero">
      <div className="flex flex-col mt-32 md:mt-0">
        <div className="flex flex-col md:flex-row">
          <div style={{flexBasis: "40%"}} className="flex flex-col items-center justify-center ml-8 mr-8 md:ml-16 md:mr-16">
            <div style={{maxWidth: "400px"}} className="text-center md:text-left flex flex-col items-start">
              <h1 className="mb-4">{t("hero.title")}</h1>
              <p className="mb-8">{t("hero.subtitle")}</p>
              <a
                onClick={() => trackEvent({ category: 'call-to-action', action: 'create-room', name: 'hero' })}
                href={t("common.roomUrl")}
                className="m-auto md:m-0 cta-link primary"
              >{t("common.makeRoom")}</a>
            </div>
          </div>
          <div className="absolute md:static" style={{flexBasis: "60%"}}>
            <Interface />
          </div>
        </div>
        <Squiggles />
      </div>
    </div>
  )
}

export default Hero
