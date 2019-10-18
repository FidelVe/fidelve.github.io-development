import React from 'react';
import {Link} from 'gatsby';

import Layout from '../components/layout';
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = () => (
  <Layout pageTitle="FidelVe | Homepage" headerText="Hi! my name is Fidel.">
    {/* <SEO title="Home" /> */}
    <p>
      I'm a Chemical Engineer with experience working in the Oil &amp; Gas
      industry, a self taught programmer and I love everything related with
      technology.
    </p>
    <p>
      My goal is to eventually blend my experience in Chemical Engineering with
      computer programming and change my professional path into something that
      allows me to mix my career and my love for coding.
    </p>
    <p>
      I'm currently teaching myself web programming by dedicating a couple hours
      a day doing the{' '}
      <a
        href="https://learn.freecodecamp.org/"
        target="_blank"
        rel="noopener noreferrer">
        FreeCodeCamp
      </a>{' '}
      web programming courses.
    </p>
    <p>
      You can checkout my profile and my finished projects on the following
      links:
    </p>
    <ul>
      <li>
        <a
          href="https://www.freecodecamp.org/fidelve"
          target="_blank"
          rel="noopener noreferrer">
          FreeCodeCamp profile
        </a>
      </li>
      <li>
        <Link to="/freecodecamp/">FreeCodeCamp finished projects</Link>
      </li>
    </ul>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
    {/*   <Image /> */}
    {/* </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
);

export default IndexPage;
