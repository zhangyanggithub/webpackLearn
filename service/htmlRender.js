module.exports = options => async (ctx, next) => {
  console.log('===============');
  console.log(ctx);
  ctx.body = ctx;
}