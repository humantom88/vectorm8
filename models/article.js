const mongoose = require('mongoose');

const Article = mongoose.model('Article', {
    title: String,
    author: String,
    text: String,
    imageUrl: String,
    linkName: String
});

module.exports = {Article};