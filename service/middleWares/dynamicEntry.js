const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const path = require('path');
const compliedMaps = {};

const rootPath = path.resolve(__dirname, '../../entry/allEntries/');

module.exports = (compiler, devMiddlewareInstance) => {
  return async (ctx, next) => {
    const reqPath = ctx.path;
    if (!reqPath.endsWith('.html')) return await next();

    const entryFileName = reqPath.replace('.html', '').replace('/page/', '');
    if (compliedMaps[entryFileName]) return await next();
    ctx.entryFileName = entryFileName;

    let newEntry = new SingleEntryPlugin(
      rootPath,
      path.resolve(rootPath, `${entryFileName}.js`),
      entryFileName
    );

    compiler.apply(newEntry);
    devMiddlewareInstance.invalidate();
    compliedMaps[entryFileName] = true;
    return await next();
  }
}