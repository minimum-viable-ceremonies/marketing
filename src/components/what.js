import React from "react"
import { useTranslation } from "react-i18next"

import WhatImage from "./images/what"

const What = () => {
  const { t } = useTranslation()

  return (
    <div id="what" className="mb-16 md:mb-32 flex items-center justify-center">
      <div className="flex flex-col-reverse md:flex-col text-center" style={{maxWidth: "500px"}}>
        <WhatImage />
        <div>
          <h2 className="mt-12 mb-6">{t("what.title")}</h2>
          <p className="mb-6">{t("what.subtitle")}</p>
        </div>
      </div>
    </div>
  )
}

export default What
