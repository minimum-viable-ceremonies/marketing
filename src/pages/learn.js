import React from "react"
import { useTranslation } from "react-i18next"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Articles from "../components/articles"
import Pocket from "../components/images/pocket"

const Learn = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <SEO page="articles" />
      <div className="m-auto lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
        <div className="mt-24 md:mt-4 ml-4 mr-4 mb-12 flex flex-col md:flex-row items-center">
          <div className="mr-12 md:w-1/2">
            <h1 className="mb-4 text-4xl">{t("articles.learning.title")}</h1>
            <p className="text-lg">{t("articles.learning.text")}</p>
          </div>
          <div className="w-3/4 md:w-1/2">
            <div className="lg:p-8"><Pocket /></div>
          </div>
        </div>
        <div className="m-4 mb-12">
          <h2 className="mb-4 text-3xl">{t("articles.resources.title")}</h2>
          <p>{t("articles.resources.text")}</p>
        </div>
        <Articles type="resource" />

        <div className="m-4 mb-12">
          <h2 className="mb-4 text-3xl">{t("articles.updates.title")}</h2>
          <p>{t("articles.updates.text")}</p>
        </div>
        <Articles type="update" />
      </div>
    </Layout>
  )
}

export default Learn
