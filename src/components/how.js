import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import Deck from "./deck"

const How = () => {
  const { t } = useTranslation()
  const [active, setActive] = useState(false)
  const [lastActive, setLastActive] = useState(false)

  useEffect(() => {
    if (!active) return

    setLastActive(active)
  }, [active, setLastActive])

  return (
    <div id="how" className="mb-16 md:mb-32">
      <div className="flex flex-col-reverse md:flex-row text-center md:text-left pl-6 pr-6 md:p-0">
        <div style={{flexBasis: "50%"}}>
          <Deck />
        </div>
        <div style={{flexBasis: "50%"}} className="mb-8 md:mb-0 flex flex-col items-start">
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
                <button
                  key={index}
                  className={`mvc-badge ${theme} ${active === theme ? 'active' : ''}`}
                  onFocus={() => setActive(theme)}
                  onMouseOver={() => setActive(theme)}
                  onMouseLeave={() => setActive()}
                >
                  {t(`themes.${theme}.name`)}
                </button>
              ))}
            </div>
            <div className={`mvc-description ${active ? 'active' : ''}`}>
              {t(`themes.${lastActive}.description`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default How
