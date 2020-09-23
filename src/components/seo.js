import React from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { document } from "browser-monads"

const SEO = ({ page = 'home', params = {}, meta = {} }) => {
  const { t, i18n } = useTranslation()
  const lang = (i18n.languages || ['en'])[0]
  const { title, description, url, image } = {
    title: `${t(`metadata.site.title`)} | ${t(`metadata.${page}.title`, params)}`,
    description: t(`metadata.${page}.description`, params),
    url: t(`metadata.site.url`),
    image: `${document.location.origin}${require(`../images/${lang}/meta.png`)}`,
    ...meta,
  }

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      meta={[{
        name: `description`,
        content: description,
      }, {
        property: `og:title`,
        content: title,
      }, {
        property: `og:description`,
        content: description,
      }, {
        property: `og:type`,
        content: `website`,
      }, {
        property: `og:image`,
        content: image,
      }, {
        property: `og:url`,
        content: url,
      }, {
        name: `twitter:card`,
        content: `summary`,
      }, {
        name: `twitter:creator`,
        content: `@gdpelican`,
      }, {
        name: `twitter:title`,
        content: title,
      }, {
        name: `twitter:url`,
        content: url,
      }, {
        name: `twitter:description`,
        content: description,
      }]}
    />
  )
}

export default SEO
