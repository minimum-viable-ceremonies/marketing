import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Interface = ({ src }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "schedule.png" }) {
        childImageSharp {
          fluid(maxWidth: 325) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img className="w-full" style={{maxWidth: "325px"}} fluid={data.placeholderImage.childImageSharp.fluid}
  />
}

export default Interface
