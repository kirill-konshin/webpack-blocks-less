import test from 'ava'
import { css } from '@webpack-blocks/assets'
import { createConfig, match } from '@webpack-blocks/core'
import less from './index'

test('Sass works with defaults, without match()', t => {
  const config = createConfig({}, [
    less()
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            minimize: undefined
          }
        },
        {
          loader: 'less-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Less works with css() & match()', t => {
  const config = createConfig({}, [
    match('*.less', {exclude: /node_modules/}, [
      css(),
      less()
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.less$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
          options: {}
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            minimize: undefined
          }
        },
        {
          loader: 'less-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Less should pass sourceMap option to less-loader and css-loader', t => {
  const config = createConfig({}, [
    less({sourceMap: true})
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            minimize: undefined
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }
  ])
})

test('Less should pass minimize option to css-loader', t => {
  const config = createConfig({}, [
    less({minimize: true})
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            minimize: true
          }
        },
        {
          loader: 'less-loader',
          options: {}
        }
      ]
    }
  ])
})
