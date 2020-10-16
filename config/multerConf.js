const multer = require('multer');

const storageArticles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/articles/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb (null, false);
    }
}

module.exports.uploadArticleImg = multer({ storage: storageArticles, fileFilter: imageFilter });


const storageProducts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/products/')
    },
    filename: function (req, file, cb) {
        cb (null, Date.now() + file.originalname)
    }
})

module.exports.uploadProductImg = multer({ storage: storageProducts, fileFilter: imageFilter });


const storageGallery = multer.diskStorage({
    destination: function (req, file, cb) {
        cb (null, 'public/img/gallery/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

module.exports.uploadGalleryImg = multer({ storage: storageGallery, fileFilter: imageFilter });