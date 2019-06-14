const chalk = require('chalk');

module.exports = options => async (ctx, next) => {
  const path = ctx.path;
  if (path === '/') {
    console.log(chalk.greenBright('首页请求'));
    ctx.body = 'this is home page'
  }
  return await next();
}