const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./common');

module.exports = function dev(env) {
  return webpackMerge(commonConfig(env), {
    devtool: 'eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, '../client/index'),
    ],
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
};
