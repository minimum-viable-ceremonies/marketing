import React from "react"
import { Link } from "gatsby"

import "../styles/article.scss"

const Article = ({ article: { published, blurb, preview, path, title } }) => {
  return (
    <div className="article m-4">
      <Link to={path}>
        <div className="article__preview" style={{backgroundImage: `url(${preview})`}} />
        <div className="article__content p-4">
          <h3 className="article__title mb-2">{title}</h3>
          <p className="article__blurb">{blurb}</p>
        </div>
      </Link>
    </div>
  )
}

export default Article
