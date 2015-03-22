var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  context: __dirname + '/app',
  entry: './index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'       
  },
  
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    modulesDirectories: [
      'styles',
      'shared',
      'components',
      'constants',
      'flux',
      'flux/stores',
      'flux/actions',
      'utils',
      'public/assets',
      'node_modules'
    ]
  },
  
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader!babel', exclude: /node_modules/},
      { test: /\.scss$/, 
        loader: 'style!css!sass?outputStyle=expanded&' +
        'includePaths[]=' + 
          (path.resolve(__dirname, './app/styles')) + '&' +
        'includePaths[]=' + 
          (path.resolve(__dirname, './node_modules'))
      },
      { test: /\.css$/, 
        loader: 'style!css?outputStyle=expanded&' +
        'includePaths[]=' + 
          (path.resolve(__dirname, './app/styles')) + '&' +
        'includePaths[]=' + 
          (path.resolve(__dirname, './node_modules'))
      },
      { test: /\.(png|svg|jpg)$/, loader: 'url' }
    ]
  },

  

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    /**
     * This is wizardry. Allows files within scss to be resolved
     * relative to index.html vs. relative from scss file. Avoids 
     * having to use varying lengths of url('../../../image.svg')
     * inside scss files and use url('assets/icons/icon.svg')
     * instead. Big win.
     * References:
     *  https://github.com/webpack/webpack/issues/146
     *  http://webpack.github.io/docs/list-of-plugins.html
     */
    new webpack.NormalModuleReplacementPlugin(/\.(svg|png|jpg)$/, ""),
  ]
};