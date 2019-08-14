const license = require('spdx-license-list/full')

export async function generateLicense(options) {
  if ((options.license_MIT && options.license_Apache) || (options.license_MIT && options.license_GNU) || (options.license_GNU && options.license_Apache)) {
    throw "More than one license"
  } else {
    if (options.license_MIT || options.license == 'MIT License') {
      return license.MIT
    } else if (options.license_BSD || options.license == 'BSD 2-Clause') {
      return license["BSD-2-Clause-FreeBSD"]
    } else if (options.license_Apache || options.license == 'Apache License 2.0') {
      return license["Apache-2.0"]
    } else if (options.license == 'Academic Free License v3.0') {
      return license["AFL-3.0"]
    } else if (options.license == 'CC-BY-2.0') {
      return license["CC-BY-2.0"]
    } else if (options.license == 'GNU General Public License v3.0') {
      return license["GPL-3.0"]
    } else if (options.license == 'Linux OpenIB') {
      return license["Linux-OpenIB"]
    } else if (options.license == 'Microsoft Public License') {
      return license["MS-PL"]
    } else if (options.license == 'Custom') {
      return {
        licenseText: 'CUSTOM LICENSE\n\nMore information here: https://www.termsfeed.com/blog/license-software/\n\n\n\n\n\n\n\n\nby The Random DevTools Project'
      }
    } else {
      throw "Invalid license"
    }
  }
}
