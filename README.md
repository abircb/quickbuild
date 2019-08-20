[![dependencies Status](https://david-dm.org/abircb/quickbuild/status.svg)](https://david-dm.org/abircb/quickbuild)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Gitter](https://badges.gitter.im/quickbuild-npm/community.svg)](https://gitter.im/quickbuild-npm/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# quickbuild
A mature, feature-complete application generator with an emphasis on speed.

## Quick Start
The quickest way to get started with quickbuild is to utilize the executable without arguments. This will launch an interactive UI that guides you through creating a new application

```cli
$ quickbuild
```
Pass the following argument to install dependencies for your project

```cli
$ quickbuild --install
```

## Usage

```cli 
$ quickbuild --help

  Usage
    $ quickbuild <option>

  Options
    --version, -v         output the version number
    --verbose             enable verbose mode
    --quickestbuild, -q   create generic boilerplate
    --name, -n            enter your project name
    --install, -i         install project dependencies
    --git, -g             initialize git
    --mit                 add MIT license
    --apache              add Apache 2.0 license
    --bsd                 add BSD 2-Clause license
    --unlicensed, -u      create unlicensed project

  Examples
    $ quickbuild
    $ quickbuild --git
    $ quickbuild --git --bsd
    $ quickbuild -u -g --install --verbose
    $ quickbuild -n "some project" --git --apache
```

## Prerequisite
<ul>
  <li>Node.js 8 or later</li>
  <li>Git 2.11 or later</li>
</ul>
