const webpack = require('webpack')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const PACKAGE_INFO = require('./package.json')

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PUBLISH = process.env.PUBLISH ? Boolean(process.env.PUBLISH) : false

const ENV = process.env.NODE_ENV
const PUBLISH = process.env.PUBLISH

const IS_DEVELOPMENT = (ENV === 'development')
const DEVELOPMENT_HOST = process.env.DEVELOPMENT_HOST || 'http://localhost'
const DEVELOPMENT_PORT = process.env.DEVELOPMENT_PORT || 8080

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const LIBRARY_NAME = 'rvebuilder'

const EXAMPLES = fs.readdirSync('./examples').filter((name) => (/\.jsx/.test(name))).map((name) => (name.replace('.jsx', '')))
const THEMES = fs.readdirSync('./src/theme').filter((name) => (!(/^_/.test(name)))).map((name) => (name.replace('.scss', '')))

let entry = Object.assign({}, {}, !IS_DEVELOPMENT ? {
  [LIBRARY_NAME]: './src/index.js'
} : {
  'lib': ['./src/index.js']
})

let plugins = _.compact([
  new webpack.DefinePlugin({
    'process.env': {
      __NODE_ENV__: '"' + process.env.NODE_ENV + '"',
      __PACKAGE_VERSION__: '"' + PACKAGE_INFO.version + '"',
      __IS_DEVELOPMENT__: +IS_DEVELOPMENT,
    }
  }),
  !IS_DEVELOPMENT ? new UglifyJsPlugin({
    minimize: true,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true,
      warnings: false
    },
    mangle: {
      except: ['$super', '$', 'exports', 'require']
    },
    output: {
      comments: false
    }
  }) : false,
  !IS_DEVELOPMENT ? false : new webpack.HotModuleReplacementPlugin()
])

if (PUBLISH) {
  // plugins.push(new CopyWebpackPlugin({from: './dist/basic-usage-index.html', to: './index.html'}))
}

if (PUBLISH) {
  THEMES.forEach((name) => {
    entry['theme-' + name] = './src/theme/' + name + '.scss'
  })
  EXAMPLES.forEach((name) => {
    entry['example-' + name] = './examples/' + name + '.jsx'
  })

  const EXAMPLE_LINKS = EXAMPLES.slice(0).map((name) => {
    return (IS_DEVELOPMENT) ? '/' + name + '-index.html' : '/rvebuilder/dist/' + name + '-index.html'
  })

  EXAMPLES.forEach((exampleName) => {
    let sourceCode = fs.readFileSync('./examples/' + exampleName + '.jsx', 'utf8')
    sourceCode = sourceCode.split('/******** Next code is only for the demo to work ********/').shift()
    sourceCode = _.escape(sourceCode)

    let htmlOutputData = {
      title: ['Example: ', exampleName].join(' '),
      filename: exampleName + '-index.html',
      sourcecode: sourceCode,
      version: PACKAGE_INFO.version,
      description: PACKAGE_INFO.description,
      author: PACKAGE_INFO.author,
      license: PACKAGE_INFO.license,
      url: PACKAGE_INFO.repository.url,
      examplelinks: EXAMPLE_LINKS.join(','),
      template: './examples/example.tpl',
      chunks: ['example-' + exampleName]
    }

    plugins.push(new HtmlWebpackPlugin(htmlOutputData))

    if (exampleName === 'basic-usage') {
      plugins.push(new HtmlWebpackPlugin(Object.assign({}, htmlOutputData, {
        filename: 'index.html'
      })))
    }
  })
}

if (IS_DEVELOPMENT) {
  entry['lib'].unshift('webpack/hot/only-dev-server')
  entry['lib'].unshift('webpack-dev-server/client?' + [DEVELOPMENT_HOST, DEVELOPMENT_PORT].join(':'))
}

const config = {
  entry,
  plugins,

  stats: Boolean(IS_DEVELOPMENT || PUBLISH),
  devtool: !IS_DEVELOPMENT ? '' : 'eval-source-map',

  output: Object.assign({}, {
    path: path.resolve(__dirname, './dist'),
    filename: [LIBRARY_NAME, 'min.js'].join('.'),
    library: LIBRARY_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  }, (IS_DEVELOPMENT || PUBLISH) ? {
    filename: '[name].bundle.js'
  } : {}),

  resolve: {
    extensions: ['.json', '.js', '.jsx', '.json']
  },
  devServer: !IS_DEVELOPMENT ? undefined : {
    hot: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015',
              'stage-0',
              'react'
            ]
          }
        }]
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015',
              'stage-0',
              'react'
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'url-loader', options: {'limit': 10000, 'mimetype': 'application/font-woff'}}
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'url-loader', options: {'limit': 10000, 'mimetype': 'application/octet-stream'}}
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'file-loader'}
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {loader: 'url-loader', options: {'limit': 10000, 'mimetype': 'image/svg+xml'}}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {loader: 'file-loader', options: {'name': '[name].[ext]'}}
        ]
      },
      {test: /\.srt$/, loader: 'raw-loader!srt-loader'}
    ]
  }
}

if (IS_DEVELOPMENT || PUBLISH) {
  console.log('/**** CONFIG ****/')
  console.log(config)
  console.log('/**** CONFIG ****/')
}

module.exports = config
