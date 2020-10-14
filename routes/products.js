const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mailer = require('./mailer');
const botTelegram = require('../api/telegramMsg');
const reCaptcha = require('../config/reCaptcha');
const Product = require('../models/product');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let mailSended = undefined;


router.get('/:link', async (req, res) => {
  const product = await Product.findOne({ link: req.params.link });
  if (product === null) {
    res.redirect('/')
  }
  res.render('products/show', { 
    product,
    title: product.title,
    og_title: product.title,
    description: product.description,
    og_description: product.description,
    keywords: product.keywords,
		og_url: `https://vectorm8.ru/products/${product.link}`,
    recaptcha: true,
    yandexMetrica: true
  });
});

router.post('/:link', reCaptcha, urlencodedParser, async (req, res) => {
  if (!req.body && req.body === undefined) {
    return res.sendStatus(400)
  }
  const product = await Product.findOne({ link: req.params.link });
  mailSended = req.body;
  let telegramFields = [
    `Узнать стоимость ${product.name}.`,
    `Сообщение от: ${mailSended.name}`,
    `Email: ${mailSended.email}`,
    `Телефон: ${mailSended.phone}`,
    `Комментарий: ${mailSended.message}`
  ];
  const message = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADDRESSEE,
    subject: 'new message',
    text: `Узнать стоимость ${product.name}.
      Cообщение от: ${mailSended.name}.
        Email: ${mailSended.email}
      телефон: ${mailSended.phone}
      
        Комментарий: ${mailSended.message}`
  }
  botTelegram.sendMsg(telegramFields);
  mailer(message);
  res.redirect('/products/info/msg');
});

router.get('/info/msg', (req, res) => {
	res.render('emailsended', {
    mailSended,
		yandexMetrica: true
  })
});

module.exports = router;