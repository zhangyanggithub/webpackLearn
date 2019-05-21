import Vue from 'vue';
import App from './page/test.vue';
import Element from 'element-ui';

Vue.use(Element);
new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});