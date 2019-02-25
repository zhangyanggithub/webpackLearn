import _ from 'lodash';
import './style.css';
import Icon from './img.jpg';

function component() {
  let element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  let img = new Image();
  img.src = Icon;
  
  element.appendChild(img);
  return element;
}

const child = component();
document.body.appendChild(child);
