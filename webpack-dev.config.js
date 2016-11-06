var commonConfig = require('./webpack-common.config.js');
var webpack = require("webpack");

var devLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - with the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime'],
  }
]

module.exports = {
  entry: [
  // setup the hot mobule loading
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  // our entry file
  './web/app/main.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  devtool: 'eval',
  devServer: {
    // proxy calls to api to our own node server backend
    proxy: {
      '/api/*': 'http://localhost:8000/'
    }
  },
  module: {
    loaders: commonConfig.loaders.concat(devLoaders)
  },
  plugins: [
    commonConfig.indexPagePlugin,
    new webpack.DefinePlugin({
      'process.env': {
        IS_IN_WEBPACK: true
      }
    })
  ],
};
