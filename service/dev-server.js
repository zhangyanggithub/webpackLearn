const webpack = require('webpack');

const Koa = require('koa');
const app = new Koa();
const proxy = require('koa-proxy');
const convert = require('koa-convert')

const webpackConfig = require('../webpack.config.js');
// const hotMiddleware = require('koa-webpack-hot-middleware');

// devMiddleware即webpack-dev-middleware
const {
  devMiddleware,
  hotMiddleware
} = require('koa-webpack-middleware');

const compiler = webpack(webpackConfig);

// webpack-dev-middleware依赖memory-fs，下面publicPath即输出到内存的路径
const devMiddlewareInstance = devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  compress: false,
  stats: {
    colors: true
  }
});

// 根据请求路径解析出文件名，并写入entry
const writeEntry = require('./middleWares/writeEntry');

// 动态替换entry
const dynamicEntry = require('./middleWares/dynamicEntry');

app.use(writeEntry());
app.use(dynamicEntry(compiler, devMiddlewareInstance));
app.use(devMiddlewareInstance);
// app.use((hotMiddleware(compiler)));

app.use(proxy({
  host: 'http://localhost:3000'
}));

app.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});

if (module.hot) {
  module.hot.accept();
}

