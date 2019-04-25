const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.use(serve(__dirname + '/src/static'));

app.listen(3000, () => {
  console.log('app listen at 3000');
});