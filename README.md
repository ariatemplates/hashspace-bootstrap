[![Build Status](https://secure.travis-ci.org/ariatemplates/hashspace-bootstrap.png)](http://travis-ci.org/ariatemplates/hashspace-bootstrap)
[![devDependency Status](https://david-dm.org/ariatemplates/hashspace-bootstrap/dev-status.png)](https://david-dm.org/ariatemplates/hashspace-bootstrap#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/ariatemplates/hashspace-bootstrap/badge.png?branch=master)](https://coveralls.io/r/ariatemplates/hashspace-bootstrap?branch=master)
[![Selenium Test Status](https://saucelabs.com/browser-matrix/hashspace-bootstrap.svg)](https://saucelabs.com/u/hashspace-bootstrap)

!!! Work in progress !!!
========================

Hashspace components for Bootstrap.  

Already implemented:
 - Carousel

To be implemented:
 - Modal
 - Dropdown
 - ScrollSpy
 - Togglable tabs
 - Tooltips
 - Popovers
 - Alert messages
 - Buttons
 - Collapse
 - Affix
 - Autocomplete
 - Date picker

## Development

### Preparing your environment

- install Gulp  globally: `npm install -g gulp`
- install local npm modules: `npm install`

### Running scripts

For jshint validation:

- run `gulp checkstyle`

To run the tests:

- run `gulp test`

To use the project in **dev** mode:

- run `gulp build` to build it
- run `gulp play` to build it and start a webserver which watches source files at http://localhost:8080
- run `gulp play tdd` to work in the TDD mode (i.e. watch source files to build and run all tests)

To use the project in **production** mode:

- run `gulp` or `gulp package` to package it
- run `gulp www` to package it and start a webserver at http://localhost:8080

To clean all files created during builds:

- run `gulp clean`
