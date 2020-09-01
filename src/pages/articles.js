import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"

const ArticlesPage = () => {
  const { allArticle: { edges } } = useStaticQuery(graphql`
    query Articles {
      allArticle {
        edges {
          node {
            fields { path title }
          }
        }
      }
    }`)

  return (
    <Layout>
      <SEO page="articles" />
      {edges.map(({ node: { fields: { path, title } } }) => (
        <Article key={path} path={path} title={title} />
      ))}
    </Layout>
  )
}

export default ArticlesPage
