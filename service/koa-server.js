const Koa = require('koa');
const app = new Koa();

// 返回HTML页面
const htmlRender = require('./middleWares/htmlRender');
const homePage = require('./middleWares/homePage');

app.use(homePage());
app.use(htmlRender());

app.listen(3000, () => {
  console.log('app listen at 3000');
});