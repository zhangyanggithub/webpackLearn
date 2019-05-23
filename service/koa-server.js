const Koa = require('koa');
const app = new Koa();

const htmlRender = require('./middleWares/htmlRender');
app.use(htmlRender());

app.listen(3000, () => {
  console.log('app listen at 3000');
});