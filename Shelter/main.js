const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');
const overflow = document.querySelector('.overflow');

burger.addEventListener('click', openBurger);
document.addEventListener('click', closeBurger);

function openBurger () {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    body.classList.toggle('no-scroll');
    overflow.classList.toggle('show');
}

function closeBurger (evt) {
    if (!evt.target.closest('.nav') && !evt.target.closest('.burger')) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        body.classList.remove('no-scroll');
        overflow.classList.remove('show');
    }
}