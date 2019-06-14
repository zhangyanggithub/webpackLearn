const webpack = require('webpack');

const Koa = require('koa');
const app = new Koa();
const proxy = require('koa-proxy');
const koaConvert = require('koa-convert')

const webpackConfig = require('../webpack.config.js');

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

// 动态加入更多entry
const dynamicEntry = require('./middleWares/dynamicEntry');

app.use(writeEntry());
app.use(dynamicEntry(compiler, devMiddlewareInstance));

app.use(devMiddlewareInstance);

const hotMiddlewareInstance = hotMiddleware(compiler, {
  path: webpackConfig.output.publicPath,
});
app.use(hotMiddlewareInstance);


app.use(proxy({
  host: 'http://localhost:3000'
}));

app.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});

