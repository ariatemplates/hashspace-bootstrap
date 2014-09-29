var preprocessors = {
    'src/**/*.hsp': ['hsp-compile', 'commonjs'],
    'src/**/*.js': ['hsp-transpile', 'commonjs'],
    'test/**/*.spec.js': ['commonjs'],
    'test/**/*.spec.hsp': ['hsp-compile', 'commonjs'],
    './node_modules/hashspace/hsp/**/*.js': ['commonjs']
};
var coveragePreprocessors = JSON.parse(JSON.stringify(preprocessors));
coveragePreprocessors['src/**/*.js'].push('coverage');

exports.common = {
    reporters: ['dots'],
    browsers: ['Firefox'],
    files: [
        'src/**/*.+(hsp|js)',
        'test/**/*.spec.*',
        './node_modules/sinon/pkg/sinon-ie.js'
    ],
    frameworks: ['mocha', 'expect', 'hsp', 'commonjs', 'sinon'],
    preprocessors: preprocessors,
    commonjsPreprocessor: {
        modulesRoot: './node_modules/hashspace'
    },
    // global config for SauceLabs
    sauceLabs: {
      username: 'hashspace-bootstrap',
      accessKey: '5bc971c0-02c9-4091-91ab-937f2b0eb52c',
      testName: 'hashspace-bootstrap tests'
    },
    // define SL browsers
    customLaunchers: {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7',
        version: '37'
      },
      'SL_Chrome_Beta': {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Linux',
        version: 'beta'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Linux'
      },
      'SL_Firefox_Beta': {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Linux',
        version: 'beta'
      },
      'SL_Safari_6': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.8',
        version: '6'
      },
      'SL_Safari_7': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9',
        version: '7'
      },
      'SL_IE_8': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '8'
      },
      'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
      },
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      },
      'SL_iOS_6': {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.9',
        version: '6.0'
      },
      'SL_iOS_7': {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.9',
        version: '7.1'
      },
      'SL_Android_4.0': {
        base: 'SauceLabs',
        browserName: 'ANDROID',
        platform: 'Linux',
        version: '4.0'
      },
      'SL_Android_4.1': {
        base: 'SauceLabs',
        browserName: 'ANDROID',
        platform: 'Linux',
        version: '4.1'
      },
      'SL_Android_4.2': {
        base: 'SauceLabs',
        browserName: 'ANDROID',
        platform: 'Linux',
        version: '4.2'
      },
      'SL_Android_4.3': {
        base: 'SauceLabs',
        browserName: 'ANDROID',
        platform: 'Linux',
        version: '4.3'
      },
      'SL_Android_4.4': {
        base: 'SauceLabs',
        browserName: 'ANDROID',
        platform: 'Linux',
        version: '4.4'
      }
    }
};

exports.test = {
    singleRun: true,
    preprocessors: coveragePreprocessors,
    reporters: ['dots', 'coverage'],
    browsers: ['Firefox'],
    coverageReporter: {
      type : 'lcovonly', //Set to html instead of lcovonly to get a readable report
      dir : 'test-results/karma/'
    }
};

exports.ci1 = {
    sauceLabs: {
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },
    transports: ['xhr-polling'],
    singleRun: true,
    browserNoActivityTimeout: 0,
    captureTimeout: 0,
    browsers: ['SL_Chrome', 'SL_IE_8', 'SL_IE_9', 'SL_Safari_7', 'SL_Android_4.4'],
    reporters: process.env.TRAVIS_PULL_REQUEST !== 'false' ? ['dots'] : ['dots', 'saucelabs']
}

exports.ci2 = {
    sauceLabs: {
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },
    transports: ['xhr-polling'],
    singleRun: true,
    browserNoActivityTimeout: 0,
    captureTimeout: 0,
    browsers: ['SL_Firefox', 'SL_iOS_7', 'SL_IE_10', 'SL_IE_11', 'SL_Safari_6', 'SL_Android_4.2'],
    reporters: process.env.TRAVIS_PULL_REQUEST !== 'false' ? ['dots'] : ['dots', 'saucelabs']
}

exports.ci3 = {
    sauceLabs: {
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },
    transports: ['xhr-polling'],
    singleRun: true,
    browserNoActivityTimeout: 0,
    captureTimeout: 0,
    browsers: ['SL_Firefox_Beta', 'SL_Chrome_Beta', 'SL_Android_4.0', 'SL_Android_4.1', 'SL_Android_4.3'],
    reporters: process.env.TRAVIS_PULL_REQUEST !== 'false' ? ['dots'] : ['dots', 'saucelabs']
}

exports.sauce = {
    singleRun: true,
    browserNoActivityTimeout: 20000,
    captureTimeout: 300000,
    browsers: ['SL_IE_8', 'SL_IE_9', 'SL_IE_10', 'SL_IE_11', 'SL_Safari_6', 'SL_Safari_7', 'SL_Firefox', 'SL_Chrome', 'SL_Android_4.0', 'SL_Android_4.1', 'SL_Android_4.2', 'SL_Android_4.3', 'SL_iOS_7'],
    reporters: ['dots']
};
