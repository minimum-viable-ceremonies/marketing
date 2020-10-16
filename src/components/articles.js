import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Article from "../components/article"

const Articles = ({ type }) => {
  const { allGhostPost: { edges } } = useStaticQuery(graphql`
    query Articles {
      allGhostPost(sort: { order: DESC, fields: [published_at] }) {
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
    <div className="flex flex-wrap flex-col md:flex-row">
      {edges
        .filter(({ node }) => (node.primary_tag || {}).name === type)
        .map(({ node }) => <Article key={node.slug} article={node} />)
      }
    </div>
  )
}

export default Articles
