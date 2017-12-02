const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfigDev = require('../webpack/dev');
const webpackConfigProd = require('../webpack/prod');

const isProd = process.env.NODE_ENV === 'production';
const port = isProd ? process.env.PORT : 3000;

const webpackConfig = isProd ? webpackConfigProd() : webpackConfigDev();
const compiler = webpack(webpackConfig);
const compilerOptions = {
  reload: true,
};

const app = express();

/**
 * Listen to Webpack
 */
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, compilerOptions));

/**
 * Routes
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port);
