import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install'
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    projectName: ''
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'unknown';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['Atom UI', 'Chrome Extension', 'Express.js server', 'Node.js server (advanced)', 'Node.js server', 'React-Redux', 'Static Webpage', 'Typescript'],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Should a git be initialized?',
      default: false,
    });
  }

  if(!options.projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: function(input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Name may only include letters, numbers, underscores and hashes';
      },
      default: 'unnamed',
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    projectName: options.projectName
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  console.log(options)
  await createProject(options);
}
