const webpack = require('webpack');

const Koa = require('koa');
const app = new Koa();
const proxy = require('koa-proxy');

const webpackConfig = require('../webpack.config.js');
const { devMiddleware } = require('koa-webpack-middleware');

const compiler = webpack(webpackConfig);

const devMiddlewareInstance = devMiddleware(compiler, {
  publicPath: '/__webpack_hmr',
  compress: false,
  stats: {
    colors: true
  }
});

const writeEntry = require('./middleWares/writeEntry');
const dynamicEntry = require('./middleWares/dynamicEntry');

app.use(writeEntry());
app.use(dynamicEntry(compiler, devMiddlewareInstance));
app.use(devMiddlewareInstance);

app.use(proxy({
  host: 'http://localhost:3000'
}));

app.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});