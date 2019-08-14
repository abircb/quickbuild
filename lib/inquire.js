const CURR_DIR = process.cwd()
const inquirer = require('inquirer');
const fs = require('fs')
const fileGenerator = require('./file-generator.js')

const CHOICES = fs.readdirSync(`${CURR_DIR}/templates`);

const QUESTIONS = [{
    name: 'project-choice',
    type: 'list',
    message: 'What project would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Name may only include letters, numbers, underscores and hashes';
    }
  }
];

function inquireUser() {
  inquirer.prompt(QUESTIONS)
    .then((answers) => {
      const projectChoice = answers['project-choice'];
      const projectName = answers['project-name'];
      const templatePath = `${__dirname}/templates/${projectChoice}`;

      fs.mkdirSync(`${CURR_DIR}/${projectName}`);

      fileGenerator.createDirectoryContents(templatePath, projectName)
      console.log("Fin.")
    })
    .catch((error) => {
      console.error(error + '\nVisit: https://github.com/abircb/project-generator/issues')
    });
}

module.exports ={
    inquireUser: inquireUser
}
