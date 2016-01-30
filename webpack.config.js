var path = require('path')
var appPath = path.resolve(__dirname, 'src')
var stylePath = path.resolve(__dirname, 'src', 'App', 'style')
var buildPath = path.resolve(__dirname, 'public')
var getConfig = require('prepacked')
var html = require('./html.js')
var isDev = process.env.NODE_ENV !== 'production'

var config = getConfig({
  isDev: isDev,
  src: appPath,
  out: buildPath,
  styleSrc: stylePath,
  resolves: [
    'shared'
  ],
  featureFlags: {
    '__DEV__': isDev,
    '__PROD__': !isDev
  },
  devServer: {
    contentBase: buildPath
  },
  html: isDev
    ? html.dev
    : html.prod
})

module.exports = config
