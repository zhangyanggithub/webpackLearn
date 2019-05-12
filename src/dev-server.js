const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('../webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
  proxy: {
    '/apiMock': {
      target: 'https://baike.baidu.com/', // ucActiv/ity/api/thriftApi/base/CityInfoThriftService/getCityPartnerInfo.ajax
      pathRewrite: {
        '/apiMock': 'item/%E8%8A%B1/9980053?fr=aladdin'
      },
      changeOrigin: true
    },
    '/page': 'http://localhost:3000'
  }
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});