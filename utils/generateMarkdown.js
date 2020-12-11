const fs = require('fs');

// Takes a string and converts it to title case, that it capitalizes all words that "should" be capitalized in a title
String.prototype.toTitleCase = function() {
  // according to http://www.superheronation.com/2011/08/16/words-that-should-not-be-capitalized-in-titles/ & https://www.grammarcheck.net/capitalization-in-titles-101/
  const doNotCap = ['a','an','the','for','and','nor','by','or', 'yet','so', 'at', 'from', 'of', 'on', 'to', 'with', 'is', 'in', 'into','off', 'onto', 'once', 'over','as','if','than','till', 'when', 'but','like','near','past','that','up','upon']
  let words = this.valueOf().trim().toLowerCase();
  words = words.split(' ');
  const title = words.map((word, i) =>
      doNotCap.includes(word) && i ?
      word : word.charAt(0).toUpperCase() + word.substring(1)
  ); return title.join(' ');
};

String.prototype.toSentence = function() {
  let sentence = this.valueOf().trim();
  sentence = sentence.charAt(0).toUpperCase() + sentence.substring(1)
  return /[.?!]$/.test(sentence) ? sentence : (sentence + '.');
}


const generateLicense = (type) => {
  let license = "";
  switch(type) {
    // I only really know about the MIT licese right now, also the other ones were way too long
    case 'MIT':
      license = `MIT License

      Copyright (c) 2020 Tasha876
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
      `;
      break;
  } return license;
}

// function to generate markdown for README
const generateMarkdown = (data) => {

  fs.writeFile('License', generateLicense(data.license),(error) => {
    if (error) console.warn(error);
    console.log(data);
  });


  const listProps = () => {
    let props = "";
    for (property of data.properties) {
      props += '* ' + property.toSentence() + '\n';
    }; return props ? props : "Guess my project does nothing.";
  }

  if (!data.title) data.title = 'Untitled';
  
  toWrite = 
`#${data.title.toTitleCase()} \n
${data.desc ? data.desc.toSentence() : ``}\n
${data.desc ? `###Notes\n
* ${data.notes.toSentence()}\n` : ``}
${data.visuals ? `###Visuals
![${data.title}](${data.visuals})` : ``}
###Properties
${listProps()}
###Link to the Repository
Link to the [GitHub repository](https://github.com/${data.username}/${data.title.replace(' ', '-')}).
###Deployed Website
[The deployed site](https://${data.username.toLowerCase()}.github.io/${data.title.replace(' ', '-')}/), hosted by GitHub Pages.
###Authors and Aknowledgement
This project was created entirely by [${data.username}](https://github.com/${data.username}).
###License \n
${data.license !== 'None' ? `This project is covered by the [${data.license}](License) license.` : `This project has no license.`}`


  fs.writeFile('./readme.md', toWrite, (error) => {
    if (error) console.warn(error);
    console.log(data);
  });
  return `#${data.title}`;
}

module.exports = generateMarkdown;
