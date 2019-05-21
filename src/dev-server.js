const webpack = require('webpack');

const Koa = require('koa');
const app = new Koa();

const webpackConfig = require('../webpack.config.js');
const koaWebpackMiddleware = require('koa-webpack-middleware');

const {
  devMiddleware,
  hotMiddleware
} = koaWebpackMiddleware;

const compiler = webpack(webpackConfig);

const devMiddlewareInstance = devMiddleware(compiler, {
  publicPath: '/__webpack_hmr',
  compress: false,
  stats: {
    colors: true
  }
});

const htmlRender = require('../service/htmlRender');

app.use(htmlRender());
app.use(devMiddlewareInstance);
app.use(hotMiddleware(compiler, {
  // log: console.log,
  // path: '/__webpack_hmr',
  // heartbeat: 10 * 1000
}));

app.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});