import Vue from 'vue';
import App from '../../src/page/test2.vue';

new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});