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
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['components', 'utils', 'shared', 'node_modules']
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
      { test: /\.png$/, loader: 'url', exclude: /node_modules/ }
    ]
  },

  

  plugins: [new webpack.optimize.UglifyJsPlugin()]
};