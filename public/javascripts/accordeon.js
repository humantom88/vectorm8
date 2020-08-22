'use strict';

const openBtn = document.querySelector('.clients__accordeon_openWrapper');
const closeBtn = document.querySelector('.clients__accordeon_closeWrapper');
const hiddenPart = document.querySelector('.clients__accordeon_hidden');

openBtn.onclick = function () {
    openBtn.classList.add('hidden');
    hiddenPart.classList.remove('hidden');
    hiddenPart.classList.add('accordeon__openAnimation');
    setTimeout( () => {
        hiddenPart.classList.remove('accordeon__openAnimation');
    }, 400);
}

closeBtn.onclick = function () {
    hiddenPart.classList.add('accordeon__closeAnimation');
    setTimeout( () => {
        hiddenPart.classList.remove('accordeon__closeAnimation');
        hiddenPart.classList.add('hidden');
        openBtn.classList.remove('hidden');
    }, 400);
}

const openBtn_partners = document.querySelector('.partners__accordeon_openWrapper');
const closeBtn_partners = document.querySelector('.partners__accordeon_closeWrapper');
const hiddenPart_partners = document.querySelector('.partners__accordeon_hidden');

openBtn_partners.onclick = function () {
    openBtn_partners.classList.add('hidden');
    hiddenPart_partners.classList.remove('hidden');
    hiddenPart_partners.classList.add('accordeon__openAnimation');
    setTimeout( () => {
        hiddenPart_partners.classList.remove('accordeon__openAnimation');
    }, 400);
}

closeBtn_partners.onclick = function () {
    hiddenPart_partners.classList.add('accordeon__closeAnimation');
    setTimeout( () => {
        hiddenPart_partners.classList.remove('accordeon__closeAnimation');
        hiddenPart_partners.classList.add('hidden');
        openBtn_partners.classList.remove('hidden');
    }, 400);
}





/*
const openBtns = document.querySelectorAll('.accordeon__openWrapper');

openBtns.forEach(function (btn) {
    btn.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.remove('hidden');
    })
})*/


//setTimeout( () => {
      //    console.log(hiddenPart.clientHeight);
      //}, 1000);

//console.log((document.querySelector('.clients__accordeon_hidden')).clientHeight);
//hiddenPart.style.minHeight = hiddenElHeight + 'px';

//let hiddenElHeight = hiddenPart.clientHeight;
/*
let hiddenElHeight = document.querySelector('.clients__content_3cols___1').clientHeight + document.querySelector('.clients__content_4cols') + document.querySelector('.accordeon__closeWrapper') + 'px';

hiddenPart.style.minHeight = '0px';
*/

//const accordeon = document.querySelector('.clients__accordeon');
//const closeBtn = document.querySelector('.accordeon__closeArrow');
//const hiddenPart = document.querySelector(.'clients__accordeon_hidden');

//console.log((document.querySelector('.clients__accordeon_hidden')).clientHeight);
/*function closeAnimation () {
    const hiddenPart = document.querySelector('.clients__accordeon_hidden');
    const accordeon = document.querySelector('.clients__accordeon');
    hiddenPart.classList.add('accordeon__closeAnimation');
    setTimeout( () => {
        accordeon.open = false;
    }, 800);
}*/
/*
closeBtn.onclick = function () {
    const hiddenPart = document.querySelector('.clients__accordeon_visible');
    const accordeon = document.querySelector('.clients__accordeon');
    hiddenPart.classList.add('accordeon__closeAnimation');
    setTimeout( () => {
        accordeon.open = false;
        hiddenPart.classList.remove('accordeon__closeAnimation');
    }, 800);
}*/

/*
closeBtn.onclick = () => {
    accordeon.open = false;
}*/

