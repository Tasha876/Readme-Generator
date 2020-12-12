const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
{
    type: 'input',
    message: 'What is your user name?',
    name: 'username',
},
{
    type: 'input',
    message: 'What is the title of your project?',
    name: 'title',
},
{
    type: 'input',
    message: '*Briefly* describe your project.',
    name: 'desc',
},
{
    type: 'input',
    message: 'How does the user install your project?',
    name: 'install',
},
{
  type: 'input',
  message: 'How does the user use your project?',
  name: 'usage',
},
{
  type: 'input',
  message: 'Any example tests?',
  name: 'tests',
},
{
  type: 'input',
  message: 'Any visuals, please add?',
  name: 'visuals',
},
{
  type: 'list',
  message: 'Any license? Which one?',
  name: 'license',
  choices: ['MIT', 'GPLv3', 'GPLv2', 'Apache'],
},
{
  type: 'input',
  message: 'Enter your email address?',
  name: 'email',

  validate: async (input) => {
    let regex = /(^((\w+-)*\w+(\.(\w+-)*\w+)*@(\w+-)*\w+(\.([A-Za-z]{2,4})){1,4})$)/;
    if (!regex.test(input)) {
       return 'Please enter a valid email address.';
    }
    return true;
  }
},
{
    type: 'input',
    name: 'property',
    loop: true,
}]
    
// import inquirer from 'inquirer';

const repeatQuestion = async (inputs = []) => {
  const prompts = [
    {
        type: 'input',
        message: 'What is *one* function of your project? You\'ll be prompted for more. If you are done, just press enter',
        name: 'property',
        loop: true,
    },
  ];

  const input = await inquirer.prompt(prompts);
  let newInputs = [];

  // if there is a new property, add it to newInputs and keep looping, else just set newInputs to whats in inputs and return;
  return input.property !== '' ? (newInputs = [...inputs, input.property], repeatQuestion(newInputs)) : 
  (newInputs = inputs, newInputs);
};

const questionRepeat = async (question) => {
  const input = question.loop ? await repeatQuestion() : inquirer.prompt(question);
  return input;
};

const init = async () => {
const prompts = await inquirer.prompt(questions.slice(0, 9))
const answers = await questionRepeat(questions[9]);
prompts['properties'] = answers;
generateMarkdown(prompts);
}

init();