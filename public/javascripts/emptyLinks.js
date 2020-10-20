'use strict';

let links = document.querySelectorAll('a');

let emptyLinks = [];

links.forEach (link => {
    if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
        emptyLinks.push(link)
    }
});

emptyLinks.forEach (link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
    })
});
