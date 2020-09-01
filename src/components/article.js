import React from "react"
import { Link } from "gatsby"

import "../styles/article.scss"

const Article = ({ article: { published, blurb, preview, slug, author, title } }) => {
  return (
    <div className="article m-4">
      <Link to={`/articles/${slug}`}>
        <div className="article__preview" style={{backgroundImage: `url(${preview})`}} />
        <div className="article__author ml-4 mr-4 mt-2 flex flex-row items-center">
          <img className="mr-2" src={author.avatar} alt={author.name} />
          <i>{author.name}</i>
        </div>
        <div className="article__content p-4">
          <h3 className="article__title mb-2">{title}</h3>
          <p className="article__blurb">{blurb}</p>
        </div>
      </Link>
    </div>
  )
}

export default Article
