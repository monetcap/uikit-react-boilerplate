const path = require('path');

module.exports = {
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/components/'),
      Stylesheets: path.resolve(__dirname, '../src/stylesheets/'),
      Images: path.resolve(__dirname, '../src/images/'),
      Templates: path.resolve(__dirname, '../src/templates/'),
    },
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
