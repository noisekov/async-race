/* eslint-disable */
import { createElement } from '../modules/create-node.js';
import { Minesweeper } from '../modules/app.js';

const createLevelMinesweeper = () => {
  const body = document.querySelector('body');
  body.append(createElement('div', 'container'));
  const container = document.querySelector('.container');
  container.append(createElement('div', 'wrapper'));
  const wrapper = document.querySelector('.wrapper');
  wrapper.prepend(createElement('div', 'level'));
  const level = document.querySelector('.level');
  level.append(createElement('label', 'level__label', 'easy'));
  level.append(createElement('label', 'level__label', 'medium'));
  level.append(createElement('label', 'level__label', 'hard'));
  const levelLabel = document.querySelectorAll('.level__label');
  levelLabel.forEach(label => {
    label.append(createElement('input', 'level__radio'));
  })
  const levelCheckbox = document.querySelectorAll('.level__radio');
  levelCheckbox[0].checked = true;
  if (levelCheckbox[0].checked) {
    new Minesweeper(10, 10);
  }
  levelCheckbox.forEach((input, i) => {
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'level');
    input.id = i + 1;
    input.addEventListener('change', changeLevelMinesweeper);
  })
};
document.addEventListener('DOMContentLoaded', createLevelMinesweeper)

function changeLevelMinesweeper (evt) {
  const minesweeper = document.querySelector('.minesweeper');
  const menu = document.querySelector('.menu');

  if (evt.target.id == 1) {
    minesweeper.remove();
    menu.remove();
    new Minesweeper(10, 10);
  }
  if (evt.target.id == 2) {
    minesweeper.remove();
    menu.remove();
    new Minesweeper(15, 10);
  }
  if (evt.target.id == 3) {
    minesweeper.remove();
    menu.remove();
    new Minesweeper(25, 10);
  }
}

