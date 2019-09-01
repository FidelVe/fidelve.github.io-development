// This scripts reads an html file and returns a css file preformatted with all the classes and id's defined in the html file.
const fs = require("fs");

// regular expression to look for the id's and classes
let regex = /\bid.{2}[\w\-]+.|\bclass.{2}[\w\-]+./g;
let regex2 = /([a-zA-Z]+[\=\"]{2})([\w\-]+)(.{1})/;

// parsed CSS
let parsedToCSS = "";

// HTML file to be parsed
let fileName = "index.html";
let testString = fs.readFileSync("./"+ fileName, "utf8");

// let testString = 'id="main" id="header" id="title" id="description" class="labels" class="inputs" id="name" class="labels" class="inputs"class="labels" class="inputs" id="email" class="labels" class="inputs" id="number" class="inputs" class="labels" class="inputs" id="dropdown" class="labels" class="inputs" class="labels" class="inputs" id="comments" id="submit" id="footer"';

let arrayFromHTML = testString.match(regex);
// console.log(arrayFromHTML);

for (let each of arrayFromHTML) {
  let matchStr;
  if (each.startsWith("id")) {
    matchStr = each.replace(regex2, "#\$2 {}\n");
  } else if (each.startsWith("class")) {
    matchStr = each.replace(regex2, ".\$2 {}\n")
  }

  if (!parsedToCSS.includes(matchStr)) {
    parsedToCSS += matchStr;
  }
}
console.log(parsedToCSS);
