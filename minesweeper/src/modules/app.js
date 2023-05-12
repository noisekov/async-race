/* eslint-disable */
const createElement = (tag, className, text = '', column, row) => {
  const node = document.createElement(`${tag}`);
  node.className = `${className}`;
  node.innerText = `${text}`;
  if (column && row) {
    node.dataset.column = column;
    node.dataset.row = row;
  }
  return node;
};

class Minesweeper {

  constructor(field, mine) {
    this.row = field;
    this.column = field;
    this.mine = mine;
    this.allField = [];
    this.mineField = new Set();
    this.youAreWin = false;
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
    this.countClick = 0;
    this.countTimer = 0;
    this.startApp();
  }

  startApp() {
    this.initField();
    this.createMenu();
  }

  initField() {
    const body = document.querySelector('body');
    body.append(createElement('div', 'container'));
    const container = document.querySelector('.container');
    container.append(createElement('div', 'wrapper'));
    const wrapper = document.querySelector('.wrapper');
    wrapper.append(createElement('div', 'minesweeper'));
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
      this.reloadCountMenu();
      // this.openBox(evt);
    });
    container.addEventListener('contextmenu', (evt) => { this.markMine(evt) });
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
        minesweeper.children[mine -1].classList.add('boomb');
      }
    });
    // console.log([...this.mineField], 'мины');
  }

  click(evt) {
    if (!this.gameOver) {
      if (evt.target.closest('.box') && !evt.target.closest('.box').classList.contains('is-here')) {
        if (!evt.target.closest('.box').classList.contains('current')) {
          this.countClick += 1;
        }
        evt.target.closest('.box').classList.add('current');
        if (this.firstClick) {
          this.firstClick = false;
          this.startTimer();
          const firstElem = +evt.target.closest('.box').classList[1];
          this.initMine(firstElem);
          this.countMineAround();
        }
        evt.target.closest('.box').style.color = `${this.objColor[+evt.target.closest('.box').innerText]}`;
        if (evt.target.closest('.box').classList.contains('boomb')) {
          this.gameOver = true;
          this.finishGame();
        }
        this.winGame();
      }
    }
    if (evt.target.closest('.menu__start')) {
      this.destroy();
      this.countClick = 0;
      new Minesweeper(10, 10);
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
    if (evt.target.closest('.box') && !evt.target.closest('.box').classList.contains('current')) {
      evt.target.closest('.box').classList.toggle('is-here');
    }
  }

  //need to add another class MENU
  createMenu() {
    const wrapper = document.querySelector('.wrapper');
    wrapper.prepend(createElement('div', 'menu'));
    const menu = document.querySelector('.menu');
    menu.append(createElement('div', 'menu__count-click'));
    menu.append(createElement('button', 'menu__start'));
    menu.append(createElement('div', 'menu__time'));
    const countMenu = document.querySelector('.menu__count-click');
    countMenu.innerText = this.countClick;
    const timer = document.querySelector('.menu__time');
    timer.innerText = 0;
    const start = document.querySelector('.menu__start');
    start.innerText = 'Начать';
  }

  reloadCountMenu() {
    const countMenu = document.querySelector('.menu__count-click');
    countMenu.innerText = this.countClick;
  }

  startTimer() {
    const timer = document.querySelector('.menu__time');
    let refreshInterval = setInterval(() => {
      if (this.gameOver || this.youAreWin) {
        clearInterval(refreshInterval);
      } else {
        this.countTimer += 1;
        timer.innerText = `${this.countTimer}`;
      }
    }, 1000);
  }

  destroy() {
    const body = document.querySelector('body');
    body.innerHTML = '';
  }

  winGame() {
    const minesweeper = document.querySelector('.minesweeper');
    const win = Array.from(minesweeper.children).every((box) => {
      return box.classList.contains('current') ||  box.classList.contains('boomb');
    })

    if (win) {
      this.youAreWin = true;
      const container = document.querySelector('.container');
      container.append(createElement('div', 'modal', `Hooray! You found all mines in ${this.countTimer} seconds and ${this.countClick} moves!`));
    }
  }

  // openBox(evt) {
  //   const minesweeper = document.querySelector('.minesweeper');
  //   const mapElAround = [];
  //   Array.from(minesweeper.children).forEach((box) => {
  //     if(`${box.dataset.column}${box.dataset.row}` === `${evt.target.closest('.box').dataset.column}${evt.target.closest('.box').dataset.row}`) {
  //       mapElAround.push(`${+box.dataset.column + 1} ${+box.dataset.row + 1}`);
  //       mapElAround.push(`${+box.dataset.column - 1} ${+box.dataset.row - 1}`);
  //       mapElAround.push(`${+box.dataset.column + 1} ${+box.dataset.row - 1}`);
  //       mapElAround.push(`${+box.dataset.column - 1} ${+box.dataset.row + 1}`);
  //       mapElAround.push(`${+box.dataset.column} ${+box.dataset.row + 1}`);
  //       mapElAround.push(`${+box.dataset.column} ${+box.dataset.row - 1}`);
  //       mapElAround.push(`${+box.dataset.column + 1} ${+box.dataset.row}`);
  //       mapElAround.push(`${+box.dataset.column - 1} ${+box.dataset.row}`);
  //     }
  //   })
  //   console.log(mapElAround)
  // }

  finishGame() {
    const container = document.querySelector('.container');
    container.append(createElement('div', 'modal', 'Game over. Try again!'));
  }
}
new Minesweeper(10, 10);
