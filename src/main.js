import { projectInstall } from 'pkg-install'
import { generateLicense } from '../helpers/license'
import { promisify } from 'util'
const chalk = require('chalk')
const execa = require('execa')
const fs = require('fs')
const gitignore = require('gitignore')
const Listr = require('Listr')
const ncp = require('ncp')
const path = require('path')

const access = promisify(fs.access)
const writeFile = promisify(fs.writeFile)
const copy = promisify(ncp)
const writeGitignore = promisify(gitignore.writeFile)

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  })
}

async function deleteGitignore(options) {
  const result = await execa('rm', ['.gitignore'], {
    cwd: options.targetDirectory,
  })
  if (result.failed) {
    return Promise.reject(
      new Error(
        '%s An error occured while initialising the project',
        chalk.red.bold('ERROR')
      )
    )
  }
}

async function createLicense(options) {
  const targetPath = path.join(options.targetDirectory, 'LICENSE')
  if (options.unlicensed) {
    return null
  }
  try {
    const license = await generateLicense(options)
    const licenseContent = license.licenseText
      .replace('<year>', new Date().getFullYear())
      .replace('<copyright holders>', `${options.name} (${options.email})`)
    return writeFile(targetPath, licenseContent, 'utf8')
  } catch (err) {
    console.error('%s LICENSE error', chalk.red.bold('ERROR'))
    console.error(
      'If this persists, raise an issue on https://github.com/abircb/quickbuild'
    )
    process.exit(1)
  }
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  })
  if (result.failed) {
    return Promise.reject(
      new Error(
        '%s An error occured while initialising git',
        chalk.red.bold('ERROR')
      )
    )
  }
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: path.join(process.cwd(), options.projectName),
    email: 'therandomdevtoolsproject@gmail.com',
    name: 'The Random DevTools Project',
  }

  const templateDir = path.resolve(
    new URL(import.meta.url).pathname,
    '../../templates',
    options.template
  )
  options.templateDirectory = templateDir

  try {
    await access(templateDir, fs.constants.R_OK)
  } catch (err) {
    console.error('%s Invalid project structure', chalk.red.bold('ERROR'))
    console.error(
      'If this persists, raise an issue on https://github.com/abircb/quickbuild'
    )
    process.exit(1)
  }

  const tasks = new Listr(
    [
      {
        title: 'Copying project files',
        task: () => copyTemplateFiles(options),
      },
      {
        title: 'Creating LICENSE',
        task: () => createLicense(options),
        enabled: () => !options.unlicensed,
      },
      {
        title: 'Initializing git',
        task: () => initGit(options),
        enabled: () => options.git,
      },
      {
        title: 'Completing final checks',
        task: () => deleteGitignore(options),
        enabled: () => !options.git,
      },
      {
        title: 'Installing dependencies (this may take a while ..)',
        task: () =>
          projectInstall({
            cwd: options.targetDirectory,
          }),
        skip: () =>
          !options.runInstall
            ? 'Pass --install to automatically install dependencies'
            : undefined,
      },
    ],
    {
      exitOnError: false,
    }
  )

  await tasks.run().catch(() => {
    console.log(
      "An error occured while creating your project. That's all we know\nIf this persists, raise an issue on https://github.com/abircb/quickbuild"
    )
  })
  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}
