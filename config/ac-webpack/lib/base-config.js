var HtmlPlugin = require('./html-plugin')

module.exports = function getBaseConfig(spec) {
  return {
    entry: spec.entry,

    output: spec.output,

    resolve: {
      extensions: [
        '', 
        '.js', 
        '.css', 
        '.scss'
      ],

      modulesDirectories: spec.resolves
      
    },

    plugins: [

      /**
       * Dynamically generates the index.html page to work for dev or production.
       */
      new HtmlPlugin({
        isDev: spec.isDev,
        htmlConfig: spec.htmlConfig
      })
      
    ],

    module: {
      loaders: [

        //javascript

        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: [

            /**
             * Transpiles JSX in addition to ES6+ functionality
             * 1. optional=runtime allows us to seamlessly use Promise 
             * & other Babel features that require polyfill.
             */
            'babel?optional=runtime' /* [1] */
          ]
        }, 

        //image assets

        { 
          test: /\.(png|svg|jpg)$/,

          /**
           * convert resolved paths as BASE64 strings for images under 25kb
           */
          loaders: [
            'url?limit=25000'
          ] 
        }

      ]

    }

  };
};