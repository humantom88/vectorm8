const express = require('express');
const router = express.Router();
//const multer = require('multer');

const { ensureAuthenticated } = require('../config/isAuth');
let Article = require('../models/article');
let Product = require('../models/product');
let Image = require('../models/image');
const controller = require('../controller/auth.js');
const multerConf = require('../config/multerConf');
const reCaptcha = require('../config/reCaptcha');
const saveArticleAndRedirect = require('../controller/saveArticle');
const saveProductAndRedirect = require('../controller/saveProduct');
const saveImageAndRedirect = require('../controller/saveImage');


router.get('/login', (req, res) => {
    res.render('login', {
        norobots: true,
        recaptcha: true,
        yandexMetrica: true
    });
});

router.post('/login', reCaptcha, controller.login);

//router.get('/register', (req, res) => {
//    res.render('register');
//});
//
//router.post('/register', reCaptcha, controller.register);


router.get('/', ensureAuthenticated, async (req, res) => {
    res.render('admin/index', {
        norobots: true,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    });
});



router.get('/articles', ensureAuthenticated, async (req, res) => {
    const articles = await Article.find().sort('-date');
    res.render('admin/articles', {
        norobots: true,
        articles: articles,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    });
});

router.get('/newArticle', ensureAuthenticated, (req, res) => {
    res.render('admin/newArticle', {
        norobots: true,
        article: new Article(),
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    });
});

router.post('/newArticle', ensureAuthenticated, multerConf.uploadArticleImg.single('articleImage'), async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('newArticle'));

router.delete('/articles/:id', ensureAuthenticated, async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/admin/articles')
});

router.get('/articles/edit/:id', ensureAuthenticated, async (req, res) => {
    const article = await Article.findById(req.params.id)
    //console.log(article)
    res.render('admin/editArticle', {
        norobots: true,
        article: article,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});

router.put('/articles/edit/:id', ensureAuthenticated, multerConf.uploadArticleImg.single('articleImage'), async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('/admin/articles/edit'));


router.get('/articles/:link', ensureAuthenticated, async (req, res) => {
    let article = await Article.findOne({ link: req.params.link });
    if (article === null) res.redirect('/admin/articles');
    res.render('admin/showArticle', {
        article,
        norobots: true,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});



router.get('/products', ensureAuthenticated, async (req, res) => {
    const products = await Product.find().sort('-date');
    res.render('admin/products', {
        norobots: true,
        products: products,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});

router.get('/products/:link', ensureAuthenticated, async (req, res) => {
    let product = await Product.findOne({ link: req.params.link });
    if (product === null) res.redirect('/admin/products');
    res.render('admin/showProduct', {
        product,
        norobots: true,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});


router.get('/newProduct', ensureAuthenticated, (req, res) => {
    res.render('admin/newProduct', {
        norobots: true,
        product: new Product(),
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    });
});

router.post('/newProduct', ensureAuthenticated, multerConf.uploadProductImg.fields(
    [
        { name: 'productImage', maxCount: 1 },
        { name: 'productImage_1', maxCount: 1 },
        { name: 'productImage_2', maxCount: 1 },
        { name: 'productImage_3', maxCount: 1 },
        { name: 'productImage_4', maxCount: 1 },
        { name: 'productImage_5', maxCount: 1 }
    ]
), async (req, res, next) => {
    //console.log(req.files)
    req.product = new Product()
    next()
}, saveProductAndRedirect('newProduct'));

router.get('/products/edit/:id', ensureAuthenticated, async (req, res) => {
    const product = await Product.findById(req.params.id)

    res.render('admin/editProduct', {
        norobots: true,
        product: product,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});

router.put('/products/edit/:id', ensureAuthenticated, multerConf.uploadProductImg.fields(
    [
        { name: 'productImage', maxCount: 1 },
        { name: 'productImage_1', maxCount: 1 },
        { name: 'productImage_2', maxCount: 1 },
        { name: 'productImage_3', maxCount: 1 },
        { name: 'productImage_4', maxCount: 1 },
        { name: 'productImage_5', maxCount: 1 }
    ]
), async (req, res, next) => {
    req.product = await Product.findById(req.params.id)
    next()
}, saveProductAndRedirect('/admin/products/edit:id'));

router.delete('/products/:id', ensureAuthenticated, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/admin/products')
});

router.get('/gallery', ensureAuthenticated, async (req, res) => {
    const images = await Image.find().sort('-date');
    res.render('admin/gallery', {
        norobots: true,
        images: images,
        lightgallery: true,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});

router.post('/gallery', ensureAuthenticated, multerConf.uploadGalleryImg.single('imageUrl'), async (req, res, next) => {
    req.image = new Image()
    next()
}, saveImageAndRedirect('gallery', 'gallery'));

router.get('/galleryEdit', ensureAuthenticated, async (req, res) => {
    const images = await Image.find().sort('-date');
    res.render('admin/galleryEdit', {
        norobots: true,
        images: images,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});

router.put('/gallery/edit/:id', ensureAuthenticated, multerConf.uploadGalleryImg.single('imageUrl'), async (req, res, next) => {
    req.image = await Image.findById(req.params.id)
    next()
}, saveImageAndRedirect('galleryEdit', 'galleryEdit'));

router.delete('/gallery/:id', ensureAuthenticated, async (req, res) => {
    await Image.findByIdAndDelete(req.params.id)
    res.redirect('/admin/galleryEdit')
});



router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;