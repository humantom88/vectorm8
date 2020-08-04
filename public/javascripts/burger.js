'use strict';

let burger = document.getElementById('burger');

function activateBurger() {
	let burgerIcon = document.querySelector('.header__burger');
	let mobileNav = document.querySelector('.mobile-nav');
	let body = document.body;

	burgerIcon.classList.toggle('burger_active');
	mobileNav.classList.toggle('burger_active');
	body.classList.toggle('locked');
}

burger.addEventListener('click', activateBurger);
