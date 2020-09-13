import React from "react"
import moment from "moment"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import "../styles/article.scss"

const Article = ({ article: { slug, author, timestamp, meta: { title, blurb, image } } }) => {
  const { t } = useTranslation()

  return (
    <div className="article p-4 pb-24 mb-24" style={{flexBasis: "50%"}}>
      <Link to={`/articles/${slug}`}>
        <div className="article__preview mb-4" style={{backgroundImage: `url(${image})`}} />
        <div className="article__meta mb-4">
          <div className="article__timestamp text-sm mb-1">
            {t("common.updated", { timestamp: moment(timestamp).format('MMMM D, yyyy') })}
          </div>
          <div className="article__author text-sm">
            {author.name}
          </div>
        </div>
        <div className="article__content mb-4">
          <h3 className="article__title mb-4">{title}</h3>
          <p className="article__blurb mb-8">{blurb}</p>
        </div>
      </Link>
    </div>
  )
}

export default Article
