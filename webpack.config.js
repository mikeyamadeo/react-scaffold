var path = require('path')
var appPath = path.resolve(__dirname, 'src', 'index.js')
var stylePath = path.resolve(__dirname, 'src', 'styles')
var buildPath = path.resolve(__dirname, 'public')
var getConfig = require('./config/ac-webpack')
var env = process.env.NODE_ENV || 'development'

/** 
 * 1. Required
 */
module.exports = getConfig({

  isDev: env === 'development' /* [1] */,

  in: appPath /* [1] */,

  out: buildPath /* [1] */,

  stylePath: stylePath,

  /**
   * Production index.html settings. Used to generate dynamic
   * index for both dev & prod.
   */
  htmlConfig: {
    title: 'AncestorCloud',
    favicon: '/assets/icons/favicon.ico',
    googleFonts: [
      'Noto+Sans'
    ],
    gaId: '',
    reactHook: {
      attr: 'id',
      value: 'app'
    }
  }, 
  
  /**
   * Files to split into separate vendor bundle. Should only include
   * libraries that aren't likely to change any time soon.
   */
  vendors: [
    'react', 
    'react-router'
  ],

  /**
   * Directories to check for module imports
   * see: https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346
   */
  resolves: [
    'styles',
    'shared',
    'components',
    'constants',
    'flux',
    'utils',
    'public/assets',
    'testUtils',
    'node_modules'
  ]

})
 



