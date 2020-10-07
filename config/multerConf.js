const multer = require('multer');

const storageArticles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/articles/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

module.exports.uploadArticleImg = multer({ storage: storageArticles, fileFilter: imageFilter });