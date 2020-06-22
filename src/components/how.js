import React from "react"
import { useTranslation } from "react-i18next"

import Deck from "./deck"

const How = () => {
  const { t } = useTranslation()

  return (
    <div id="how" className="mb-16">
      <div className="flex flex-row">
        <div style={{flexBasis: "50%"}}>
          <Deck />
        </div>
        <div style={{flexBasis: "50%"}} className="flex flex-col items-start">
          <div style={{margin: "auto", maxWidth: "440px"}}>
            <h2 className="mb-4">{t("how.title")}</h2>
            <p className="mb-4">{t("how.subtitle")}</p>
            <p className="mb-4">{t("how.description")}</p>
            <div className="flex flex-row justify-between">
              {[
                'coordination',
                'culture',
                'delivery',
                'innovation'
              ].map((theme, index) => (
                <div key={index} className={`mvc-badge ${theme}`}>
                  {t(`themes.${theme}`)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default How
