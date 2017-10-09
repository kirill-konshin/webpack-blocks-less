const omit = require('lodash/omit')

/**
 * Less webpack block.
 *
 * @see https://github.com/webpack-contrib/less-loader
 */

module.exports = less

/**
 * @param {object}   [options] See http://lesscss.org/usage/#command-line-usage-options
 * @param {boolean}  [options.sourceMap]
 * @return {Function}
 */
function less (options) {
  options = options || {}

  const lessOptions = omit(options, 'minimize')

  return function (context, util) {
    return util.addLoader(
      Object.assign({
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !!options.sourceMap,
              minimize: options.minimize
            }
          },
          {
            loader: 'less-loader',
            options: lessOptions
          }
        ]
      }, context.match)
    )
  }
}
