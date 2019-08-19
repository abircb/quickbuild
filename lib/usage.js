const chalk = require('chalk')

export function errorInfo(errorMessage) {
  console.error('%s ' + errorMessage, chalk.red.bold('ERROR'));
}

export function usageInfo() {
  console.log('usage info here')
}
