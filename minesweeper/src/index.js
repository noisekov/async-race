/* eslint-disable */
import { parse } from 'postcss';
import './index.html';
import './index.scss';
// import cod from "./images/cod.png";
// import {mult, sum } from "./modules/calc";
// console.log(mult(2,6));
// console.log(sum(22,40));
// const img = new Image();
const createElement = (tag, className, text = '') => {
  const node = document.createElement(`${tag}`);
  node.className = `${className}`;
  node.innerText = `${text}`;
  return node;
};

class Minesweeper {
  constructor(field) {
    this.row = field;
    this.column = field;
    this.startApp();
  }

  startApp() {
    this.initField();
  }

  initField () {
    const body = document.querySelector('body');
    body.append(createElement('div', 'container'));
    const container = document.querySelector('.container');
    container.append(createElement('div', 'minesweeper'));
    const minesweeper = document.querySelector('.minesweeper');
    let allField = [];
    let count = 0;
    for (let i = 1; i <= this.row; i += 1) {
      let row = [];
      for (let j = 1; j <= this.column; j += 1) {
        row.push(`${j}c`);
        count += 1;
        minesweeper.append(createElement('button', `box ${count}`));
      }
      allField.push(row);
    }
    console.log(allField)
  }
}
new Minesweeper(10);
