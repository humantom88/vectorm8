'use strict';

const accordeon = document.querySelector('.clients__accordeon');
const closeBtn = document.querySelector('.accordeon__closeArrow');

closeBtn.onclick = () => {
    accordeon.open = false;
}