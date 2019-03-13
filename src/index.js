  import {
    cube
  } from './math.js';
  import _ from 'lodash';
  function component() {
    var element = document.createElement('pre');
    _.join(['Another', 'module', 'loaded!'], ' ');
    element.innerHTML = [
      'Hello webpack  22  33',
      '5 cubed equals to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  let element = component();
  document.body.innerHTML = null;
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept();
  }