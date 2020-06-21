[![npm version](https://badge.fury.io/js/quickbuild.svg)](https://badge.fury.io/js/quickbuild)
![npm](https://img.shields.io/npm/dt/quickbuild)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![badgen.net](https://badgen.net/badge/libraries/io/blue)](https://libraries.io/github/abircb/quickbuild)
![license](https://img.shields.io/npm/l/quickbuild)

# quickbuild
A mature, feature-complete application generator with an emphasis on speed.

## Installation

```cli
$ npm install quickbuild -g
```

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
   <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/AngularJS App">AngularJS App</a>: An application skeleton for a typical <a href="https://angularjs.org/">AngularJS</a> web app that is preconfigured to install the AngularJS framework and a bunch of development and testing tools for instant web development gratification. Based on the official<a href="https://github.com/angular/angular-seed"> AngularJS Seed App</a>.</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Express.js server">Express.js server</a>: An Express application skeleton</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/React-Redux">React-Redux application</a>: A React-Redux application orgranised by nature. From the <a href="https://redux.js.org/advanced/example-reddit-api">Redux Book</a></li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/React">React application</a>: A highly scalable, simple React boilerplate. From the official <a href="https://github.com/react-boilerplate/react-boilerplate">React Boilerplate project</a>.</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Flutter%20Application">Flutter</a>: A very simple demo <a href="https://github.com/SimpleBoilerplates/Flutter">Flutter boilerplate</a> project with an existing sign-in/sign-up feature.</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/TypeScript-Node">Typescript-Node Web application</a>: A starter template with a good end-to-end project setup and workflow for writing Node code in TypeScript</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Electron App Quick Start">Electron App Quick Start</a>: A minimal Electron application to quick-start your development. Based on Electron's <a href="https://github.com/electron/electron-quick-start">project</a> of the same name</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Electron App (Advanced)">Electron App (Advanced)</a>: A desktop app that interactively- and with sample code- demonstrates core features of the Electron API. Based on <a href="https://github.com/electron/electron-api-demos">Electron API Demos</a></li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Static Webpage">Static Webpage</a>: A simple webpage template</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/jQuery Plugin">jQuery Plugin</a>: A jQuery plugin project template based on jQuery Boilerplate</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Chrome Extension">Chrome Extension</a>: A simple Chrome extension template</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Firefox Extension">Firefox Extension</a>: A simple Firefox extension template</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Crossover Extension">Cross-browser Extension</a>: A minimalistic crossover browser extension to quick-start plugin development for Opera, Chrome & Firefox.</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/Atom UI">Atom UI theme template</a>: A starter template for creating an Atom UI theme. Based on Atom's <a href="https://github.com/atom-community/ui-theme-template">project</a> of the same name</li>
  <li><a href="https://github.com/abircb/quickbuild/tree/master/templates/quickestbuild">quickestbuild</a></li>
</ul>

## Prerequisite
<ul>
  <li>Node.js 4 or later</li>
</ul>
