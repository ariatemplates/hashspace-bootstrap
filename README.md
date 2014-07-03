[![Build Status](https://secure.travis-ci.org/ariatemplates/hashspace-bootstrap.png)](http://travis-ci.org/ariatemplates/hashspace-bootstrap)
[![Selenium Test Status](https://saucelabs.com/browser-matrix/hashspace-bootstrap.svg)](https://saucelabs.com/u/hashspace-bootstrap)

hashspace-bootstrap
===================

Hashspace components for Bootstrap

## Development

### Preparing your environment

- install Gulp  globally: `npm install -g gulp`
- install local npm modules: `npm install`

### Running Tests

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
