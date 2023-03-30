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
    if (!evt.target.closest('.nav')
    && !evt.target.closest('.burger')
    && !evt.target.closest('.swiper__content-block')
    && !evt.target.closest('.modal')) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        body.classList.remove('no-scroll');
        overflow.classList.remove('show');
        modalWidnow.classList.remove('open');
    }
}

const petsCard = document.querySelectorAll('.swiper__content-block');
const modalWidnow = document.querySelector('.modal-window');
const modalClose = document.querySelector('.modal__btn-close');

petsCard.forEach(card => {
    card.addEventListener('click', showModal);
})
modalClose.addEventListener('click', closeModal);

function showModal () {
    modalWidnow.classList.toggle('open');
    body.classList.toggle('no-scroll');
}

function closeModal () {
    modalWidnow.classList.remove('open');
    body.classList.remove('no-scroll');
}