const inquirer = require('inquirer');
const { title } = require('process');
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
    message: 'Add any brief notes you think the user should know.',
    name: 'notes',
},
{
    message: 'Any visuals, please add.',
    name: 'visuals',
},
{
    type: 'list',
    message: 'Any license? Which one?',
    name: 'license',
    choices: ['MIT', 'None'],
},
{
    type: 'input',
    message: 'What is *one* function of your project? You\'ll be prompted for more If you are done, just press enter',
    name: 'property',
    loop: true,
}]
    

// import inquirer from 'inquirer';

const repeatQuestion = async (inputs = []) => {
  const prompts = [
    {
        type: 'input',
        message: 'What is *one* function of your project? If you are done, just press enter',
        name: 'property',
        loop: true,
    },
  ];

  const input = await inquirer.prompt(prompts);
//   console.log(input)
  let newInputs = [];

  // if there is a new property, add it to newInputs and keep looping, else just set newInputs to whats in inputs and return;
  return input.property !== '' ? (newInputs = [...inputs, input.property], repeatQuestion(newInputs)) : 
  (newInputs = inputs, newInputs);
};

const questionSix = async (question) => {
  const input = question.loop ? await repeatQuestion() : inquirer.prompt(question);
//   console.log(input);
  return input;
};

const init = async () => {
const prompts = await inquirer.prompt(questions.slice(0, 6))
const answers = await questionSix(questions[6]);
prompts['properties'] = answers;
generateMarkdown(prompts);
}

init();