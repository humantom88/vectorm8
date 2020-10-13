let Image = require('../models/image');

function saveImageAndRedirect(errorPath, successPath) {
    return async (req, res) => {
        let image = req.image

        if (req.file) {
            image.imageUrl = req.file.filename
        } else {
            image.imageUrl = image.imageUrl
        }
            image.text = req.body.text

        try {
            image = await image.save();
            res.redirect(`/admin/${successPath}`);
        } catch (e) {
            console.log(`ERROR!!  ${image}`);
            res.render(`admin/${errorPath}`, { image: image });
        }
    }
}

module.exports = saveImageAndRedirect;