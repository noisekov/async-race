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
    if (evt.target.closest('.nav__item') || evt.target.closest('.overflow')) {
        burger.classList.remove('open');
        nav.classList.remove('open');
        body.classList.remove('no-scroll');
        overflow.classList.remove('show');
    }
}

//--------------------------------modal----------------------//
const petsCard = document.querySelector('.swiper__content');
const modalWidnow = document.querySelector('.modal-window');
const swiperContent = document.querySelector('.swiper__content');

function getData () {
    let xhr = new XMLHttpRequest();
    const url = './pets.json';
    xhr.open('GET', url, false);
    try {
        xhr.send();
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            return xhr.response
        }
    } catch(err) {
        alert("нет данных от сервера")
    }
}

function createModalWindow (whatName) {
    let data = JSON.parse(getData ());
    let whatIndex = data.filter((x, i, arr) => {
        if (x.name === whatName) {
            return arr[i];
        }
    })

    let html = `
    <div class="modal-wrapper">
        <div class="modal">
            <div class="modal__img">
                <img src="${whatIndex[0].img}" width="500" height="500" alt="${whatIndex[0].name}">
            </div>
            <div class="modal__content">
                <p class="modal__title">${whatIndex[0].name}</p>
                <p class="modal__breed">${whatIndex[0].type} - ${whatIndex[0].breed}</p>
                <p class="modal__description">${whatIndex[0].description}</p>
                <ul class="modal__items">
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Age:</b> ${whatIndex[0].age}</span>
                    </li>
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Inoculations:</b> ${whatIndex[0].inoculations}</span>
                    </li>
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Diseases:</b> ${whatIndex[0].diseases}</span>
                    </li>
                    <li class="modal__item">
                        <span class="modal__item-type"><b>Parasites:</b>  ${whatIndex[0].parasites}</span>
                    </li>
                </ul>
            </div>
            <span class="modal__btn-close"></span>
        </div>
    </div>`
    
    modalWidnow.insertAdjacentHTML("afterbegin", html);
}

petsCard.onclick = function (evt) {
    if (evt.target.closest('.swiper__content-block')) {
        let whatName = evt.target.closest('.swiper__content-block').children[1].textContent;
        createModalWindow (whatName);
        modalWidnow.classList.toggle('open');
        body.classList.toggle('no-scroll');
    }
}
modalWidnow.addEventListener('click', closeModal);

function closeModal (evt) {
    if (evt.target.closest('.modal__btn-close') ) {
        modalWidnow.classList.remove('open');
        body.classList.remove('no-scroll');
    }
    if (!evt.target.closest('.modal')) {
        modalWidnow.classList.remove('open');
        body.classList.remove('no-scroll');
    }
}

//--------------------------------slider----------------------//
if (location.pathname === "/") {
    function getDataCardForSlider () {
        let xhr = new XMLHttpRequest();
        const url = './pets.json';
        xhr.open('GET', url, false);
        try {
            xhr.send();
            if (xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                return xhr.response
            }
        } catch(err) {
            alert("нет данных от сервера")
        }
    }


    function getCard () {
        let data = JSON.parse(getData());
        const result = [];

        data.forEach(card => {
            result.push(`
                    <div class="swiper__content-block">
                        <div class="swiper__content-block-img">
                            <img src="${card.img}" alt="${card.name}" width="270" height="270">
                        </div>
                        <h3 class="swiper__content-block-title">${card.name}</h3>
                        <button class="swiper__content-block-btn">Learn more</button>
                    </div>
                `)
        })
            
        if (window.innerWidth > 1000) {
            return result.sort(() => Math.random() -0.5).slice(0,6);
        } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
            return result.sort(() => Math.random() -0.5).slice(0,5);
        } else {
            return result.sort(() => Math.random() -0.5).slice(0,2);
        }
    }
    getCard ()

    getCard().forEach(oneCard => {
            swiperContent.insertAdjacentHTML('afterbegin', oneCard);
        })

    // const btnNext = document.querySelector('.swiper__btn-next');
    // const btnPrev = document.querySelector('.swiper__btn-prev');

    // btnPrev.addEventListener('click', sliderPrev);
    // btnNext.addEventListener('click', sliderNext);

    // function sliderNext () {
        
    // }
    // function sliderPrev () {

    // }
}

