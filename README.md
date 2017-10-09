# webpack-blocks - less

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/kirill-konshin/webpack-blocks-less.svg)](https://www.npmjs.com/package/@webpack-blocks-less)

This is the `less` block providing less support for webpack. Uses `less` via `less-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const less = require('webpack-blocks-less')

module.exports = createConfig([
  less(/* less options */)
])
```

Use `match()` to explicitly specify on which files to apply the block:

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const less = require('webpack-blocks-less')

module.exports = createConfig([
  match('*.scss', { exclude: path.resolve('node_modules') }, [
    less(/* less options */)
  ])
])
```


## Options

#### minimize *(optional)*
Enable CSS minification (by passing this option to `css-loader`).

#### less options

You can pass any [less-loader](http://lesscss.org/usage/#command-line-usage-options) as an object to the `less` block.


## Examples

### Extract text plugin

Use the `extract-text` block to extract the compiled Less styles into a separate CSS file:

```js
const { createConfig, match, env } = require('@webpack-blocks/webpack')
const less = require('webpack-blocks-less')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  match('*.scss', [
    less({ minimize: true }),
    env('production', [extractText()])
  ])
])
```

Make sure you use the `extract-text` block *after* the `less` block.


### CSS Modules

You can use Less in combination with CSS modules.

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const less = require('webpack-blocks-less')
const { css } = require('@webpack-blocks/assets')

module.exports = createConfig([
  match('*.les', [
    less(),
    css.modules()
  ])
])
```


### PostCSS

You can use the Less block together with PostCSS (using the `postcss` block) and its plugins, like the Autoprefixer.

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const less = require('webpack-blocks-less')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer');

module.exports = createConfig([
  match('*.less', [
    less(),
    postcss([autoprefixer()])
  ])
])
```


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.