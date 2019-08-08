import arg from 'arg';
import inquirer from 'inquirer';
import {
  createProject
} from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg({
    '--git': Boolean,
    '--quickestbuild': Boolean,
    '--install': Boolean,
    '--verbose': Boolean,
    '-g': '--git',
    '-q': '--quickestbuild',
    '-i': '--install',
    '-v': '--verbose'
  }, {
    argv: rawArgs.slice(2),
  });
  return {
    skipPrompts: args['--quickestbuild'] || false,
    verbose: args['--verbose'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    projectName: 'quickestbuild'
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'quickestbuild';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [{
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Name may only include letters, numbers, underscores and hashes';
    }
  }];

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Choose a project structure',
      choices: ['Atom UI', 'Chrome Extension', 'Electron App Quick Start', 'Electron App (Advanced)', 'Express.js server', 'Node.js server (advanced)', 'Node.js server', 'React-Redux', 'Static Webpage', 'Typescript'],
      default: defaultTemplate
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize git?',
      default: false
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    projectName: answers.projectName
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  console.log(options)
  await createProject(options);
}
