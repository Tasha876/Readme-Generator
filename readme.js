const inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'input',
        message: 'What is your user name?',
        name: 'username',
    },
    ]).then((response) => {
        if (response.notes === true) {
            inquirer.prompt([
                {
                type: 'input',
                message: 'What notes did you think were important?',
                name: 'notes',
                }
            ])
        }
    })