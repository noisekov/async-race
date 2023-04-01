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

const petsCard = document.querySelector('.swiper__content');
const modalWidnow = document.querySelector('.modal-window');
const modalClose = document.querySelector('.modal__btn-close');
const swiperContent = document.querySelector('.swiper__content');

petsCard.onclick = function (evt) {
    if (evt.target.closest('.swiper__content-block')) {
        modalWidnow.classList.toggle('open');
        body.classList.toggle('no-scroll');
    }
}
modalClose.addEventListener('click', closeModal);

function closeModal () {
    modalWidnow.classList.remove('open');
    body.classList.remove('no-scroll');
}

//parse card slider
if (location.pathname === "/Shelter/") {
    async function getCard () {
        const url = './pets.json';
        const response = await fetch(url);
        const answer =  await response.json();
        const result = [];
        for (let prop in answer ) {
            result.push(`
                    <div class="swiper__content-block">
                        <div class="swiper__content-block-img">
                            <img src="${answer[prop].img}" alt="pets-katrine" width="270" height="270">
                        </div>
                        <h3 class="swiper__content-block-title">${answer[prop].name}</h3>
                        <button class="swiper__content-block-btn">Learn more</button>
                    </div>
                `)
        }
        if (window.innerWidth > 1000) {
            return result.sort(() => Math.random() -0.5).slice(0,3);
        } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
            return result.sort(() => Math.random() -0.5).slice(0,2);
        } else {
            return result.sort(() => Math.random() -0.5).slice(0,1);
        }
    }


    getCard().then(card =>
        card.forEach(oneCard => {
            swiperContent.insertAdjacentHTML('afterbegin', oneCard);
        })
    )

    const btnNext = document.querySelector('.swiper__btn-next');
    const btnPrev = document.querySelector('.swiper__btn-prev');

    btnPrev.addEventListener('click', sliderPrev);
    btnNext.addEventListener('click', sliderNext);

    function sliderNext () {
        getCard().then(card =>
            card.forEach(oneCard => {
                swiperContent.insertAdjacentHTML('afterbegin', oneCard);
            })
        )
    }
    function sliderPrev () {

    }
}

//pagination

async function getCardForPagination () {
    const url = './pets.json';
    const response = await fetch(url);
    const answer = await response.json();
    const arrCard = [];
    const matrix = [];
    for (let prop in answer ) {
        arrCard.push(`
                <div class="swiper__content-block">
                    <div class="swiper__content-block-img">
                        <img src="${answer[prop].img}" alt="pets-katrine" width="270" height="270">
                    </div>
                    <h3 class="swiper__content-block-title">${answer[prop].name}</h3>
                    <button class="swiper__content-block-btn">Learn more</button>
                </div>
            `)
    }

    for (let i = 0; i < 6; i++) {
        let newAnswer = [...arrCard].sort(() => Math.random() -0.5);
        matrix.push(newAnswer);
    }
    return matrix;
}
const swiperBlock = document.querySelector('.wrapper-pets__content');
getCardForPagination().then(card =>
    card[0].forEach(oneCard => {
        swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
    })
)
const paginationActive = document.querySelector('.pagination-button--active');
const paginationPrev = document.querySelector('.swiper__pagination--prev');
const paginationNext = document.querySelector('.swiper__pagination--next');
const paginationLast = document.querySelector('.swiper__pagination--last');
const paginationFirst = document.querySelector('.swiper__pagination--first');

paginationNext.addEventListener('click', painationNextSlide);

let page = 1;
function painationNextSlide () {
    if (page < 6) {
        paginationActive.textContent = `${++page}`;
        swiperBlock.innerHTML = '';
        getCardForPagination().then(card =>
            card[page-1].forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        )
        if (page !== 1) {
            paginationPrev.classList.remove('pagination-button--disabled');
            paginationFirst.classList.remove('pagination-button--disabled');
        }
        if (page === 6) {
            paginationLast.classList.add('pagination-button--disabled');
            paginationNext.classList.add('pagination-button--disabled');
        }
    }
}
