  import {
    cube
  } from './math.js';
  import _ from 'lodash';
  function component() {
    var element = document.createElement('pre');
    _.join(['Another', 'module', 'loaded!'], ' ');
    element.innerHTML = [
      'Hello 111 webpack',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }
  let element = component();
  document.body.appendChild(element);