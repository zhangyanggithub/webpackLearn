import Vue from 'vue';
import Element from 'element-ui';
import App from '../../src/page/test1.vue';

Vue.use(Element);
new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});
// if (module.hot) {
//   module.hot.accept();
// }
