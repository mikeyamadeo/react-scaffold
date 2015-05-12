Wepack Configuration
====================

Support for development & production environments. 

While developing:
+ transpile ES6+ (including polyfills for features like promises), JSX, SASS
+ livereload on change
+ dynamically generate index.html 

Note: There is an unknown bug where not all the styles will be loaded and app will look off. Just run dev server again. It will eventually render correctly and you're good to go.

For deployment:
+ Minify, bundle and compress js, css, and vendor bundles
+ Outputs uniquely named (hashed) static js & css files
+ dynamically generate customized index.html to match hashed static files

###Usage

in `webpack.config.js`:

```js
var getConfig = require('./config/ac-webpack')
var env = process.env.NODE_ENV || 'development'

/** 
 * 1. Required
 */
module.exports = getConfig({

  isDev: env === 'development' /* [1] */,

  in: 'src/index.js' /* [1] */,

  out: 'public' /* [1] */,

  //needed by sass-loader to resolve imports
  stylePath: 'src/styles',

  /**
   * Production index.html settings. Used to generate dynamic
   * index for both dev & prod.
   */
  htmlConfig: {
    title: 'App Title',
    favicon: '/assets/favicon.ico', /* relative path from index */
    googleFonts: [
      'Noto+Sans'
    ],
    gaId: 'UA-47141819-4', /* google analytics support */
    reactHook: {
      attr: 'id', /* alternatively could prefer class */
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
    'shared',
    'components',
    'node_modules'
  ]

})
 
```

###Running the environments

```json
{
  "name": "app",
  "scripts": {
    "start": "node ac-webpack/bin",
    "build": "NODE_ENV=production webpack -p"
  }
}
```

This is heavily based off of and borrowed from the work of Henrik Joreteg & Christian Alfoni.

+ Henrik Joreteg's [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack) configuration
+ Christian Alfoni [ultimate Webpack setup](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup)
