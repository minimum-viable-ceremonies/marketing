import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Article from "../components/article"

const Articles = ({ type }) => {
  const { allGhostPost: { edges } } = useStaticQuery(graphql`
    query Articles {
      allGhostPost {
        edges {
          node {
            slug
            title
            feature_image
            custom_excerpt
            html
            published_at
            primary_tag { name }
            authors { name }
          }
        }
      }
    }`)

  return (
    <div className="flex flex-wrap flex-col md:flex-row justify-around">
      {edges
        .sort((a, b) => a.published_at > b.published_at ? 1 : -1)
        .filter(({ node }) => (node.primary_tag || {}).name === type)
        .map(({ node }) => <Article key={node.slug} article={node} />)
      }
    </div>
  )
}

export default Articles
