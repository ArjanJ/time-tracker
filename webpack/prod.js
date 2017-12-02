const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common');

module.exports = function prod(env) {
  return webpackMerge(commonConfig(env), {
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          screw_ie8: true,
          keep_fnames: false,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
        sourceMap: false,
      }),
    ],
  });
};
