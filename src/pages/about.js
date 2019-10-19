import React from 'react';
import {graphql} from 'gatsby';
import Img from 'gatsby-image';
// import { Helmet } from "react-helmet"
// import { Link } from "gatsby"

import Layout from '../components/layout';
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = props => (
  <Layout pageTitle={'FidelVe | About page'} headerText="About me!.">
    {console.log(props)}
    {/* <SEO title="Home" /> */}
    <p>
      In april 2011 I obtained my BSc in Chemical Engineering in Venezuela. In
      July of that same year I started working in the Oil & Gas Industry in
      Venezuela with Halliburton as a Drilling Fluids Engineer, position that I
      held until June 2019 (
      <a
        href="https://www.linkedin.com/in/fidel-sanchez-bueno/"
        target="_blank"
        rel="noopener noreferrer">
        here
      </a>{' '}
      you can see a more detailed description of my time as a Drilling Fluids
      Engineer).
    </p>
    <div className="image-container">
      <Img fluid={props.data.imageOne.childImageSharp.fluid} alt="hard hat" />
    </div>
    <p>
      Ever since my time as a university student, I always been interested in
      computers and computer programming, during my student years I worked
      installing operating systems and fixing my fellow students computers.
    </p>
    <p>
      My first experience in computer programming was when I decided to build a
      piping system program for my thesis, for this I ended up using Python and
      wxPython as the GUI framework.
    </p>
    <p>
      After graduating and finding a job, I put aside learning about computer
      programming and focused on my new job and personal life.
    </p>
    <div style={{maxWidth: '400px', width: '100%', margin: '0 auto'}}>
      <Img
        fluid={props.data.imageTwo.childImageSharp.fluid}
        fadeIn={true}
        alt="Picture with rig in background"
      />
    </div>
    <p>
      Working as a Drilling Fluids Engineer I got the opportunity to learn many
      things about the industry and about myself, travelled all around Venezuela
      working in many oil fields, and also got the opportunity to travel to the
      United States for professional training.
    </p>
    <p>
      While working in the Oil & Gas industry, learning about computer
      programming and using this knowledge to improve my work was always in the
      back of my mind, so I decided in 2018 to dedicate part of my free time
      reading and learning about software development.
    </p>
    <p>
      I started reading a lot about what programming language to learn and what
      path to take, my main interest is creating apps for desktop and maybe
      mobile operating systems. Even though there's plenty of options on what
      technology to use, I decided to start learning about Web Development
      (JavaScript, HTML and CSS), I feel that with technologies like Electron
      and React Native, I could learn Web Development and create apps that can
      be use on the web and also on desktop and mobile.
    </p>
    <p>
      Now I dedicate my time trying to learn something new about programming
      everyday, while working on a couple of personal projects.
    </p>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
    {/*   <Image /> */}
    {/* </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query {
    imageOne: file(relativePath: {eq: "hardhat-600px.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageTwo: file(relativePath: {eq: "rig-pic-2.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
