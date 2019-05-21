const request = require('request');
const Router = require('koa-router');

module.exports = options => async (ctx, next) => {
  const url = ctx.url;
  if (url.endsWith('html')) return;

  console.log(ctx);

  Router.post('/apiServer', () => {
    request.post({
      url: ctx.url,
      form: ctx.request.body
    },  (error, response, body) => {
      console.log(ctx);
      ctx.body = body;
    });
  });

  return router.routes();
}