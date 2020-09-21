const mongoose = require('mongoose');
const marked = require('marked');
const cyrillicTranslit = require('cyrillic-to-translit-js');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
    keywords: {
        type: String,
        //required: true
    },
    name: {
        type: String,
        required: true,
        //unique: true
    },
    author: {
        type: String
    },
    visibleText: {
        type: String,
        required: true
    },
    fullText: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
       // unique: true
    },
    link: {
        type: String,
        //required: true,
        //unique: true
    },
    renderedDescription: {
        type: String,
        //required: true
    },
    renderedText: {
        type: String,
        //required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

articleSchema.pre('validate', function(next) {
    if (this.name) {
        this.link = cyrillicTranslit().transform(this.name, "_").toLowerCase()
    }
    if (this.visibleText) {
        this.renderedDescription = dompurify.sanitize(marked(this.visibleText));
    }
    if (this.fullText) {
        this.renderedText = dompurify.sanitize(marked(this.fullText));
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema);