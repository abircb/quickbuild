import {
  createProject
} from './main'
const arg = require('arg')
const inquirer = require('inquirer')

function parseArgumentsIntoOptions (rawArgs) {
  const args = arg({
    '--git': Boolean,
    '--quickestbuild': Boolean,
    '--install': Boolean,
    '--verbose': Boolean,
    '--mit': Boolean,
    '--apache': Boolean,
    '--bsd': Boolean,
    '--unlicensed': Boolean,
    '-g': '--git',
    '-q': '--quickestbuild',
    '-i': '--install',
    '-v': '--verbose',
    '-u': '--unlicensed'
  }, {
    argv: rawArgs.slice(2)
  })
  return {
    skipPrompts: args['--quickestbuild'] || false,
    verbose: args['--verbose'] || false,
    git: args['--git'] || false,
    license_MIT: args['--mit'] || false,
    license_Apache: args['--apache'] || false,
    license_BSD: args['--bsd'] || false,
    unlicensed: args['--unlicensed'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    projectName: 'quickestbuild'
  }
}

async function promptForMissingOptions (options) {
  const defaultTemplate = 'quickestbuild'
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      license: 'MIT License'
    }
  }

  const questions = [{
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
      else return 'Name may only include letters, numbers, underscores and hashes'
    }
  }]

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Choose a project structure',
      choices: ['Atom UI', 'Chrome Extension', 'Firefox Extension', 'Crossover Extension', 'Electron App Quick Start', 'Electron App (Advanced)', 'ECMAScript 6', 'Express.js server', 'jQuery Plugin', 'Node.js server (advanced)', 'Node.js server', 'React-Redux', 'Static Webpage', 'Typescript'],
      default: defaultTemplate
    })
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize git?',
      default: false
    })
  }

  if (!options.license_MIT && !options.license_Apache && !options.license_BSD && !options.unlicensed) {
    questions.push({
      type: 'list',
      name: 'license',
      message: 'Choose a LICENSE',
      choices: ['Apache License 2.0', 'Academic Free License v3.0', 'MIT License', 'BSD 2-Clause', 'CC-BY-2.0', 'GNU General Public License v3.0', 'Linux OpenIB', 'Microsoft Public License', 'Custom', 'Unlicensed'],
      default: false
    })
  }

  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    projectName: answers.projectName,
    license: options.license || options.license_BSD || options.license_MIT || options.license_Apache || answers.license,
    unlicensed: options.unlicensed
  }
}

export async function cli (args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  await createProject(options)
}
