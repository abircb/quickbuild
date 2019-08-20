import {
  createProject
} from './main'
import {
  usageInfo, errorInfo, versionInfo
} from '../lib/usage'
const arg = require('arg')
const inquirer = require('inquirer')

function parseArgumentsIntoOptions (rawArgs) {
  try {
    const args = arg({
      '--help': Boolean,
      '--verbose': Boolean,
      '--version': Boolean,
      '--quickestbuild': Boolean,
      '--name': String,
      '--git': Boolean,
      '--install': Boolean,
      '--mit': Boolean,
      '--apache': Boolean,
      '--bsd': Boolean,
      '--unlicensed': Boolean,
      '-h': '--help',
      '-v': '--version',
      '-q': '--quickestbuild',
      '-n': '--name',
      '-g': '--git',
      '-i': '--install',
      '-u': '--unlicensed'
    }, {
      argv: rawArgs.slice(2),
      permissive: false
    })
    return {
      help: args['--help'] || false,
      version: args['--version'] || false,
      verbose: args['--verbose'] || false,
      skipPrompts: args['--quickestbuild'] || false,
      projectName: args['--name'] || undefined,
      git: args['--git'] || false,
      runInstall: args['--install'] || false,
      license_MIT: args['--mit'] || false,
      license_Apache: args['--apache'] || false,
      license_BSD: args['--bsd'] || false,
      licensed: args['--mit'] || args['--apache'] || args['--bsd'],
      unlicensed: args['--unlicensed'] || false,
      template: args._[0]
    }
  } catch (err) {
    errorInfo(err.message)
    process.exit(1)
  }
}

async function checkForTerminatingOptions (options) {
  if (options.help) {
    usageInfo()
    process.exit(1)
  }
  if(options.version) {
    versionInfo()
    process.exit(1)
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

  const questions = []

  if (!options.projectName) {
    questions.push({
      name: 'projectName',
      type: 'input',
      message: 'Project name:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
        else return 'fatal: Name may only include letters, numbers, underscores and hashes'
      }
    })
  }

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

  if (!options.licensed && !options.unlicensed) {
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
    projectName: options.projectName || answers.projectName,
    license: options.license_BSD || options.license_MIT || options.license_Apache || answers.license,
    unlicensed: options.unlicensed
  }
}

export async function cli (args) {
  let options = await parseArgumentsIntoOptions(args)
  await checkForTerminatingOptions(options)
  options = await promptForMissingOptions(options)
  await createProject(options)
}
