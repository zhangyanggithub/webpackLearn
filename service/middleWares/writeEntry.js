const fs = require('fs');
const path = require('path');

function entryTemplate(file) {
  return `import Vue from 'vue';
import Element from 'element-ui';
import App from '../../src/page/${file}.vue';

Vue.use(Element);
new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});
if (module.hot) {
  module.hot.accept();
}
`
}

module.exports = options => async (ctx, next) => {
  const url = ctx.path;
  if (!url.endsWith('.html')) return await next();
  const entryFileName = url.replace('.html', '').replace('/page/', '');
  const writePath = path.resolve(__dirname, '../../entry/allEntries/');

  const filePath = `${writePath}/${entryFileName}.js`;

  // if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, entryTemplate(entryFileName), (err) => {
      if (err) {
        console.error(err);
      }
    });
  // }
  return await next();
}