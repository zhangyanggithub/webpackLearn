import Vue from 'vue';
import App from '../../src/page/test.vue';

new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});