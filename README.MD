A lightweight, opinionated setup using react, react-router, webpack, babel, & sass to get up and going on react projects.

To Come:
* Flux

###Getting Started
* $npm install
* $npm start

###Folder Structure
Ideas borrowed liberally from: 
* Ryan Florence's [approach](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346) to organizing scalable, modular, team-centric react apps.
* Twitter's component-centric organizational [approach](http://www.thedotpost.com/2014/11/nicolas-gallagher-thinking-beyond-scalable-css) led by Nicolas Gallagher.

### Resolving assets in .scss files
See snippet extracted from webpack.config.js
```javascript

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
    new webpack.NormalModuleReplacementPlugin(/\.svg$/, ""),
```

###Sass-Loader Gotcha:
* [Caveat](https://github.com/jtangelder/sass-loader#caveats)
* [Issue & Temp Solution](https://github.com/jtangelder/sass-loader/issues/59#issuecomment-81448794) 