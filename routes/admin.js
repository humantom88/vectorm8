const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/isAuth');

let Article = require('../models/article');
const controller = require('../controller/auth.js');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', controller.login);

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', controller.register);

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('admin/index', {
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    });
});

router.get('/articles', ensureAuthenticated, async (req, res) => {
    const articles = await Article.find().sort('-date');
    res.render('admin/articles', { 
        articles: articles,
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous" 
    });
  });


router.get('/newArticle', ensureAuthenticated, (req, res) => {
    res.render('admin/newArticle', {
        article: new Article(),
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    });
});

//router.post('/newArticle', ensureAuthenticated, async (req, res) => {
//    let article = new Article({
//        title: req.body.title,
//        description: req.body.description,
//        keywords: req.body.keywords,
//        name: req.body.name,
//        author: req.body.author,
//        visibleText: req.body.visibleText,
//        fullText: req.body.fullText,
//        imageUrl: req.body.image
//    })
//    try {
//        article = await article.save();
//        //console.log(article);
//        res.redirect(`/admin/articles/${article.link}`);
//    } catch (e) {
//        //console.log(article);
//        res.render('admin/newArticle', { article: article });
//    }
//});

router.post('/newArticle', ensureAuthenticated, async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('newArticle'));

router.delete('/articles/:id', ensureAuthenticated, async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/admin/articles')
});

router.get('/articles/edit/:id', ensureAuthenticated, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('admin/editArticle', { 
        article: article, 
        bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
        integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
        crossorigin: "anonymous"
    })
});

router.put('/articles/edit/:id', ensureAuthenticated, async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('/admin/articles/edit'));

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
            article.title = req.body.title,
            article.description = req.body.description,
            article.keywords = req.body.keywords,
            article.name = req.body.name,
            article.author = req.body.author,
            article.visibleText = req.body.visibleText,
            article.fullText = req.body.fullText,
            article.imageUrl = req.body.image
        try {
            article = await article.save();
            //console.log(article);
            res.redirect(`/admin/articles/${article.link}`);
        } catch (e) {
            //console.log(article);
            res.render(`admin/${path}`, { article: article });
        }
    }
}

router.get('/articles/:link', ensureAuthenticated, async (req, res) => {
  let article = await Article.findOne({ link: req.params.link });
  if (article === null) res.redirect('/admin/articles');
  res.render('admin/show', {
    id: article.id,
    title: article.title,
    og_title: article.title,
    description: article.description,
    og_description: article.description,
    keywords: article.keywords,
    name: article.name,
    author: article.author,
    renderedDescription: article.renderedDescription,
    renderedText: article.renderedText,
    imageUrl: article.imageUrl,
    bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
    integrity: "sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",
    crossorigin: "anonymous"
  })
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;