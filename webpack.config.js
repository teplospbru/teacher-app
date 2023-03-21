const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,
  devtool: 'eval-source-map',
  entry: './src/index.tsx',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svg-transform-loader', 'svgo-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff(2)?|eot|ttf|otf|doc|docx)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ],
  devServer: {
    open: true,
    hot: true,
  },
};
