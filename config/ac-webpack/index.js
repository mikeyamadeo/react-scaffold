var path = require('path')
var webpack = require('webpack')
var defaults = require('lodash').defaults
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var getBaseConfig = require('./lib/base-config')

module.exports = function(opts) {

  _checkRequired(opts)

  var appPath = path.resolve(opts.in);
  var outputFolder = path.resolve(opts.out)
  var config, plugins, stylePathResolves

  /**
   * Set the specifications from webpack.config
   */
  var spec = defaults(opts, {
    entry: opts.isDev ? [ appPath ] : { app: appPath, vendors: opts.vendors },
    output: {
      path: outputFolder + '/',
      publicPath: outputFolder + '/',
      filename: opts.isDev ? 'bundle.js' : '[name].[hash].js',
      cssFilename: opts.isDev ? 'style.css' : 'style.[hash].css',
    },
    stylePath: opts.stylePath,
    resolves: null,
    isDev: true,
    port: 8080,
    host: 'localhost',
    htmlConfig: opts.htmlConfig
  })

  config = getBaseConfig(spec)
  plugins = _getPlugins(spec)

  //sass loader requires we specify paths to check for imports
  stylePathResolves = (
    'includePaths[]=' + path.resolve(spec.stylePath) + '&' +
    'includePaths[]=' + path.resolve('./node_modules')
  )

  if (spec.isDev) {

    /**
     * Dev specific configurations
     */

    config.devtool = 'eval'
    config.plugins = config.plugins.concat(plugins)
    config.module.loaders[0].loaders.unshift('react-hot')
    config.entry.unshift(
      'webpack/hot/dev-server', 
      'webpack-dev-server/client?http://' + spec.host + ':' + spec.port
    )
    config.module.loaders.push({ 
      test: /(\.scss|\.css)$/,
      loader: 'style!css!sass?outputStyle=expanded&' + stylePathResolves
    })

  } else {

    /**
     * Production specific configurations
     */

    config.devtool = 'source-map'
    config.plugins = config.plugins.concat(plugins)


    /**
     * ExtractTextPlugin moves every style import in entry chunks into a separate css 
     * output file. Stylesheet bundle is loaded in parallel to the javascript bundle.
     * See: https://github.com/webpack/extract-text-webpack-plugin
     */
    config.plugins = config.plugins.concat([
      new ExtractTextPlugin(config.output.cssFilename, {
        allChunks: true
      })
    ])

    config.module.loaders.push({ 
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!sass?outputStyle=expanded&' + stylePathResolves
      )
    })

  }

  return config
}

/**
 * Throws error if required opts aren't provided
 */
function _checkRequired (opts) {
  var props = ['out', 'in', 'isDev']
  if (!opts || !props.every(function (prop) { return opts.hasOwnProperty(prop) })) {
    throw new Error('Must pass in options with `in`, `out`, and `isDev` properties')
  }
}

function _getPlugins(config) {
  return config.isDev ? 
    _getDevPlugins(config) :
    _getProductionPlugins(config)
}

function _getDevPlugins() {
  return [
    new webpack.HotModuleReplacementPlugin(),
  ]
}

function _getProductionPlugins(config) {
  return [

    /**
     *  Searches for equal or similar files and deduplicates them in the output.
     */
    new webpack.optimize.DedupePlugin(),

    /**
     * Reduces the total file size and is recommended. So why not?
     */
    new webpack.optimize.OccurenceOrderPlugin(true),

    /**
     * Generates an extra chunk, which contains vendor modules shared between 
     * entry points.
     */
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

    /**
     * This reduces the react lib size by notifying it we are in production.
     */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),

    /**
     * Minification!
     */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),

    /**
     * Source of our gzip power!
     */
    new CompressionPlugin({
      asset: "{file}.gz",
      algorithm: "gzip",
      regExp: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
