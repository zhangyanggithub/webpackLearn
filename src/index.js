  import _ from 'lodash';
  import './style.css';
  import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
    element.classList.add('red');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
  }
  let element = component();
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
      })
  }