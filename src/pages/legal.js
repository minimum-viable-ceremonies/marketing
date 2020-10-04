import React from "react"
import { useTranslation } from "react-i18next"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../data/locales"

const LegalPage = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <SEO page="legal" />
      <div className="legal pb-24 mt-24 md:mt-12 m-auto max-w-screen-sm">
        <h1 className="mb-8">{t("legal.title")}</h1>
        <p className="mb-4">{t("legal.helptext")}</p>
        <ul>
          <li className="mb-4">
            <a href="articles/terms-and-conditions" className="mvc-link">{t("footer.terms")}</a>
          </li>
          <li className="mb-4">
            <a href="articles/privacy-notice" className="mvc-link">{t("footer.privacy")}</a>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default LegalPage
