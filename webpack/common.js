const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function base(env) {
  return {
    entry: {
      app: path.resolve(__dirname, '../client/index'),
      vendor: ['preact'],
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, '../build'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [path.resolve(__dirname, '../client'), 'node_modules'],
    },
    module: {
      rules: [
        {
          exclude: '/node_modules/',
          test: /\.js$/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'body',
        template: path.resolve(__dirname, '../index.html'),
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
};
