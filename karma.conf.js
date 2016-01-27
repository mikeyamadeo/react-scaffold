var webpackConfig = require('./webpack.config.js')
webpackConfig.devtool = 'inline-source-map'

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ], // run in Chrome

    singleRun: true, // just run once by default

    frameworks: [ 'mocha' ], // use the mocha test framework

    files: [
      'specs.webpack.js' // just load this file
    ],

    preprocessors: {
      'specs.webpack.js': [ 'webpack', 'sourcemap' ] // preprocess with webpack and our sourcemap loader
    },

    reporters: [ 'mocha' ], // report results in this format

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-mocha-reporter'
    ]

  })
}
