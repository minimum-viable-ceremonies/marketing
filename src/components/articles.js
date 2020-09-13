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
              slug
              timestamp
              type
              author { name avatar }
              meta { title blurb image }
            }
          }
        }
      }
    }`)

  return (
    <div className="flex flex-wrap flex-col md:flex-row justify-around">
      {edges
        .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
        .filter(({ node: { fields } }) => fields.type === type)
        .map(({ node: { fields } }) => <Article key={fields.slug} article={fields} />)
      }
    </div>
  )
}

export default Articles
