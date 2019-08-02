#!/usr/bin/env/ node

const CURR_DIR = process.cwd()
const inquirer = require('inquirer');
const fs = require('fs')

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


inquirer.prompt(QUESTIONS)
  .then((answers) => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName)
  })
  .catch((error) => {
    console.log(error + '\nVisit: https://github.com/abircb/project-generator/issues')
  });

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    // NPM recursively goes through nested directories and renames .gitignore files to .npmignore
    if (file === '.npmignore') file = '.gitignore';

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}

module.exports = {
  createDirectoryContents: createDirectoryContents
}
