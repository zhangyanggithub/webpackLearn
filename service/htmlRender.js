const fs = require('fs');
const path = require('path');
const request = require('request');

function rentryTemplate (file) {
  return `import Vue from 'vue';
import App from '../../src/page/${file}.vue';

new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});`
}

function htmlTemplate (scripts) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
this is a new page
${scripts}
${scripts.map(f => '<script crossorigin="anonymous" type="text/javascript" src="' + f + '"></script>').join('\n\r')}
</body>
</html>`
}

module.exports = options => async (ctx, next) => {
  const url = ctx.path;
  if (!url.endsWith('.html')) await next();
  const entryFileName = url.replace('.html', '').replace('/page/', '');
  const writePath = path.resolve(__dirname, '../entry/allEntries/');

  const filePath = `${writePath}/${entryFileName}.js`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, rentryTemplate(entryFileName), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  const scripts = [
    `/__webpack_hmr/${entryFileName}.bundle.js`,
    `/__webpack_hmr/vendors~${entryFileName}.bundle.js`,
  ];

  ctx.set('Content-Type', "text/html");
  ctx.set('Cache-Control', "no-cache, no-store, must-revalidate, max-age=0");
  ctx.set('Expires', '0');
  ctx.body = htmlTemplate(scripts);

  await next();
}