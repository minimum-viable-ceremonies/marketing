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
            fields { published blurb preview slug timestamp title author { name avatar } }
          }
        }
      }
    }`)

  return (
    <Layout>
      <SEO page="articles" />
      <div className="flex flex-row justify-around">
        {edges
          .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
          .map(({ node: { fields } }) => <Article key={fields.slug} article={fields} />)
        }
      </div>
    </Layout>
  )
}

export default ArticlesPage
