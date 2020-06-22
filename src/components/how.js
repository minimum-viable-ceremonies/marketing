import React from "react"
import { useTranslation } from "react-i18next"

import Deck from "./deck"

const How = () => {
  const { t } = useTranslation()

  return (
    <div id="how">
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
              {[...Array(4)].map((_, index) => (
                <div key={index} className="mvc-badge">
                  {t(`how.themes.${index}.title`)}
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
