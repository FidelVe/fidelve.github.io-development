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

// Binding events for each element
[palindromeEl, romanEl, caesarsEl, telephoneEl, registerEl].forEach(
  function(each) {
    each.onclick = toggleElementView;
    each.onmouseenter = onMouseEnter;
    each.onmouseleave = onMouseLeave;
  }
);

// Binding event form palindrome input
palindromeInput.oninput = onPalindromeKeyInput;
