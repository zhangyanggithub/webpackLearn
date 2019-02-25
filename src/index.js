import _ from 'lodash';
function component() {
  let element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
const child = component();
document.body.appendChild(child);
