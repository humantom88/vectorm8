let Product = require('../models/product');

function saveProductAndRedirect(path) {
    return async (req, res) => {
        let product = req.product;
    
        if (req.files.productImage) {
            product.imageUrl = req.files.productImage[0].filename
        } else {
            product.imageUrl = product.imageUrl
        }
        if (req.files.productImage_1) {
            product.imageUrl_1 = req.files.productImage_1[0].filename
        } else {
            product.imageUrl_1 = product.imageUrl_1
        }
        if (req.files.productImage_2) {
            product.imageUrl_2 = req.files.productImage_2[0].filename
        } else {
            product.imageUrl_2 = product.imageUrl_2
        }
        if (req.files.productImage_3) {
            product.imageUrl_3 = req.files.productImage_3[0].filename
        } else {
            product.imageUrl_3 = product.imageUrl_3
        }
        if (req.files.productImage_4) {
            product.imageUrl_4 = req.files.productImage_4[0].filename
        } else {
            product.imageUrl_4 = product.imageUrl_4
        }
        if (req.files.productImage_5) {
            product.imageUrl_5 = req.files.productImage_5[0].filename
        } else {
            product.imageUrl_5 = product.imageUrl_5
        }
            product.title = req.body.title,
            product.description = req.body.description,
            product.keywords = req.body.keywords,
            product.name = req.body.name,
            product.subTitle_1 = req.body.subTitle_1,
            product.subTitle_2 = req.body.subTitle_2,
            product.text_1 = req.body.text_1,
            product.text_2 = req.body.text_2,
            product.text_3 = req.body.text_3,
            product.text_4 = req.body.text_4,
            product.text_5 = req.body.text_5,
            product.conclusion_1 = req.body.conclusion_1,
            product.conclusion_2 = req.body.conclusion_2,
            product.conclusion_3 = req.body.conclusion_3,
            product.publicInProducts = !!req.body.publicInProducts,
            product.publicInReadySolutions = !!req.body.publicInReadySolutions
        try {
            product = await product.save();
            res.redirect(`/admin/products`);
        } catch (e) {
            res.render(`admin/${path}`, { product: product });
        }
    }
}

module.exports = saveProductAndRedirect;