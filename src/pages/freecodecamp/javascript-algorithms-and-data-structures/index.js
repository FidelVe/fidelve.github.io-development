import React from 'react';
import {graphql} from 'gatsby';
import Img from 'gatsby-image';
import {Helmet} from 'react-helmet';

import CollapseContainer from './collapse-container';
import Layout from '../../../components/layout';
import style from './index.module.css';

// import Image from "../components/image"
// import SEO from "../components/seo"

// variable declaration
const PALINDROME_CODE = 'palindrome-checker-code.md';
const CAESARS_CODE = 'caesars-cipher-code.md';
const REGISTER_CODE = 'cash-register-code.md';
const ROMAN_CODE = 'roman-numeral-converter-code.md';
const TELEPHONE_CODE = 'telephone-number-validator-code.md';

const IndexPage = props => {
  const queryData = reshapeCodeData(props.data.codeBlock.edges);
  return (
    <Layout
      pageTitle={'FidelVe | FreeCodeCamp'}
      headerText="FreeCodeCamp. JavaScript Algorithms and Data Structure.">
      {/* <SEO title="Home" /> */}
      <Helmet>
        <title>FidelVe | FreeCodeCamp</title>
      </Helmet>
      <div style={{maxWidth: '400px', width: '100%', margin: '0 auto'}}>
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
        online, and read them while you're going through this course, it helped
        me have a better grasp on the several aspects of JavaScript.
      </p>
      <p>
        By the end of the course you will find several exercises to put into
        practice everything you have learn so far, and 5 final projects to
        obtain the <i>FreeCodeCamp Certificate</i>.
      </p>
      <p>
        I decided to create this page as a way to showcase my code answers to
        this project, if you are currently going through this part of the FCC
        curriculum I recommend that you don't see my answers and do the projects
        on your own, the most important part of doing the FCC is to learn of
        your mistakes and find the answers by yourself, the process of making
        mistakes and learning from them is the most important part of learning,
        not only how to code but learning anything in life, so if you truly want
        to learn, don't cheat, you will only be doing a disservice to yourself.
      </p>
      <h2>FreeCodeCamp JavaScript's final project</h2>
      <CollapseContainer headerText="Palindrome Checker">
        <p>
          A palindrome is a word or sentence that's spelled the same way both
          forward and backward, ignoring punctuation, case, and spacing.
        </p>
        <p>
          In this project, you are tasked with creating and algorithm that can
          detect if a word (or phrase) is a palindrome or not.
        </p>
        <p>
          Because we need to compare character by character, not including
          punctuation, case and spacing, we need to use regular expressions to
          match all the correct characters, and add all of this into an array
          for easy comparison later.
        </p>
        <p>
          After having your array with all the correct characters, the rest is
          just an iteration where you compare each character in their respective
          position at the beginning and end of the array, stoping at the middle.
        </p>
        <div
          className={style.contentCode}
          dangerouslySetInnerHTML={{
            __html: getHTMLofFileName(PALINDROME_CODE, queryData),
          }}
        />
        <h4>Testing the code.</h4>
        <p>
          Heres a list of words and phrases you can use to test the algorithm.
        </p>
        <ul>
          <li>
            <b>"eye"</b> should return positive.
          </li>
          <li>
            <b>"_eye"</b> should return positive.
          </li>
          <li>
            <b>"race car"</b> should return positive.
          </li>
          <li>
            <b>"not a palindrome"</b> should return negative.
          </li>
          <li>
            <b>"A man, a plan, a canal. Panama"</b> should return positive.
          </li>
          <li>
            <b>"never odd or even"</b> should return positive.
          </li>
          <li>
            <b>"nope"</b> should return negative.
          </li>
          <li>
            <b>"almostomla"</b> should return negative.
          </li>
          <li>
            <b>"My age is 0, 0 si ega ym."</b> should return positive.
          </li>
          <li>
            <b>"1 eye for of 1 eye."</b> should return negative.
          </li>
          <li>
            <b>"0_0 (: /-\ :) 0-0"</b> should return positive.
          </li>
          <li>
            <b>"five|\_/|four"</b> should return negative.
          </li>
        </ul>
      </CollapseContainer>
      <CollapseContainer headerText="Roman Numeral Converter">
        <p>
          For this project you are asked to create an algorithm that converts
          decimal numbers into the roman numeral system.
        </p>
        <p>
          The first thing that we need to do, is understand how roman numerals
          are written. The numbers in this system are represented by a
          combination of letters from the Latin alphabet.
        </p>
        <div id={style.romanTable} className={style.flexcnw}>
          <div className={style.flexrnw}>
            <span className={style.romanThead}>Symbol</span>
            <span>I</span>
            <span>V</span>
            <span>X</span>
            <span>L</span>
            <span>C</span>
            <span>D</span>
            <span>M</span>
          </div>
          <div className={style.flexrnw}>
            <span className={style.romanThead}>Value</span>
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>50</span>
            <span>100</span>
            <span>500</span>
            <span>1000</span>
          </div>
        </div>
        <p>
          Now that we now the symbols and their value in the decimal system, how
          do we used them?. The correct way to express quantities in the roman
          numeral system is to replace from the top down, find the highest
          valued symbol, use it and substract the value to the total and repeat
          until zero is reached.
        </p>
        <p>
          For example, the correct way to express <b>1500</b> in the roman
          system would be <b>MD</b>, instead of <b>DDD</b>.
        </p>
        <div
          className={style.contentCode}
          dangerouslySetInnerHTML={{
            __html: getHTMLofFileName(ROMAN_CODE, queryData),
          }}
        />
      </CollapseContainer>
      <CollapseContainer headerText="Caesars Cipher">
        <div
          className={style.contentCode}
          dangerouslySetInnerHTML={{
            __html: getHTMLofFileName(CAESARS_CODE, queryData),
          }}
        />
      </CollapseContainer>
      <CollapseContainer headerText="Telephone Number Validator">
        <div
          className={style.contentCode}
          dangerouslySetInnerHTML={{
            __html: getHTMLofFileName(TELEPHONE_CODE, queryData),
          }}
        />
      </CollapseContainer>
      <CollapseContainer headerText="Cash Register">
        <div
          className={style.contentCode}
          dangerouslySetInnerHTML={{
            __html: getHTMLofFileName(REGISTER_CODE, queryData),
          }}
        />
      </CollapseContainer>
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
      {/*   <Image /> */}
      {/* </div> */}
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  );
};

function reshapeCodeData(arrayOfCodeData) {
  // Reshapes the data obtained by the graphql query
  let newArray = [];
  let regex = /\/[^\/]+.md/;

  for (let node of arrayOfCodeData) {
    // Extracts the file name from the absolute path
    let fileName = node.node.fileAbsolutePath.match(regex)[0].substring(1);
    // HTML content
    let html = node.node.html;
    newArray.push({fileName: fileName, html: html});
  }
  return newArray;
}

function getHTMLofFileName(fileName, arrayOfFileData) {
  // Returns the html content of the given fileName in an array of shape
  // [
  //  { fileName: "file.md", html: "<p>html Code</p>},
  //  {...}
  // ]
  for (let each of arrayOfFileData) {
    if (each.fileName == fileName) {
      return each.html;
    }
  }
  // If no file is found with name fileName throws error
  throw Error(`no file named ${fileName} found`);
  return '<p>ERROR: CHECK CONSOLE</p>';
}
export default IndexPage;

export const query = graphql`
  query {
    fccLogo: file(relativePath: {eq: "freecodecamp-logo.png"}) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    codeBlock: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/.+code.md/"}}
    ) {
      edges {
        node {
          fileAbsolutePath
          html
        }
      }
    }
  }
`;
