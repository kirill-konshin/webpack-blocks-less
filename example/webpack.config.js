const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const less = require('../index')
const {
  createConfig,
  babel,
  devServer,
  uglify,
  addPlugins,
  entryPoint,
  env,
  setOutput,
  sourceMaps
} = require('webpack-blocks')

module.exports = createConfig([
  entryPoint('./example/src/index.js'),
  setOutput('./example/build/bundle.js'),
  babel(),
  less(),
  env('development', [
    devServer(),
    sourceMaps()
  ]),
  env('production', [
    uglify(),
    addPlugins([
      new webpack.LoaderOptionsPlugin({minimize: true})
    ])
  ]),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './example/src/index.html'
    })
  ])
])
