import React from 'react';
import {graphql} from 'gatsby';
import Img from 'gatsby-image';

import CollapseContainer from '../../../components/collapse-container';
import InputValidator from '../../../components/input-validator';
import InputTransform from '../../../components/input-transform';
import CodeContainer from '../../../components/code-container';
import CashRegisterApp from '../../../components/cash-register-app';
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
      pageTitle="FidelVe | FreeCodeCamp"
      headerText="FreeCodeCamp. JavaScript Algorithms and Data Structure.">
      {/* <SEO title="Home" /> */}
      <div className="image-container">
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
      <CollapseContainer borderColor="#c2b280" headerText="Palindrome Checker">
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
        <CodeContainer
          innerHTML={getHTMLofFileName(PALINDROME_CODE, queryData)}
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
        <InputValidator
          placeholder="roma amor"
          validator={isPalindrome}
          label="Palindrome Test"
        />
      </CollapseContainer>
      <CollapseContainer
        borderColor="#c2b280"
        headerText="Roman Numeral Converter">
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
            {['I', 'V', 'X', 'L', 'C', 'D', 'M'].map((letter, key) => (
              <span key={key}>{letter}</span>
            ))}
          </div>
          <div className={style.flexrnw}>
            <span className={style.romanThead}>Value</span>
            {['1', '5', '10', '50', '100', '500', '1000'].map((value, key) => (
              <span key={key}>{value}</span>
            ))}
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
        <CodeContainer innerHTML={getHTMLofFileName(ROMAN_CODE, queryData)} />
        <h4>Testing the code.</h4>
        <p>Use the following values to test the algorithm.</p>
        <ul>
          <li>Decimal 2, should return "II".</li>
          <li>Decimal 4, should return "IV".</li>
          <li>Decimal 29, should return "XXIX".</li>
          <li>Decimal 83, should return "LXXXIII".</li>
          <li>Decimal 97, should return "XCVII".</li>
          <li>Decimal 649, should return "DCXLIX".</li>
          <li>Decimal 798, should return "DCCXCVIII".</li>
          <li>Decimal 891, should return "DCCCXCI".</li>
          <li>Decimal 2014, should return "MMXIV".</li>
          <li>Decimal 3999, should return "MMMCMXCIX".</li>
        </ul>
        <InputTransform
          inputLabel="Decimal"
          inputPlaceholder="Enter decimal number"
          inputType="number"
          outputPlaceholder="Result in roman numbers"
          outputLabel="Roman"
          transformFunction={convertToRoman}
        />
      </CollapseContainer>
      <CollapseContainer borderColor="#c2b280" headerText="Caesars Cipher">
        <p>
          In cryptography, a cipher is an algorithm for performing encryption or
          decryption, this algorithm substitutes the characters in a string to
          transform them into something else for the purpose of protecting the
          original string from being understood by unwanted people.
        </p>
        <p>
          Caesars cipher is one of the simplest and most widely know encryption
          techniques. It is a simple substitution cipher in which each letter in
          a string is replaced by a letter some fixed number of positions down
          the alphabet.
        </p>
        <p>
          For this project you are asked to write an algorithm capable of
          implementing ROT13, a type of caesar cipher that replaces every
          character in a string with the letter 13 positions up in the alphabet
          from the position of that character.
        </p>
        <CodeContainer innerHTML={getHTMLofFileName(CAESARS_CODE, queryData)} />
        <h4>Testing the code.</h4>
        <p>Use the following to test the algorithm</p>
        <ul>
          <li>"SERR PBQR PNZC" should decode to FREE CODE CAMP.</li>
          <li>"SERR CVMMN!" should decode to FREE PIZZA!.</li>
          <li>"SERR YBIR?" should decode to FREE LOVE?.</li>
          <li>
            "GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT." should decode to THE
            QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
          </li>
        </ul>
        <InputTransform
          inputLabel="Encrypted"
          inputPlaceholder="Enter encrypted message"
          inputType="text"
          outputPlaceholder="Decrypted message"
          outputLabel="Decrypted"
          transformFunction={decipherCaesar}
        />
      </CollapseContainer>
      <CollapseContainer
        borderColor="#c2b280"
        headerText="Telephone Number Validator">
        <p>
          For this next project you are given a string representing a phone
          number and you should validate it.
        </p>
        <p>
          The input string should be a valid US phone number, the following
          examples are valid formats for US numbers.
        </p>
        <ul>
          <li>555-555-5555</li>
          <li>(555)555-5555</li>
          <li>(555) 555-5555</li>
          <li>555 555 5555</li>
          <li>5555555555</li>
          <li>1 555 555 5555</li>
        </ul>
        <CodeContainer
          innerHTML={getHTMLofFileName(TELEPHONE_CODE, queryData)}
        />
        <h4>Testing the code.</h4>
        <p>Use the following to test the algorithm</p>
        <ul>
          <li>"1 555-555-5555" should return true.</li>
          <li>"1 (555) 555-5555" should return true.</li>
          <li>"5555555555" should return true.</li>
          <li>"555-555-5555" should return true.</li>
          <li>"(555)555-5555" should return true.</li>
          <li>"1(555)555-5555" should return true.</li>
          <li>"555-5555" should return false.</li>
          <li>"5555555" should return false.</li>
          <li>"1 555)555-5555" should return false.</li>
          <li>"1 555 555 5555" should return true.</li>
          <li>"1 456 789 4444" should return true.</li>
          <li>"123**&!!asdf#" should return false.</li>
          <li>"55555555" should return false.</li>
          <li>"(6054756961)" should return false</li>
          <li>"2 (757) 622-7382" should return false.</li>
          <li>"0 (757) 622-7382" should return false.</li>
          <li>"-1 (757) 622-7382" should return false</li>
          <li>"2 757 622-7382" should return false.</li>
          <li>"10 (757) 622-7382" should return false.</li>
          <li>"27576227382" should return false.</li>
          <li>"(275)76227382" should return false.</li>
          <li>"2(757)6227382" should return false.</li>
          <li>"2(757)622-7382" should return false.</li>
          <li>"555)-555-5555" should return false.</li>
          <li>"(555-555-5555" should return false.</li>
          <li>"(555)5(55?)-5555" should return false.</li>
        </ul>
        <InputValidator
          placeholder="555-555-5555"
          validator={telephoneCheck}
          label="US Phone Validator"
        />
      </CollapseContainer>
      <CollapseContainer borderColor="#c2b280" headerText="Cash Register">
        <p>
          For this last project you're tasked with creating a piece of program
          that will simulate a cash register.
        </p>
        <p>
          You have to write a function that takes purchase price as the first
          argument (price), payment as the second argument (cash), and
          cash-in-drawer (cid) as the third argument.
        </p>
        <p>
          After taking those inputs, you need to calculate how much change to
          return taking into account the price of the product, the amount of
          cash the client is giving you and the amount of cash the register has.
        </p>
        <p>
          You should always return an object with a "status" and a "change" key.
          The posible outcomes are as follow:
        </p>
        <ul>
          <li>
            If cash in the drawer is less than the change due, or if you cannot
            return the exact change, the output should be{' '}
            <code>
              {'{'}status: "INSUFFICIENT_FUNDS", change: []{'}'}
            </code>
          </li>
          <li>
            If the amount of "change" to return is equal to the amount of cash
            in the register, the "status" key should return "CLOSED" and the
            change array sorted from highest to lowest with the amounts of bills
            and coins to return.
          </li>
          <li>
            If the change to return is lower than the amount of cash in the
            register, and the exact amount can be returned, the "status" key
            should return with a value of "OPEN", and as in the last case, the
            change array sorted from highest to lowest.
          </li>
        </ul>
        <CodeContainer
          innerHTML={getHTMLofFileName(REGISTER_CODE, queryData)}
        />
        <h4>Testing the code.</h4>
        <p>
          Here's a small app for testing the code, you just need to enter a
          price and payment and press the 'Calculate' button, there's already a
          predefined register state which you can modify if you want to.
        </p>
        <CashRegisterApp />
      </CollapseContainer>
    </Layout>
  );
};

