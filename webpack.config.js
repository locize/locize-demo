var path = require('path');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    './app/main.js'
  ],
  output: {
    path: './',
    filename: 'app_v1.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ].concat(!isProd ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]),
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    }]
  }
};
