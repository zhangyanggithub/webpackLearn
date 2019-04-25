// import {
//   cube
// } from './math.js';
import _ from 'lodash';
  function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    button.innerHTML = 'Click 11221 me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(button);
    button.onclick = e => import( /* webpackChunkName: "print" */ './print').then(module => {
      var print = module.default;
      print();
    });


    // const _ = await import( /* webpackChunkName: "lodash" */ 'lodash');
    return element;
  }
  const ele = component();
  document.body.appendChild(ele);