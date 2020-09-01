import React from "react"
import { Link } from "gatsby"

const Article = ({ path, title }) => {
  return (
    <div>
      <Link key={path} to={path}>{title}</Link>
    </div>
  )
}

export default Article
