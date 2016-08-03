Styling Guidelines
==================

## Tech / Toolchest
* [Aphrodite](https://github.com/Khan/aphrodite): 99% of view / component styling
* [CSSNext](http://cssnext.io/) + [CSSModules](http://glenmaddern.com/articles/css-modules): Global / Reset / Escape-hatch styling
* React: Encapsulate reusable styles
* Tooling — Webpack, Babel, postcss

Architecture: *ITCSS* - Inverted Triangle CSS
===============================

```
\                            / SETTINGS - Variables (js/css)
 -----------------------------------------------------------
  \                        / TOOLS - Functions (js)
   ---------------------------------------------------------
    \                    / GENERIC - Reset / 3rd Party (css)
     -------------------------------------------------------
      \                / BASE - Bare Elements (js/css)
       -----------------------------------------------------
        \            / OBJECTS - Layout (js)
         ---------------------------------------------------
          \        / COMPONENTS - UI (js)
           -------------------------------------------------
            \    / TRUMPS - Overrides (!important) (js)
             -----------------------------------------------
              \/
```

### SETTINGS
* Globally-available settings.
* Config switches.
* Brand colors, etc.

```css

/* settings.css */
:root {
  --clr-primary: #4FC1E9;
  --spacing-tiny: 4px;
}

@custom-media --viewport-narrow (width >= 31.25em);

/* component.css */
@import 'settings';

.container {
  padding: var(--spacing-tiny)
}
```

```js

// settings.js
export const colors = {
  primary: '#4FC1E9'
}

export const spacing = {
  tiny: '4px'
}

export const viewport = {
  narrow: `@media (min-width: 31.25em)`,
}
```

### TOOLS
* Globally-available tools
* Helper functions.

```css
/*-----------------------------------------------------*\
  * Typically used in things like SASS. Not in our house
\*-----------------------------------------------------*/

/**
 * 1. cssnext brings tool-like functionality to CSS
 */
a {
  color: color(red alpha(-10%)); /* [1] */
}
```

```js

// tools.js
import { baseFontSize } from './settings.js'

export const pxToEm (px) =>
  `${px / baseFontSize}em`
```

### GENERIC
* Ground zero styles
* Low-specificity, far-reaching
* Resets, Normalize.css, etc.

```css

/* generic.css */
* {
  box-sizing: inherit;
}

body,
h1, h2, h3, h4, h5, h6,
dl, dd, ol, ul,
form, fieldset, legend {
  margin: 0;
  padding: 0;
}
```

### BASE
* Unclassed HTML Elements.
* H1-H6, basic links, lists, etc.
* More opinionated / "stylistic" than `Generic`.
* Last layer we see type selectors (e.g. a {}, blockquote {}).
* Grey area: use CSS or React?

```css
html {
  font-family: monospace;
}

ol, ul {
  list-style: none;
}

a {
  text-decoration: none;
}
```

```js
const styles = Stylesheet.create({
  base: {
    border: 'none',
    outline: 'none'
  }
})

// React components are perfect for encapsulating styles
const BtnBase = ({children, className, ...rest}) =>
  <button {...{
    ...rest,
    className: `${css(styles.base)} ${className}`
  }}>
    { children }
  </button>
```

^ Why not just use CSS?
```css
button {
  border: none;
  outline: none;
}
```
You could but...
* The relationship is implicit.
* May be too far-reaching / powerful: Effects _every_ button forcing overrides if you would like to do anything else.
* Using a react component allows you to be selective on what uses base and what doesn't.

### OBJECTS
* OOCSS.
* Design patterns.
* No cosmetics.
* Agnostically named (e.g. list, block, media).


#### Example 1: [Famous](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) "Media" Object
*Using css-modules + react component*

```
NOTE: before code snippets may be good to show images of examples (block, media)
```
```
PLACEHOLDER SHOW IMAGE OF MEDIA OBJECT
```

```css

/* media.css */
@import 'settings';

.clearfix {
  overflow: auto;
  zoom: 1;
}

.media {
  display: block;
  composes: clearfix; /* css-modules feature */
}

.img {
  float: left;
  margin-right: var(--spacing-standard);
}

.img > img{
  display: block;
}

.body {
  overflow: hidden;
  display: block;
}

/**
 * No clean way to do this with aphrodite. Alternative would be to do map
 * over the `children` prop and add styling to last child
 */
.body > :last-child { /* [1] */
  margin-bottom: 0;
}

```

```js

/* Media.js */
import style from './style'

const Media = ({
  imgProps,
  children
}) =>
  <div className={style.media}>
    <div className={style.img}>
      <img {...imgProps} />
    </div>
    <div className={style.body}>
      {children}
    <div>
  </div>
```

*NOTE:* I've found many/most traditional Object abstractions can be replaced by using [_Flexbox_](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

```js
import { X } from 'react-axis'
import ___ from 'react-space'

const Media = ({
  imgProps,
  children
}) =>
  <X x>
    <___ mr>
      <img {...imgProps} style={{...imageProps.style, display: 'block'}}/>
    </___>
    <div>
      {children}
    </div>
  </X>
```

### COMPONENTS
* Designed pieces of UI
* Still only using classes.
* More explicitly named (e.g. .products-list {})
* Aphrodite bread & butter

```js
import { colors } from 'App/style/settings'
import BtnBase from 'App/shared/BtnBase'

const styles = Stylesheet.create({
  shared: {
    fontSize: '1.2em',
    textTransform: 'uppercase'
  },
  main: {
    border: `solid 1px ${colors.primary}`
  }
})

const Btn = ({
  theme = 'main',
  children,
  ...rest
}) =>
  <BtnBase {...rest} className={css(styles.shared, styles[theme])}>
    {children}
  </BtnBase>
```

### TRUMPS
* Overrides, helpers, utilities

```js
import ___ from 'react-space'
import Txt from 'react-txt'
```

Aphrodite
=========

#### Pros
* No worrying about vendor prefixing
* Supports psuedo-selectors (:hover) and media queries
* Enables a simple publishing of styled React components
* co-location === 🤗
* No name-spacing
* JavaScript > preprocessor
* Simple server-side rendering story 👍
* Small dependency: 6k gzipped

#### Cons

1. Sometimes CSS selectors are convenient
```css
.body > :last-child {
  margin-bottom: 0;
}

.li:not(:first-child) {
  margin-top: .5em;
}

.theme-red .txt {
  color: red;
}
```

Requires a shift in thinking:
```js
<ul>
  {items.map((item, i) =>
    <li style={i > 0 ? {marginTop: '.5em'} : {}}>
      {item.name}
    </li>
  )}
</ul>
```

2. Not good at far-reaching global styling
```css

/* how would you do this simply w/ aphrodite? */
* {
  box-sizing: inherit;
}

```

Aphrodite FAQ:

#### Server-side rendering?
[Official example](https://github.com/Khan/aphrodite#server-side-rendering)

#### Global Styling / Styling by tagname?
See this [issue](https://github.com/Khan/aphrodite/issues/30)

#### Fonts?
[Font Faces](https://github.com/Khan/aphrodite#font-faces)

#### Animations?
```js
const keyframes = {
  'from': {
    marginLeft: 0,
  },

  'to': {
    marginLeft: 100,
  }
}

const styles = StyleSheet.create({
 animate: {
  animationName: keyframes,
  animationDuration: '2s',
  animationIterationCount: 'infinite',
 }
})
```

#### Gotchas?
[Assigning a string to a content property for a pseudo-element](https://github.com/Khan/aphrodite#assigning-a-string-to-a-content-property-for-a-pseudo-element)
