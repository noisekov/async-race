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
    console.log(answer)
    const arrCard = [];
    const result = [];
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
        result.push(...newAnswer);
    }
    return result;
}
console.log(getCardForPagination())
const swiperBlock = document.querySelector('.wrapper-pets__content');
let page = 1;
let lastPage = 0;
function setCard () {
    swiperBlock.innerHTML = '';
    if (window.innerWidth > 1000) {
        lastPage = 6;
        getCardForPagination().then(card =>
            card.slice(0,8).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        )
    } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
        lastPage = 8;
        getCardForPagination().then(card =>
            card.slice(0,6).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        )
    } else {
        lastPage = 16
        getCardForPagination().then(card =>
            card.slice(0,3).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        )
    }
}
// setCard ()
// window.addEventListener('resize', setCard);

// const paginationActive = document.querySelector('.pagination-button--active');
// const paginationPrev = document.querySelector('.swiper__pagination--prev');
// const paginationNext = document.querySelector('.swiper__pagination--next');
// const paginationLast = document.querySelector('.swiper__pagination--last');
// const paginationFirst = document.querySelector('.swiper__pagination--first');

// paginationNext.addEventListener('click', painationNextSlide);
// paginationLast.addEventListener('click', painationLastSlide);
// paginationPrev.addEventListener('click', painationPrevSlide);
// paginationFirst.addEventListener('click', painationFirstSlide);

// function painationNextSlide () {
//     if (page < lastPage) {
//         paginationActive.textContent = `${++page}`;
//         setCard ();
//         if (page !== 1) {
//             paginationPrev.classList.remove('pagination-button--disabled');
//             paginationFirst.classList.remove('pagination-button--disabled');
//         }
//         if (page === lastPage) {
//             paginationLast.classList.add('pagination-button--disabled');
//             paginationNext.classList.add('pagination-button--disabled');
//         }
//     }
// }
// function painationLastSlide () {
//     if (page !== lastPage) {
//         page = lastPage;
//         paginationActive.textContent = `${page}`;
//         setCard ();
//         if (page === lastPage) {
//             paginationLast.classList.add('pagination-button--disabled');
//             paginationNext.classList.add('pagination-button--disabled');
//             paginationPrev.classList.remove('pagination-button--disabled');
//             paginationFirst.classList.remove('pagination-button--disabled');
//         }
//     }
// }
// function painationPrevSlide () {
//     if (page > 1) {
//         paginationActive.textContent = `${--page}`;
//         if (page === 1) {
//             paginationPrev.classList.add('pagination-button--disabled');
//             paginationFirst.classList.add('pagination-button--disabled');
//         }
//         setCard ();
//         paginationLast.classList.remove('pagination-button--disabled');
//         paginationNext.classList.remove('pagination-button--disabled');
//     }
// }
// function painationFirstSlide () {
//     if (page > 1) {
//         page = 1;
//         paginationActive.textContent = `${page}`;
//         if (page === 1) {
//             paginationPrev.classList.add('pagination-button--disabled');
//             paginationFirst.classList.add('pagination-button--disabled');
//         }
//         setCard ();
//         paginationLast.classList.remove('pagination-button--disabled');
//         paginationNext.classList.remove('pagination-button--disabled');
//     }
// }