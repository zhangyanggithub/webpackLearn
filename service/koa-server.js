const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const serve = require('koa-static');

const htmlRender = require('./htmlRender');

// app.use(async (ctx, next) => {
//   await next();
//   ctx.response.type = 'text/html';
//   ctx.response.body = '<h1>Hello, koa2!</h1>';
// });

app.use(htmlRender());

const router = new Router();

router.get('*', (ctx) => {
  console.log('**********');
  console.log(ctx);
  ctx.response.body = '123';
});

app.use(router.routes());

app.use(serve(__dirname + '/src/static'));

app.listen(3000, () => {
  console.log('app listen at 3000');
});