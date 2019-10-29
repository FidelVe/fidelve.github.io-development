import React from 'react';
// import { Link } from "gatsby"

import Layout from '../components/layout';
import ImageLink from '../components/image-link';
import styles from './contact.module.css';
// import Image from "../components/image"
// import SEO from "../components/seo"

// Importing logos
import DEV_LOGO from '../images/dev-logo-48x48.png';
import FCC_LOGO from '../images/fcc-logo.png';
import GH_LOGO from '../images/gh-logo.png';
import LINKEDIN_LOGO from '../images/li-logo.png';
import SO_LOGO from '../images/so-logo.png';

// Array of logos
const ARRAY_LOGOS = [
  [DEV_LOGO, 'dev.to logo', 'https://dev.to/fidelve'],
  [FCC_LOGO, 'FreeCodeCamp logo', 'https://www.freecodecamp.org/fidelve'],
  [GH_LOGO, 'GitHub logo', 'https://www.github.com/fidelve'],
  [
    LINKEDIN_LOGO,
    'LinkedIn logo',
    'https://www.linkedin.com/in/fidel-sanchez-bueno/',
  ],
  [SO_LOGO, 'StackOverflow logo', 'https://stackoverflow.com/story/fidelve'],
];
const ContactPage = () => (
  <Layout pageTitle={'FidelVe | Contact page'} headerText="Want to say hi?.">
    <p>
      If you want to contact me, you can send me an email at{' '}
      <b>me@fidel.engineer</b>. I also have different profiles on several sites
      around the internet where I publish my open source projects, and sometimes
      even articles related to things that are interesting to me.
    </p>
    {/* <ul> */}
    {/*   <li> */}
    {/*     <a */}
    {/*       href="https://www.github.com/fidelve" */}
    {/*       target="_blank" */}
    {/*       rel="noopener noreferrer"> */}
    {/*       GitHub */}
    {/*     </a> */}
    {/*   </li> */}
    {/*   <li> */}
    {/*     <a */}
    {/*       href="https://www.linkedin.com/in/fidel-sanchez-bueno/" */}
    {/*       target="_blank" */}
    {/*       rel="noopener noreferrer"> */}
    {/*       LinkedIn */}
    {/*     </a> */}
    {/*   </li> */}
    {/*   <li> */}
    {/*     <a */}
    {/*       href="https://dev.to/fidelve" */}
    {/*       target="_blank" */}
    {/*       rel="noopener noreferrer"> */}
    {/*       Dev.to */}
    {/*     </a> */}
    {/*   </li> */}
    {/*   <li> */}
    {/*     <a */}
    {/*       href="https://stackoverflow.com/story/fidelve" */}
    {/*       target="_blank" */}
    {/*       rel="noopener noreferrer"> */}
    {/*       StackOverflow */}
    {/*     </a> */}
    {/*   </li> */}
    {/*   <li> */}
    {/*     <a */}
    {/*       href="https://www.freecodecamp.org/fidelve" */}
    {/*       target="_blank" */}
    {/*       rel="noopener noreferrer"> */}
    {/*       FreeCodeCamp.org */}
    {/*     </a> */}
    {/*   </li> */}
    {/* </ul> */}
    <div className={styles.imgLinkContainer}>
      {ARRAY_LOGOS.map((logo, key) => (
        <ImageLink key={key} imageFile={logo[0]} alt={logo[1]} link={logo[2]} />
      ))}
    </div>
    {/* <SEO title="Home" /> */}
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
    {/*   <Image /> */}
    {/* </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
);

export default ContactPage;
