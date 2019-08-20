[![dependencies Status](https://david-dm.org/abircb/quickbuild/status.svg)](https://david-dm.org/abircb/quickbuild)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Gitter](https://badges.gitter.im/quickbuild-npm/community.svg)](https://gitter.im/quickbuild-npm/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![badgen.net](https://badgen.net/badge/libraries/io/blue)](https://libraries.io/github/abircb/quickbuild)

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
   -v, --version           output the version number
       --verbose           enable verbose mode
   -q, --quickestbuild     create generic boilerplate
   -n, --name              enter your project name
   -i, --install           install project dependencies
   -g, --git               initialize git
       --mit               add MIT license
       --apache            add Apache 2.0 license
       --bsd               add BSD 2-Clause license
   -u, --unlicensed        create an unlicensed project

  Examples
    $ quickbuild
    $ quickbuild --git
    $ quickbuild --git --bsd
    $ quickbuild -u -g --install --verbose
    $ quickbuild -n "some project" --git --apache
```

## Available templates
<ul>
  <li><a href="./templates/Express.js server">Express.js server</a></li>
  <li><a href="./templates/Node.js server">Node.js server</a></li>
  <li><a href="./templates/Node.js server (advanced)">Node.js server (Advanced)</a></li>
  <li><a href="./templates/Electron App Quick Start">Electron App Quick Start</a></li>
  <li><a href="./templates/Electron App (Advanced)">Electron App (Advanced)</a></li>
  <li><a href="./templates/Static Webpage">Static Webpage</a></li>
  <li><a href="./templates/React-Redux">React-Redux application</a></li>
  <li><a href="./templates/jQuery Plugin">jQuery Plugin</a></li>
  <li><a href="./templates/ECMAScript 6">ECMAScript 6</a></li>
  <li><a href="./templates/Chrome Extension">Chrome Extension</a></li>
  <li><a href="./templates/Firefox Extension">Firefox Extension</a></li>
  <li><a href="./templates/Crossover Extension">Cross-browser Extension</a></li>
  <li><a href="./templates/Atom UI">Atom UI theme template</a></li>
  <li><a href="./templates/Typescript">Typescript</a></li>
  <li><a href="./templates/quickestbuild">quickestbuild</a></li>
</ul>

## Prerequisite
<ul>
  <li>Node.js 8 or later</li>
  <li>Git 2.11 or later</li>
</ul>
