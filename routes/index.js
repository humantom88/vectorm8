var express = require('express');
var router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Article = require('../models/article');
const Product = require('../models/product');
const Image = require('../models/image');
const mailer = require('./mailer');
const botTelegram = require('../api/telegramMsg');
const reCaptcha = require('../config/reCaptcha');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

//router.post('/', ctrlTelegram.sendMsg);

let mailSended = undefined;


router.post('/', reCaptcha, urlencodedParser, function (req, res) {
  if (!req.body && req.body === undefined) return res.sendStatus(400);
  mailSended = req.body;
  let telegramFields = [
    `Сообщение от: ${mailSended.name}`,
    `Email: ${mailSended.email}`,
    `Телефон: ${mailSended.phone}`,
    mailSended.message
  ];
  const message = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADDRESSEE,
    subject: 'new message',
    text: `Cообщение от: ${mailSended.name}.
    Email: ${mailSended.email}
    телефон: ${mailSended.phone}

    ${mailSended.message}`
  }
  botTelegram.sendMsg(telegramFields);
  mailer(message);
  res.redirect('/info');
});

router.get('/info', (req, res) => {
  res.render('emailsended', {
    mailSended,
    yandexMetrica: true
  })
});


router.get('/', async function (req, res) {
  const products = await Product.find().sort('-date');
  res.render('index', {
    products: products,
    title: "Вектор М-8.  ГЛОНАСС. Спутниковый мониторинг транспорта. Контроль топлива. ЭРА-ГЛОНАСС. Агронавигатор.",
    description: "система спутникового мониторинга транспорта, система мониторинга расхода топлива,  ЭРА-ГЛОНАСС, система мониторинга АЗС, система точного земледелия,  агронавигатор, система контроля давления в шинах, продажа в Вологде и Вологодской области, Архангельск, Кострома, Череповец, Ярославль",
    keywords: "ГЛОНАСС, спутниковый мониторинг транспорта,  мониторинг транспорта, контроль топлива, ЭРА-ГЛОНАСС, агронавигатор, проблесковый маяк, контроль давления в шинах",
    og_title: "Вектор М-8.  ГЛОНАСС. Спутниковый мониторинг транспорта. Контроль топлива. ЭРА-ГЛОНАСС. Агронавигатор.",
    og_description: "система спутникового мониторинга транспорта, система мониторинга расхода топлива,  ЭРА-ГЛОНАСС, система мониторинга АЗС, система точного земледелия,  агронавигатор, система контроля давления в шинах, продажа в Вологде и Вологодской области, Архангельск, Кострома, Череповец, Ярославль",
    og_url: "https://vectorm8.ru",
    recaptcha: true,
    yandexMetrica: true
  });
});

router.get('/articles', async (req, res) => {
  const articles = await Article.find().sort('-date');
  res.render('articles/articles', {
    articles: articles,
    title: "Новости. Контроль топлива. Мониторинг транспорта",
    description: "Новости компании Вектор М-8 и рынка мониторинга транспорта.",
    keywords: "Контроль топлива. Спутниковый мониторинг.  GPS. ГЛОНАСС. Мониторинг транспорта",
    og_title: "Новости. Контроль топлива. Мониторинг транспорта",
    og_description: "Новости компании Вектор М-8 и рынка мониторинга транспорта.",
    og_url: "https://vectorm8.ru/articles",
    yandexMetrica: true
  });
});

router.get('/articles/:link', async (req, res) => {
  const article = await Article.findOne({ link: req.params.link });
  if (article === null) res.redirect('/articles');
  res.render('articles/show', {
    article,
    title: article.title,
    og_title: article.title,
    description: article.description,
    og_description: article.description,
    keywords: article.keywords,
    yandexMetrica: true
  })
});

router.get('/gallery', async (req, res) => {
  //const images = await Image.find().sort('-date');
  res.render('gallery', {
    //images: images,
    title: "контроль топлива, установка, обслуживание, переговоры",
    description: "Новости ГЛОНАСС, транспортная телематика, контроль транспорта, контроль топлива",
    keywords: "топливо, ГЛОНАСС, вектор м-8",
    og_title: "контроль топлива, установка, обслуживание, переговоры",
    og_description: "Новости ГЛОНАСС, транспортная телематика, контроль транспорта, контроль топлива",
    og_url: "https://vectorm8.ru/gallery",
    lightgallery: true,
    yandexMetrica: true
  })
});

router.get('/privacy_policy', function (req, res) {
  res.render('privacy_policy', {
    title: "Политика конфиденциальности",
    og_title: "Политика конфиденциальности",
    description: "",
    keywords: "",
    yandexMetrica: true
  })
});

router.get('/user_agreement', function (req, res) {
  res.render('user_agreement', {
    title: "Пользовательское соглашение",
    og_title: "Пользовательское соглашение",
    description: "",
    keywords: "",
    yandexMetrica: true
  })
});

module.exports = router;