const express = require('express');
const router = express.Router();

router.get('/digital_agriculture', function(req, res) {
	res.render('readySolutions/digitalAgriculture', {
		title: "Цифровое сельское хозяйство",
		description: "сельское хозяйство,спутниковый мониторинг, спутниковые снимки полей, книга агронома,  агроном",
		keywords: "сельское хозяйство,спутниковый мониторинг, спутниковые снимки полей, книга агронома,  агроном",
		og_title: "Цифровое сельское хозяйство",
		og_description: "сельское хозяйство,спутниковый мониторинг, спутниковые снимки полей, книга агронома,  агроном",
		og_url: "https://vectorm8.ru/digital_agriculture/digital_agriculture"
	});
});

module.exports = router;