/* eslint-disable */

import { createElement } from '../modules/create-node.js';
import { Minesweeper } from '../modules/app.js';

const createLevelMinesweeper = () => {
  const wrapper = document.querySelector('.wrapper');
  wrapper.append(createElement('div', 'level'));
  const level = document.querySelector('.level');
  level.append(createElement('label', 'level__label', 'easy (10 x 10)'));
  level.append(createElement('label', 'level__label', 'medium (15 x 15)'));
  level.append(createElement('label', 'level__label', 'hard (25 x 25)'));

  const levelLabel = document.querySelectorAll('.level__label');
  levelLabel.forEach(label => label.append(createElement('input', 'level__radio')))

  level.append(createElement('div', 'level__range-wrapper'));
  const levelRangeWrap = document.querySelector('.level__range-wrapper');
  levelRangeWrap.append(createElement('input', 'level__range'));
  const levelRange = document.querySelector('.level__range');
  levelRange.setAttribute('type', 'range');
  levelRange.setAttribute('min', '10');
  levelRange.setAttribute('max', '99');
  levelRange.addEventListener('input', changeRange);

  levelRangeWrap.append(createElement('span', 'level__range-value', `Set mine ${levelRange.value}`));
  const levelRangeVal = document.querySelector('.level__range-value');

  function changeRange (evt) {
    levelRangeVal.innerText = `Set mine ${evt.target.value}`;
  }
  level.append(createElement('button', 'level__save', 'Change level'));
};
createLevelMinesweeper();

const levelCheckbox = document.querySelectorAll('.level__radio');
levelCheckbox.forEach((input, i) => {
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'level');
  input.id = i + 1;
  // input.addEventListener('change', changeLevelMinesweeper);
})
levelCheckbox[0].checked = true;
let minesweeperEl;
if (levelCheckbox[0].checked) {
  minesweeperEl = new Minesweeper(10, 10);
}

// function changeLevelMinesweeper (evt) {
//   const minesweeper = document.querySelector('.minesweeper');
//   const menu = document.querySelector('.menu');

//   if (evt.target.id == 1) {
//     minesweeper.remove();
//     menu.remove();
//     minesweeperEl = null;
//     minesweeperEl = new Minesweeper(10, 10);
//   }
//   if (evt.target.id == 2) {
//     minesweeper.remove();
//     menu.remove();
//     minesweeperEl = null;
//     minesweeperEl = new Minesweeper(15, 10);
//   }
//   if (evt.target.id == 3) {
//     minesweeper.remove();
//     menu.remove();
//     minesweeperEl = null;
//     minesweeperEl = new Minesweeper(25, 10);
//   }
// }

