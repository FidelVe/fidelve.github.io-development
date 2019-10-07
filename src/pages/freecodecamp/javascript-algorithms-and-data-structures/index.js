import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../../../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = props => (
  <Layout
    pageTitle={"FidelVe | FreeCodeCamp"}
    headerText="FreeCodeCamp. JavaScript Algorithms and Data Structure."
  >
    {/* <SEO title="Home" /> */}
    <div style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}>
      <Img fluid={props.data.fccLogo.childImageSharp.fluid} alt=" FCC logo" />
    </div>
    <p>
      <b>JavaScript Algorithms and Data Structures</b> is the second of six
      courses offered at FreeCodeCamp of which upon completion of its final
      projects you may earn a <i>FreeCodeCamp Certificate</i>.
    </p>
    <p>
      Starting with the basic sintax of javascript, this course is a great
      introduction to JavaScript. I do recommend to find tutorials or books
      online, and read them while you're going through this course, it helped me
      have a better grasp on the several aspects of JavaScript.
    </p>
    <p>
      By the end of the course you will find several exercises to put into
      practice everything you have learn so far, and 5 final projects to obtain
      the <i>FreeCodeCamp Certificate</i>.
    </p>
    <p>
      I decided to create this page as a way to showcase my code answers to this
      project, if you are currently going through this part of the FCC
      curriculum I recommend that you don't see my answers and do the projects
      on your own, the most important part of doing the FCC is to learn of your
      mistakes and find the answers by yourself, the process of making mistakes
      and learning from them is the most important part of learning, not only
      how to code but learning anything in life, so if you truly want to learn,
      don't cheat, you will only be doing a disservice to yourself.
    </p>
    <h4>FreeCodeCamp JavaScript's final project</h4>
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
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
