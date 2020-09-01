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
            fields { published blurb preview path title }
          }
        }
      }
    }`)

  return (
    <Layout>
      <SEO page="articles" />
      <div className="flex flex-row justify-around">
        {edges.map(({ node: { fields } }) => (
          <Article key={fields.path} article={fields} />
        ))}
      </div>
    </Layout>
  )
}

export default ArticlesPage