function isPalindrome(string) {
  // Evaluate if input string is a palindrome or not
  // returns either true or false

  let regex = /[^\W_]/g;

  if (string.match(regex) !== null) {
    // If the result of evaluating the regular expression into the string
    // is not null
    let charArr = string.match(regex).map(each => each.toLowerCase());
    for (let i = 0; i < Math.floor(charArr.length / 2); i++) {
      if (charArr[i] !== charArr[charArr.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }
  // if the input is not a valid string return false
  return false;
}

function telephoneCheck(str) {
  let regex = /^1{0,1}\s{0,1}(?:[0-9]{3}[\s-]{0,1}){2}[0-9]{4}$|^1{0,1}\s{0,1}\([0-9]{3}\)[\s-]{0,1}[[0-9]{3}[\s-]{0,1}[0-9]{4}$/;
  return regex.test(str);
}

function convertToRoman(input) {
  // Converts decimal integers to roman numeral

  let arrayOfRelation = [
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let num = input;
  let result = [];

  if (input > 1000) {
    let overThousand = Math.floor(input / 1000);
    num = num - overThousand * 1000;
    result.push('M'.repeat(overThousand));
  }

  for (let valuePair of arrayOfRelation) {
    while (num >= valuePair[0]) {
      num -= valuePair[0];
      result.push(valuePair[1]);
    }
  }

  if (result.length > 0) {
    return result.reduce((total, value) => total + value);
  } else {
    return '';
  }
}

function decipherCaesar(str) {
  let ABC = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  let abc = 'abcdefghijklmnopqrstuvwxyz';
  let result = [];
  let regex = /[a-zA-Z]/;

  for (let each of str) {
    let newLetter = each;
    if (regex.test(each)) {
      // If letter is UPPERCASE, abc.indexOf(each) will
      // return -1, in that case do the assignment with
      // ABC.indexOf()
      let pos =
        abc.indexOf(each) !== -1 ? abc.indexOf(each) : ABC.indexOf(each);
      let newpos = pos + 13 >= 26 ? pos - 13 : pos + 13;
      newLetter = abc.charAt(newpos);
    }
    result.push(newLetter);
  }
  if (result.length > 0) {
    return result.reduce((total, value) => total + value);
  } else {
    return '';
  }
}

function reshapeCodeData(arrayOfCodeData) {
  // Reshapes the data obtained by the graphql query
  let newArray = [];
  let regex = /\/[^/]+.md/;

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
  //  { fileName2: "file2.md", html: "<p>more html</p>},
  //  ...
  // ]
  for (let each of arrayOfFileData) {
    if (each.fileName === fileName) {
      return each.html;
    }
  }
  // If no file is found with name fileName throws error
  throw Error(`no file named ${fileName} found`);
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
