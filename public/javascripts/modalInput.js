'use strict';

let popupBtn = document.getElementById('showPopup');

function activateModalInput() {
	let popup = document.getElementById('inputPopup');
	let closeBtn = document.getElementById('modalCloseBtn');
	let body = document.body;

	popup.classList.toggle('modal_active');
	body.classList.toggle('locked');

	closeBtn.addEventListener('click', () => {
		popup.classList.remove('modal_active');
		body.classList.remove('locked');
	});
}

popupBtn.addEventListener('click', activateModalInput);