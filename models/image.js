const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    },
    text: {
        type: String
    },
    caption: {
        type: String
    },
    date: {
        type: Date
    }
})


imageSchema.pre('validate', function(next) {
    this.caption = `caption_${Date.now()}`;
    this.date = Date.now();
    next()
})

module.exports = mongoose.model('Image', imageSchema);