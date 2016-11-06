var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  loaders: [
  // image loader - https://www.npmjs.com/package/image-webpack-loader
  {
    test: /\.(jpe?g|png|gif|svg|ico)$/i,
    loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]',
    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ]
  },
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?stage=0&optional=runtime'],
  },
  // styles
  {
    test: /\.[s]?css$/,
    loader: "style!css!autoprefixer-loader?browsers=last 2 version!sass"
  },
  {
     test: /\.less$/,
     loader: 'style!css!less!autoprefixer'
   },

  // and font files - embed them if possible
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"
  }, {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff2"
  }, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"
  }, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"
  }
  ],
  // https://www.npmjs.com/package/html-webpack-plugin - generate our html file from a template - makes it easier to include custom stuff
  indexPagePlugin: new HtmlWebpackPlugin({
                          title: 'MNIST',
                          inject: true,
                          filename: 'index.html',
                          template: './web/app/index_template.html'
                        })
}
