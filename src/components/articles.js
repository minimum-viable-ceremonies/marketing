import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Article from "../components/article"

const Articles = ({ type }) => {
  const { allArticle: { edges } } = useStaticQuery(graphql`
    query Articles {
      allArticle {
        edges {
          node {
            fields {
              published
              blurb
              preview
              slug
              timestamp
              title
              type
              author { name avatar }
            }
          }
        }
      }
    }`)

  return (
    <div className="flex flex-col md:flex-row justify-around">
      {edges
        .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
        .filter(({ node: { fields } }) => fields.type === type)
        .map(({ node: { fields } }) => <Article key={fields.slug} article={fields} />)
      }
    </div>
  )
}

export default Articles