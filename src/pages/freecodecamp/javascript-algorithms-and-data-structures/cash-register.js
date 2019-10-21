import React from 'react';
import {Link, graphql} from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../../components/layout';
import CashRegisterApp from '../../../components/cash-register-app';
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = props => (
  <Layout pageTitle={'FidelVe | FreeCodeCamp'} headerText="Cash Register">
    {/* <SEO title="Home" /> */}
    <div className="image-container">
      <Img fluid={props.data.fccLogo.childImageSharp.fluid} alt=" FCC logo" />
    </div>
    <CashRegisterApp />
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
