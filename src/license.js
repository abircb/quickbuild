import license from 'spdx-license-list/full'

export async function generateLicense(options) {
  if ((options.license_MIT && options.license_Apache) || (options.license_MIT && options.license_GNU) || (options.license_GNU && options.license_Apache)) {
    throw "More than one license"
  }
  else {
    if(options.license_MIT || options.license == 'MIT License') {
      return license.MIT
    }
    else if (options.license_BSD || options.license == 'BSD 2-Clause') {
      return license.BSD-2-Clause-FreeBSD
    }
    else if(options.license_Apache || options.license == 'Apache License 2.0') {
      return license.Apache-2.0
    }
    else if(options.license == 'CC-BY-2.0') {
      return license.CC-BY-2.0
    }
    else if(options.license == 'Linux OpenIB') {
      return license.Linux-OpenIB
    }
    else if(options.license == 'Custom') {
      return {
        licenseText: ''
      }
    }
    else {
      throw "Invalid license"
    }
  }
}
