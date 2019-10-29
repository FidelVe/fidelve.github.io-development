import React from 'react';
// import { Link } from "gatsby"

import Layout from '../components/layout';
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = () => (
  <Layout pageTitle={'FidelVe | Contact page'} headerText="Want to say hi?.">
    <p>
      If you want to contact me, you can send me an email at{' '}
      <b>me@fidel.engineer</b>. I also have different profiles on several sites
      around the internet where I publish my open source projects, and sometimes
      even articles related to things that are interesting to me.
    </p>
    <ul>
      <li>
        <a
          href="https://www.github.com/fidelve"
          target="_blank"
          rel="noopener noreferrer">
          GitHub
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/fidel-sanchez-bueno/"
          target="_blank"
          rel="noopener noreferrer">
          LinkedIn
        </a>
      </li>
      <li>
        <a
          href="https://dev.to/fidelve"
          target="_blank"
          rel="noopener noreferrer">
          Dev.to
        </a>
      </li>
      <li>
        <a
          href="https://stackoverflow.com/story/fidelve"
          target="_blank"
          rel="noopener noreferrer">
          StackOverflow
        </a>
      </li>
      <li>
        <a
          href="https://www.freecodecamp.org/fidelve"
          target="_blank"
          rel="noopener noreferrer">
          FreeCodeCamp.org
        </a>
      </li>
    </ul>
    {/* <SEO title="Home" /> */}
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
    {/*   <Image /> */}
    {/* </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
);

export default IndexPage;
