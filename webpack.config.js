var path = require('path')
var appPath = path.resolve(__dirname, 'src', 'index.js')
var stylePath = path.resolve(__dirname, 'src', 'App', 'style')
var buildPath = path.resolve(__dirname, 'public')
var getConfig = require('ac-webpack')
var html = require('./html.js')

/**
 * 1. Required
 */
module.exports = getConfig({

  in: appPath, /* [1] */

  out: buildPath, /* [1] */

  stylePath: stylePath,

  cssModules: true,

  /**
   * Production index.html settings. Used to generate dynamic
   * index for both dev & prod.
   */
  html: {
    dev: html.dev,
    prod: html.prod
  },

  /**
   * Files to split into separate vendor bundle. Should only include
   * libraries that aren't likely to change any time soon.
   */
  vendors: [
    'react',
    'react-router',
    'axios'
  ],

  /**
   * Directories to check for module imports
   * see: https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346
   */
  resolves: [
    'src',
    'shared',
    'public/assets',
    'node_modules'
  ]

})
