// main scripts for ../index.html
//
// string literals declaration
const _HEIGHT = "3.5em";
const _PATH1 = "./images/ic_remove_black_48dp.png";
const _PATH2 = "./images/ic_remove_white_48dp.png";
const _PATH3 = "./images/ic_add_black_48dp.png";
const _PATH4 = "./images/ic_add_white_48dp.png";
const _PATH5 = "./images/ic_cancel_white_48dp.png";
const _PATH6 = "./images/ic_check_circle_white_48dp.png";

// Get elements from the DOM
const palindromeEl = document.querySelector("#cs-header-palindrome");
const romanEl = document.querySelector("#cs-header-roman");
const caesarsEl = document.querySelector("#cs-header-caesars");
const telephoneEl = document.querySelector("#cs-header-telephone");
const registerEl = document.querySelector("#cs-header-register");
const palindromeInput = document.querySelector("#palindrome-input");
const palindromeResult = document.querySelector("#palindrome-result");
const romanInput = document.querySelector("#roman-input");
const romanResult = document.querySelector("#roman-result");

// Functions declaration
function toggleElementView(event) {
  if (this.parentNode.style.overflow === "visible") {
    // If the element is expanded, collapse it
    this.children[1].src = _PATH4;
    this.parentNode.style.overflow = "hidden";
    this.parentNode.style.height = _HEIGHT;
  } else {
    // If the element is collapsed, expand it
    this.children[1].src = _PATH2;
    this.parentNode.style.overflow = "visible";
    this.parentNode.style.height = "auto"
  }
}

function onMouseEnter(event) {
  if (this.parentNode.style.overflow === "visible") {
    // If the element is expanded
    this.children[1].src = _PATH2;
  } else {
    // If the element is collapsed
    this.children[1].src = _PATH4;
  }
}

function onMouseLeave(event) {
  if (this.parentNode.style.overflow === "visible") {
    // If the element is expanded
    this.children[1].src = _PATH1;
  } else {
    // If the element is collapsed
    this.children[1].src = _PATH3;
  }
}

function isPalindrome(string) {
  // This functions takes a string as an argument
  // and returns true if the string is a palindrome
  // false if not.

  let regex = /[^\W\_]/g;
  // TODO: type check "string". throws error when 
  // string == null
  let charArr = string.match(regex).map( (each) => {
    return each.toLowerCase();
  });

  for (let i=0; i < Math.floor(charArr.length/2); i++) {
    if (charArr[i] != charArr[charArr.length-1-i]) {
      return false;
    }
  }

  return true;
}

function onPalindromeKeyInput(event) {
  let result = isPalindrome(event.target.value);
  if (result === true) {
    palindromeResult.src = _PATH6;
    palindromeResult.style.background = "green";
  } else {
    palindromeResult.src = _PATH5;
    palindromeResult.style.background = "red";
  }
}

function onRomanKeyInput(event) {
  let romanFromDecimal = convertToRoman(event.target.value);
  romanResult.value = romanFromDecimal;
}
function convertToRoman(input) {
  // Converts decimal integers to roman numeral
  // {
  //   "1": "I", "5": "V", "10": "X", "50": "L",
  //   "100": "C", "500": "D", "1000": "M"
  // };

  let num = input;
  let result = [];

  while(num != 0) {
    if (num >= 1000) {
      result.push("M");
      num -= 1000;
    } else if(num >= 900) {
      result.push("CM");
      num -= 900;
    } else if(num >= 500) {
      result.push("D");
      num -= 500;
    } else if(num >= 400) {
      result.push("CD");
      num -= 400;
    } else if(num >= 100) {
      result.push("C");
      num -= 100;
    } else if(num >= 90) {
      result.push("XC");
      num -= 90;
    } else if(num >= 50) {
      result.push("L");
      num -= 50;
    } else if(num >= 40) {
      result.push("XL");
      num -= 40;
    } else if(num >= 10) {
      result.push("X");
      num -= 10;
    } else if(num >= 9) {
      result.push("IX");
      num -= 9;
    } else if(num >= 5) {
      result.push("V");
      num -= 5;
    } else if(num >= 4) {
      result.push("IV");
      num -= 4;
    } else if(num >= 1) {
      result.push("I");
      num -= 1;
    } else {
      console.log(`error: input = ${input}. num = ${num}\nresult = ${result}`);
      break;
    }
  }
  return result.reduce( (total, value) => { return total + value });
}
// Binding events for each element
[palindromeEl, romanEl, caesarsEl, telephoneEl, registerEl].forEach(
  function(each) {
    each.onclick = toggleElementView;
    each.onmouseenter = onMouseEnter;
    each.onmouseleave = onMouseLeave;
  }
);

// Binding event form input
palindromeInput.oninput = onPalindromeKeyInput;
romanInput.oninput = onRomanKeyInput;
