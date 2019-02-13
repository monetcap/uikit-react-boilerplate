const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

// const WebappWebpackPlugin = require('webapp-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components/'),
      Stylesheets: path.resolve(__dirname, './src/stylesheets/'),
      Images: path.resolve(__dirname, './src/images/'),
      Templates: path.resolve(__dirname, './src/templates/'),
    },
  },
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'MonetCap | Common Configuration',
      template: './src/index.html',
    }),
    new ZipPlugin({ filename: 'build-artifact.zip' }),
    // new WebappWebpackPlugin('./src/images/add-logo-file.png')
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(bmp|gif|jpeg|jpg|png|svg|eot|woff|woff2|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              fallback: 'file-loader',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
};
