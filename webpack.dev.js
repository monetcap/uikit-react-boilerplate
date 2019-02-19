const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Monet Capital | Expedited business capital within 24 hours',
      template: './src/index.html',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: process.env.PORT || 8080,
    publicPath: '/',
    historyApiFallback: true,
  },
});
