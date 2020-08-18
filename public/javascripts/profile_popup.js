'use strict';

let profileBtn = document.getElementById('profileBtn');

profileBtn.addEventListener('click', () => {
	let popup = document.getElementById('profilePopup');
	popup.classList.toggle('popupActive');
});