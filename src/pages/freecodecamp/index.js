import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = props => (
  <Layout
    pageTitle={"FidelVe | FreeCodeCamp"}
    headerText="My finished projects on FreeCodeCamp."
  >
    {/* <SEO title="Home" /> */}
    <div style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}>
      <Img fluid={props.data.fccLogo.childImageSharp.fluid} alt=" FCC logo" />
    </div>
    <p>
      <a
        href="https://www.freecodecamp.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        FreeCodeCamp.org
      </a>{" "}
      is an open source interactive learning web platform with the goal of
      making learning web development accessible to anyone.
    </p>
    <p>
      I first learned about them in 2018 while searching for online resources to
      learn about web programming. Since then I have been dedicating a couple of
      hours a day doing their courses,{" "}
      <a
        href="https://www.freecodecamp.org/fidelve"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>{" "}
      you can find my profile on FreeCodeCamp.
    </p>
    <p>Here is a list of all the FreeCodeCamp projects I've completed.</p>
    <ul>
      <li>
        <Link to="/freecodecamp/responsive-web-design/">
          Responsive Web Design
        </Link>
      </li>
      <li>
        <Link to="/freecodecamp/javascript-algorithms-and-data-structures/">
          JavaScript Algorithms and Data Structures
        </Link>
      </li>
      <li>
        <Link to="/404/">Front End Libraries (To be completed)</Link>
      </li>
      <li>
        <Link to="/404/">Data Visualization (To be completed)</Link>
      </li>
      <li>
        <Link to="/404/">APIs And Microservices (To be completed)</Link>
      </li>
      <li>
        <Link to="/404/">
          Information Security And Quality Assurance (To be completed)
        </Link>
      </li>
    </ul>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
    {/*   <Image /> */}
    {/* </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    fccLogo: file(relativePath: { eq: "freecodecamp-logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
