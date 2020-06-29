import React from "react"
import { useTranslation } from "react-i18next"
import Facilitate from "./images/facilitate"
import Schedule from "./images/schedule"
import Share from "./images/share"

const FEATURE_COUNT = 3

const Features = () => {
  const { t } = useTranslation()
  const images = [<Facilitate />, <Schedule />, <Share />]

  return (
    <div id="features">
      <div className="flex flex-col md:flex-row items-center justify-around ml-16 mr-16 mb-0 md:mb-16 text-center md:text-left">
        {[...Array(FEATURE_COUNT)].map((_, index) => (
          <div key={index} style={{maxWidth: "325px", flexBasis: `${100 / FEATURE_COUNT}%`}} className="mb-16 flex flex-col">
            <h3 className="mb-4">{t(`features.${index}.title`)}</h3>
            <p className="mb-6">{t(`features.${index}.description`)}</p>
            {images[index]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
