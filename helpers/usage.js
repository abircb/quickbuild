const chalk = require('chalk')
const release = require('../package.json')

export function errorInfo (errorMessage) {
  console.error('%s ' + errorMessage, chalk.red.bold('ERROR'))
  usageInfo()
}

export function usageInfo () {
  console.log('Usage \n    $ quickbuild <option>\n')
  console.log('Options')
  console.log('   -v, --version           output the version number')
  console.log('       --verbose           enable verbose mode')
  console.log('   -q, --quickestbuild     create generic boilerplate')
  console.log('   -n, --name              enter your project name')
  console.log('   -i, --install           install project dependencies')
  console.log('   -g, --git               initialize git')
  console.log('       --mit               add MIT license')
  console.log('       --apache            add Apache 2.0 license')
  console.log('       --bsd               add BSD 2-Clause license')
  console.log('   -u, --unlicensed        create an unlicensed project\n')
  console.log('Examples')
  console.log('    $ quickbuild')
  console.log('    $ quickbuild --git')
  console.log('    $ quickbuild --git --bsd')
  console.log('    $ quickbuild -u -g -i --verbose')
  console.log('    $ quickbuild -n "some project" -g --apache')
}

export function versionInfo() {
  console.log(release.version)
}
