import React from "react"
import { useTranslation } from "react-i18next"

import WhatImage from "./images/what"

const What = () => {
  const { t } = useTranslation()

  return (
    <div id="what" className="flex items-center justify-center">
      <div style={{maxWidth: "500px"}} className="text-center">
        <WhatImage />
        <h2 className="mt-12 mb-6">{t("what.title")}</h2>
        <p className="mb-24">{t("what.subtitle")}</p>
      </div>
    </div>
  )
}

export default What
