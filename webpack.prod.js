// const webpack = require('webpack');

const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Monet Capital | Expedited business capital within 24 hours',
      template: './src/index.html',
    }),
  ],
});
