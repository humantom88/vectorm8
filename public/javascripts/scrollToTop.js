'use strict';

const toTopBtn = document.querySelector('.toTopBtn');

function trackScroll() {
	const scrolled = window.pageYOffset;
	const coords = document.documentElement.clientHeight;

	if (scrolled > coords) {
		toTopBtn.classList.add('toTopBtn_visible');
	}
	if (scrolled < coords) {
		toTopBtn.classList.remove('toTopBtn_visible');
	}
}

function scrollToTop() {
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -60);
		setTimeout(scrollToTop, 0);
	}
}

window.addEventListener('scroll', trackScroll);
toTopBtn.addEventListener('click', scrollToTop);