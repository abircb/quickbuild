const chalk = require('chalk')

export function usageInfo(errorMessage) {
  console.error('%s ' + errorMessage, chalk.red.bold('ERROR'));
}
