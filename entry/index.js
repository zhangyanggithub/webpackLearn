const fileNames = require('./entries');
const fs = require('fs');
const fileObj = {};

Object.keys(fileNames).forEach(file => {
  fileObj[file] = `import Vue from 'vue';
import App from '../../src/page/${file}.vue';

new Vue({
  el: '#app',
  render: h => {
    console.log('render');
    return h(App)
  },
});`
});

Object.keys(fileNames).forEach(file => {
  fs.writeFileSync(`${__dirname}/allEntries/${file}.js`, fileObj[file], (err) => {
    if (err) {
      return console.error(err);
    }
  });
});
