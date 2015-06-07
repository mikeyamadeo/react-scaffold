var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var fs = require('fs');
var webpackConfig = require(path.resolve('./', 'webpack.config.js'));
var mainPath = path.resolve('./', 'src', 'index.js');


module.exports = function () {

  // First we fire up Webpack an pass in the configuration we
  // created
  var compiler = Webpack(webpackConfig, function (arg1, arg2) {

    var html

    if (arg2.compilation.assets) {
      html = arg2.compilation.assets['index.html'].source()
    } else {
      html = '<!doctype html>'
    }

    // Due to a bug with the style-loader we have to "touch" a file
    // to force a rebundle after the initial one. Kudos to my colleague 
    // Stephan for this one
    fs.writeFile('./public/index.html', html, function(err) {
      if (err) {
        console.log(err);
      }
    })

    fs.writeFileSync(mainPath, fs.readFileSync(mainPath).toString())

    console.log('Project is ready!')

  });

  var bundler = new WebpackDevServer(compiler, {

    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/',

    // Configure hot replacement
    hot: true, 

    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // We fire up the development server
  bundler.listen(8080, 'localhost', function () {
    console.log('Bundling project, please wait...');
  });

};