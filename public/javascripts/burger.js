'use strict';

let burger = document.getElementById('burger');
let navBtns = document.querySelectorAll('.mobile-nav__link');

function activateBurger() {
	let burgerIcon = document.querySelector('.header__burger');
	let mobileNav = document.querySelector('.mobile-nav');
	let body = document.body;
	

	burgerIcon.classList.toggle('burger_active');
	mobileNav.classList.toggle('burger_active');
	body.classList.toggle('locked');
}


for (let button of navBtns) {
	button.addEventListener('click', activateBurger)
  }

burger.addEventListener('click', activateBurger);
