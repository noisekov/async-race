/* eslint-disable */
import { createElement } from '../modules/create-node.js';

const changeTheme = () => {
  const body = document.querySelector('body');
  body.append(createElement('div', 'theme'));
  const theme = document.querySelector('.theme');
  theme.append(createElement('select', 'theme__select'));
  const select = document.querySelector('.theme__select');
  select.append(createElement('option', 'theme__option', 'White theme'));
  select.append(createElement('option', 'theme__option', 'Black theme'));
  const option = document.querySelectorAll('.theme__option');
  option[0].value = 'white';
  option[1].value = 'black';
};
changeTheme();
