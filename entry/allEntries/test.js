import Vue from 'vue';
import Element from 'element-ui';
import App from '../../src/page/test.vue';

Vue.use(Element);
new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});