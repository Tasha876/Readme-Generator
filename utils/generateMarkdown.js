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
  let badge = '';
  switch(type) {
    // I only really know about the MIT licese right now, also the other ones were way too long
    case 'GLPv2':
      badge = `[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`;
      break;
    case 'GPLv3':
      badge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
      break;
    case 'MIT':
      badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
      break;
    case 'Apache':
      badge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
      break;
  } return badge;
}

// function to generate markdown for README
const generateMarkdown = (data) => {
  
  let i = 1;

  const listProps = () => {
    let props = "";
    for (property of data.properties) {
      props += '* ' + property.toSentence() + '\n';
    }; return props ? props : "None at the moment.";
  }

  if (!data.title) data.title = 'Untitled';

  toWrite = 
`# ${data.title.toTitleCase()} \n
${data.desc ? data.desc.toSentence() : ``}\n
${generateLicense(data.license)}\n
## Table of Contents
${data.install ? `1. [ Install ](#Install)` : ``}
${data.usage ? `1. [ Usage ](#Usage)` : ``}
${data.visuals ? `1.  [ Visuals ](#Visuals)` : ``}
${data.properties ? `1.  [ Properties ](#Properties)` : ``}
1. [ Link to Repository ](#Link)
1. [ Deployed Website ](#Site)
${data.tests ? `1.  [ Tests ](#Tests)` : ``}
1. [ Authors and Aknowledgement ](#Authors)
1. [ Questions ](#Questions)
1. [ License ](#License)

<a name="Install"></a>
${data.install ? `## ${i++}. Install\n
${data.install.toSentence()}\n` : ``}
<a name="Usage"></a>
${data.usage ? `## ${i++}. Usage\n
${data.usage.toSentence()}\n` : ``}
<a name="Visuals"></a>
${data.visuals ? `## ${i++}. Visuals\n
![${data.title}](${data.visuals})` : ``}
<a name="Properties"></a>
## ${i++}. Properties \n
${listProps()}
<a name="Link"></a>
## ${i++}. Link to the Repository \n
<a name="Site"></a>
Link to the [GitHub repository](https://github.com/${data.username}/${data.title.replace(' ', '-')}).
## ${i++}. Deployed Website \n
[The deployed site](https://${data.username.toLowerCase()}.github.io/${data.title.replace(' ', '-')}/), hosted by GitHub Pages.
<a name="Tests"></a>
${data.tests ? `## ${i++}. Tests\n
* ${data.tests.toSentence()}\n` : ``}
<a name="Authors"></a>
## ${i++}. Authors and Aknowledgement \n
This project was created entirely by [${data.username}](https://github.com/${data.username}).
<a name="Questions"></a>
## ${i++}. Questions \n
Please direct all questions and inquiries to <${data.email}>.\n
<a name="License"></a>
## ${i++}. License \n
${data.license !== 'None' ? `This project is covered by the [${data.license}](License) license.` : `This project has no license.`}`


  fs.writeFile('generated_files/README.md', toWrite, (error) => {
    if (error) console.warn(error);
    console.log(data);
  });
  //return `# ${data.title}`;
}

module.exports = generateMarkdown;