//--------------------------------pagination----------------------//
if (location.pathname === "/page/our-pets.html") {
    function getData () {
        let xhr = new XMLHttpRequest();
        const url = './pets.json';
        xhr.open('GET', url, false);
        try {
            xhr.send();
            if (xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                return xhr.response
            }
        } catch(err) {
            alert("нет данных от сервера")
        }
    }
    
    function createCardPagination() {
        let data = JSON.parse(getData());
        const arrCard = [];
        const result = [];
        data.forEach(card => {
            arrCard.push(`
                    <div class="swiper__content-block">
                        <div class="swiper__content-block-img">
                            <img src="${card.img}" alt="pets-katrine" width="270" height="270">
                        </div>
                        <h3 class="swiper__content-block-title">${card.name}</h3>
                        <button class="swiper__content-block-btn">Learn more</button>
                    </div>
                `)
        })
        for (let i = 0; i < 6; i++) {
            let newAnswer = [...arrCard].sort(() => Math.random() -0.5);
            result.push(...newAnswer);
        }
        return result;
    }
    let arrayAllCard = [...createCardPagination()];
    
    const swiperBlock = document.querySelector('.wrapper-pets__content');
    const paginationActive = document.querySelector('.pagination-button--active');
    const paginationPrev = document.querySelector('.swiper__pagination--prev');
    const paginationNext = document.querySelector('.swiper__pagination--next');
    const paginationLast = document.querySelector('.swiper__pagination--last');
    const paginationFirst = document.querySelector('.swiper__pagination--first');
    
    let page = 1;
    let lastPage = 0;
    let firstCard = 0;
    let lastCard = 0;
    
    if (window.innerWidth > 1000) {
        lastCard = 8;
    } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
        lastCard = 6;
    } else {
        lastCard = 3;
    }
    function setCard () {
        swiperBlock.innerHTML = '';
        if (window.innerWidth > 1000) {
            page = 1;
            paginationActive.textContent = `${page}`;
            lastPage = 6;
            firstCard = 0;
            lastCard = 8 * page;
            arrayAllCard.slice(0,8).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
            page = 1;
            paginationActive.textContent = `${page}`;
            lastPage = 8;
            firstCard = 0;
            lastCard = 8 * page;
            arrayAllCard.slice(0,6).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        } else {
            page = 1;
            paginationActive.textContent = `${page}`;
            lastPage = 16;
            firstCard = 0;
            lastCard = 8 * page;
            arrayAllCard.slice(0,3).forEach(oneCard => {
                swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
            })
        }
        paginationPrev.classList.add('pagination-button--disabled');
        paginationFirst.classList.add('pagination-button--disabled');
        paginationLast.classList.remove('pagination-button--disabled');
        paginationNext.classList.remove('pagination-button--disabled');
    }
    setCard()
    window.addEventListener('resize', setCard);
    
    paginationNext.addEventListener('click', painationNextSlide);
    paginationLast.addEventListener('click', painationLastSlide);
    paginationPrev.addEventListener('click', painationPrevSlide);
    paginationFirst.addEventListener('click', painationFirstSlide);
    
    function painationNextSlide () {
        if (page !== lastPage) {
            paginationActive.textContent = `${++page}`;
            swiperBlock.innerHTML = '';
            if (window.innerWidth > 1000) {
                lastPage = 6;
                firstCard = 8 * (page - 1);
                lastCard = 8 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
                lastPage = 8;
                firstCard = 6 * (page - 1);
                lastCard = 6 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else {
                lastPage = 16;
                firstCard = 3 * (page - 1);
                lastCard = 3 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            }
            if (page !== 1) {
                paginationPrev.classList.remove('pagination-button--disabled');
                paginationFirst.classList.remove('pagination-button--disabled');
            }
            if (page === lastPage) {
                paginationLast.classList.add('pagination-button--disabled');
                paginationNext.classList.add('pagination-button--disabled');
            }
        console.log(firstCard, lastCard)
        }
    }
    function painationLastSlide () {
        if (page !== lastPage) {
            page = lastPage;
            paginationActive.textContent = `${page}`;
            swiperBlock.innerHTML = '';
            if (window.innerWidth > 1000) {
                lastPage = 6;
                firstCard = 8 * (page - 1);
                lastCard = 8 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
                lastPage = 8;
                firstCard = 6 * (page - 1);
                lastCard = 6 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else {
                lastPage = 16;
                firstCard = 3 * (page - 1);
                lastCard = 3 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            }
            if (page === lastPage) {
                paginationLast.classList.add('pagination-button--disabled');
                paginationNext.classList.add('pagination-button--disabled');
                paginationPrev.classList.remove('pagination-button--disabled');
                paginationFirst.classList.remove('pagination-button--disabled');
            }
            console.log(firstCard, lastCard)
        }
    }
    function painationPrevSlide () {
        if (page > 1) {
            paginationActive.textContent = `${--page}`;
            swiperBlock.innerHTML = '';
            if (window.innerWidth > 1000) {
                lastPage = 6;
                firstCard = 8 * (page - 1);
                lastCard = 8 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else if (window.innerWidth < 1000 && window.innerWidth > 720 ) {
                lastPage = 8;
                firstCard = 6 * (page - 1);
                lastCard = 6 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            } else {
                lastPage = 16;
                firstCard = 3 * (page - 1);
                lastCard = 3 * page;
                arrayAllCard.slice(firstCard, lastCard).forEach(oneCard => {
                    swiperBlock.insertAdjacentHTML('afterbegin', oneCard);
                })
            }
            if (page === 1) {
                paginationPrev.classList.add('pagination-button--disabled');
                paginationFirst.classList.add('pagination-button--disabled');
            }
            paginationLast.classList.remove('pagination-button--disabled');
            paginationNext.classList.remove('pagination-button--disabled');
        console.log(firstCard, lastCard)
        }
    }
    function painationFirstSlide () {
        if (page > 1) {
            page = 1;
            paginationActive.textContent = `${page}`;
            if (page === 1) {
                paginationPrev.classList.add('pagination-button--disabled');
                paginationFirst.classList.add('pagination-button--disabled');
            }
            setCard ();
            paginationLast.classList.remove('pagination-button--disabled');
            paginationNext.classList.remove('pagination-button--disabled');
        }
    }
}