const filenNames = require('../entry/entries');
const fs = require('fs');

Object.keys(filenNames).map(file => {
  return `import Vue from 'vue';
import App from './page/${file}.vue';

new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});`
});

