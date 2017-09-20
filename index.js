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

  const hasOptions = Object.keys(options).length > 0

  return function (context) {
    return {
      module: {
        loaders: [
          {
            test: context.fileType('text/x-less'),
            loaders: [
              'style-loader',
              options.sourceMap ? 'css-loader?sourceMap' : 'css-loader',
              hasOptions ? 'less-loader?' + JSON.stringify(options) : 'less-loader'
            ]
          }
        ]
      }
    }
  }
}
