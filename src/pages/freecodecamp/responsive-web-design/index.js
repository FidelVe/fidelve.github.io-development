import React from 'react';
import {Link, graphql} from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../../components/layout';
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = props => (
  <Layout
    pageTitle={'FidelVe | FreeCodeCamp'}
    headerText="FreeCodeCamp. Responsive Web Design Projects.">
    {/* <SEO title="Home" /> */}
    <div className="image-container">
      <Img fluid={props.data.fccLogo.childImageSharp.fluid} alt=" FCC logo" />
    </div>
    <p>
      <b>Responsive Web Design</b> is the first of six courses offered at
      FreeCodeCamp of which upon completion of its final projects you may earn a{' '}
      <i>FreeCodeCamp Certificate</i>.
    </p>
    <p>
      The course is divided in several sections, raging from HTML and CSS, to
      design principles and accesibility.
    </p>
    <p>Here is a list of my completed projects.</p>
    <ul>
      <li>
        {/* <Link to="/freecodecamp/responsive-web-design/build-a-tribute-page/with-test-module/"> */}
        <a href="./build-a-tribute-page/with-test-module/index.html">
          Build a Tribute Page
        </a>
        {/* </Link> */}
      </li>
      <li>
        {/* <Link to="/freecodecamp/responsive-web-design/build-a-survey-form/without-test-module/"> */}
        <a href="./build-a-survey-form/with-test-module/index.html">
          Build a Survey Form
        </a>
        {/* </Link> */}
      </li>
      <li>
        {/* <Link to="/freecodecamp/responsive-web-design/build-a-product-landing-page/without-test-module/"> */}
        <a href="./build-a-product-landing-page/with-test-module/index.html">
          Build a Product Landing Page part
        </a>
        {/* </Link> */}
      </li>
      <li>
        <Link to="/freecodecamp/responsive-web-design/build-a-technical-documentation-page/without-test-module/">
          Build a Technical Documentation Page
        </Link>
      </li>
      <li>
        <Link to="/freecodecamp/responsive-web-design/build-a-personal-portfolio-webpage/without-test-module/">
          Build a Personal Portfolio Webpage
        </Link>
      </li>
    </ul>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
    {/*   <Image /> */}
    {/* </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query {
    fccLogo: file(relativePath: {eq: "freecodecamp-logo.png"}) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
