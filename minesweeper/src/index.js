/* eslint-disable */
import './index.html';
import './index.scss';

const createElement = (tag, className, text = '', column, row) => {
  const node = document.createElement(`${tag}`);
  node.className = `${className}`;
  node.innerText = `${text}`;
  node.dataset.column = column;
  node.dataset.row = row;
  return node;
};

class Minesweeper {

  constructor(field, mine) {
    this.row = field;
    this.column = field;
    this.mine = mine;
    this.allField = [];
    this.mineField = new Set();
    this.gameOver = false;
    this.firstClick = true;
    this.objColor = {
      1 : 'Red',
      2 : 'Blue',
      3 : 'Green',
      4 : 'Indigo',
      5 : 'Brown',
      6 : 'DeepPink',
      7 : 'DarkSlateGray',
      8 : 'MediumPurple',
    }
    this.startApp();
  }

  startApp() {
    this.initField();
  }

  initField() {
    const body = document.querySelector('body');
    body.append(createElement('div', 'container'));
    const container = document.querySelector('.container');
    container.append(createElement('div', 'minesweeper'));
    const minesweeper = document.querySelector('.minesweeper');
    minesweeper.style.gridTemplateColumns = `repeat(${this.row} , 1fr)`;
    let count = 0;
    for (let i = 1; i <= this.row; i += 1) {
      const row = [];
      for (let j = 1; j <= this.column; j += 1) {
        count += 1;
        row.push(`${count}`);
        minesweeper.append(createElement('button', `box ${count}`, '', `${j}`, `${i}`));
      }
      this.allField.push(row);
    }
    container.addEventListener('click', (evt) => {
      this.click(evt);
    });
    container.addEventListener('contextmenu', (evt) => {
      this.markMine(evt);
    });
    console.log(this.allField, 'все поле без мин');
  }

  initMine(firstElementClick) {
    const minesweeper = document.querySelector('.minesweeper');
    while (this.mineField.size < this.mine) {
      let newRandomValue = Math.round(Math.random() * (minesweeper.children.length - 0) + 0);
      if (newRandomValue !== firstElementClick) {
        this.mineField.add(newRandomValue);
      }
    }
    [...this.mineField].forEach(mine => {
      if (mine > 0) {
        // minesweeper.children[mine -1].innerText = '*';
        minesweeper.children[mine -1].classList.add('boomb');
      }
    });
    console.log([...this.mineField], 'мины');
  }

  click(evt) {
    if (!this.gameOver) {
      if (evt.target.closest('.box')) {
        evt.target.closest('.box').classList.add('current');
        evt.target.closest('.box').style.color = `${this.objColor[+evt.target.closest('.box').innerText]}`;
        if (this.firstClick) {
          this.firstClick = false;
          const firstElem = +evt.target.closest('.box').classList[1];
          this.initMine(firstElem);
          this.countMineAround();
        }
        if (evt.target.closest('.box').classList.contains('boomb')) {
          this.gameOver = true;
          this.finishGame();
        }
      }
    }
  }

  countMineAround() {
    const minesweeper = document.querySelector('.minesweeper');
    const mapElNearMine = [];
    Array.from(minesweeper.children).forEach((box) => {
      if (box.classList.contains('boomb')) {
        mapElNearMine.push(`${+box.dataset.column + 1} ${+box.dataset.row + 1}`);
        mapElNearMine.push(`${+box.dataset.column - 1} ${+box.dataset.row - 1}`);
        mapElNearMine.push(`${+box.dataset.column + 1} ${+box.dataset.row - 1}`);
        mapElNearMine.push(`${+box.dataset.column - 1} ${+box.dataset.row + 1}`);
        mapElNearMine.push(`${+box.dataset.column} ${+box.dataset.row + 1}`);
        mapElNearMine.push(`${+box.dataset.column} ${+box.dataset.row - 1}`);
        mapElNearMine.push(`${+box.dataset.column + 1} ${+box.dataset.row}`);
        mapElNearMine.push(`${+box.dataset.column - 1} ${+box.dataset.row}`);
      }
    })
    mapElNearMine.forEach(val => {
      Array.from(minesweeper.children).forEach((box) => {
        if (+box.dataset.column === +val.split(' ')[0]
        && +box.dataset.row === +val.split(' ')[1]
        && !box.classList.contains('boomb')) {
          let textInnerBox = +box.innerText;
          textInnerBox += 1;
          box.innerText = textInnerBox;
        }
      })
    })
  }

  markMine(evt) {
    evt.preventDefault();
    if (evt.target.closest('.box')
    && !evt.target.closest('.box').classList.contains('current')) {
      evt.target.closest('.box').classList.toggle('is-here');
    }
  }

  finishGame() {
    const container = document.querySelector('.container');
    container.append(createElement('div', 'modal', 'Game over. Try again!'));
  }
}
new Minesweeper(10, 10);
