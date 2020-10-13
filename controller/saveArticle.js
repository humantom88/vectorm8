let Article = require('../models/article');

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        //console.log(req.body);
        if (req.file) {
            article.imageUrl = req.file.filename
        } else {
            article.imageUrl = article.imageUrl
        }
            article.title = req.body.title,
            article.description = req.body.description,
            article.keywords = req.body.keywords,
            article.name = req.body.name,
            article.author = req.body.author,
            article.visibleText = req.body.visibleText,
            article.fullText = req.body.fullText,
            article.isPublished = !!req.body.isPublished
        try {
            article = await article.save();
            //console.log(article);
            res.redirect(`/admin/articles`);
        } catch (e) {
            //console.log(article);
            res.render(`admin/${path}`, { article: article });
        }
    }
}

module.exports = saveArticleAndRedirect;