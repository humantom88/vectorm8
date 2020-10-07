const mongoose = require('mongoose');
const marked = require('marked');
const cyrillicTranslit = require('cyrillic-to-translit-js');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const productSchema = new mongoose.Schema({

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
    text_1: {
        type: String,
        required: true
    },
    imageUrl_1: {
        type: String,
    },
    text_2: {
        type: String,
    },
    imageUrl_2: {
        type: String,
    },
    text_3: {
        type: String,
    },
    imageUrl_3: {
        type: String,
    },
    text_4: {
        type: String,
    },
    imageUrl_4: {
        type: String,
    },
    text_5: {
        type: String,
    },
    imageUrl_5: {
        type: String,
    },
    
    link: {
        type: String,
    },
    renderedText_1: {
        type: String,
    },
    renderedText_2: {
        type: String,
    },
    renderedText_3: {
        type: String,
    },
    renderedText_4: {
        type: String,
    },
    renderedText_5: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean
    }
})


productSchema.pre('validate', function(next) {
    if (this.name) {
        this.link = cyrillicTranslit().transform(this.name, "_").toLowerCase()
    }
    if (this.text_1) {
        this.renderedText_1 = dompurify.sanitize(marked(this.text_1));
    }
    if (this.text_2) {
        this.renderedText_2 = dompurify.sanitize(marked(this.text_2));
    }
    if (this.text_3) {
        this.renderedText_3 = dompurify.sanitize(marked(this.text_3));
    }
    if (this.text_4) {
        this.renderedText_4 = dompurify.sanitize(marked(this.text_4));
    }
    if (this.text_5) {
        this.renderedText_5 = dompurify.sanitize(marked(this.text_5));
    }
    
    next()
})

module.exports = mongoose.model('Product', productSchema);