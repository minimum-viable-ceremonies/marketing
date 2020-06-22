import React from "react"
import { useTranslation } from "react-i18next"

const FEATURE_COUNT = 3

const Features = () => {
  const { t } = useTranslation()

  return (
    <div id="features" className="mb-16">
      <div className="flex flex-row justify-around ml-16 mr-16">
        {[...Array(FEATURE_COUNT)].map((_, index) => (
          <div key={index} style={{maxWidth: "300px", flexBasis: `${100 / FEATURE_COUNT}%`}} className="flex flex-col">
            <h3 className="mb-4">{t(`features.${index}.title`)}</h3>
            <p>{t(`features.${index}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
