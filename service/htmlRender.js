
const template = (file) => `import Vue from 'vue';
import App from '../../src/page/${file}.vue';

new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});`

module.exports = options => async (ctx, next) => {
  console.log('===============');
  console.log(ctx);
  if (!ctx.path.endsWith('.html')) return;
  
  ctx.body = ctx;
}