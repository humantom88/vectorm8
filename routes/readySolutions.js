const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mailer = require('./mailer');
const botTelegram = require('../api/telegramMsg');

const urlencodedParser = bodyParser.urlencoded({extended: false});

let mailSended = undefined;

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

router.post('/digital_agriculture', urlencodedParser, function (req, res) {
	if(!req.body && req.body === undefined) return res.sendStatus(400);
	mailSended = req.body;
	let telegramFields = [
		'Узнать стоимость системы цифрового сельского хозяйства.',
	    `Сообщение от: ${mailSended.name}`,
	    `Email: ${mailSended.email}`,
	    `Телефон: ${mailSended.phone}`,
	    `Комментарий: ${mailSended.message}`
	];
	const message = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADDRESSEE,
    subject: 'new message',
	text: `Узнать стоимость системы цифрового сельского хозяйства.
		Cообщение от: ${mailSended.name}.
    	Email: ${mailSended.email}
    	телефон: ${mailSended.phone}

    	Комментарий: ${mailSended.message}`
	}
	botTelegram.sendMsg(telegramFields);
	mailer(message);
	res.redirect('/ready_solutions/info');
});


router.get('/info', (req, res) => {
	res.render('emailsended', {
		email: mailSended.email
	})
});


module.exports = router;