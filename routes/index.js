var express = require('express');
var router = express.Router();
const axios = require('axios');
const data = require('./consolidate.json');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const { Article } = require('../models/article.js');
require('dotenv').config();
const mailer = require('./mailer');

router.use(bodyParser.json());

//const url = `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//var db = mongoose.connect(url, {useNewUrlParser: true});

const urlencodedParser = bodyParser.urlencoded({extended: false});

let mailSended = undefined;
router.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  mailSended = req.body;
  const message = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADDRESSEE,
    subject: 'new message',
    text: `Новое сообщение от ${mailSended.name}.
    
    ${mailSended.message}
    email: ${mailSended.email}
    телефон: ${mailSended.phone}`
  }
  mailer(message);
  res.redirect('/info');
});

router.get('/info', (req, res) => {
  res.render('emailsended', {
    email: mailSended.email
  })
});

//router.get('/test',
//  (req, res) => Article.find()
//  .exec()
//  .then(articles => res.json(articles)),
//);
//
////роут ниже не рендерит?
//router.get('/article/:linkName',
//  (req, res) => Article.findOne({linkName: req.params.linkName})
//  .exec()
//  .then(docs => res.render('article', {
//    docs
//  })),
//);
//
//
//router.get('/newArticles',
//  (req, res) => Article.find()
//  .exec()
//  .then(articles => {
//    
//    const context = {
//      articles,
//      host: process.env.HOSTNAME,
//      sublink: 'article/',
//      asf: 'asdfasdf'
//    }
//
//    return res.render('newArticles', context)
//  })
//);
//
//router.post('/test',
//  (req, res) => Article.create(req.body)
//  .then(createdArticle => res.json(createdArticle)),
//);
////console.log(db.articles);   //почему undefind?


router.get('/', async function (req, res, next) {
  //const data = await collection.find({}).toArray();
  //console.log(data)
  res.render('index', {
    title: "Вектор М-8.  ГЛОНАСС. Спутниковый мониторинг транспорта. Контроль топлива. ЭРА-ГЛОНАСС. Агронавигатор.",
    description: "система спутникового мониторинга транспорта, система мониторинга расхода топлива,  ЭРА-ГЛОНАСС, система мониторинга АЗС, система точного земледелия,  агронавигатор, система контроля давления в шинах, продажа в Вологде и Вологодской области, Архангельск, Кострома, Череповец, Ярославль",
    keywords: "ГЛОНАСС, спутниковый мониторинг транспорта,  мониторинг транспорта, контроль топлива, ЭРА-ГЛОНАСС, агронавигатор, проблесковый маяк, контроль давления в шинах",
    og_title: "Вектор М-8.  ГЛОНАСС. Спутниковый мониторинг транспорта. Контроль топлива. ЭРА-ГЛОНАСС. Агронавигатор.",
    og_description: "система спутникового мониторинга транспорта, система мониторинга расхода топлива,  ЭРА-ГЛОНАСС, система мониторинга АЗС, система точного земледелия,  агронавигатор, система контроля давления в шинах, продажа в Вологде и Вологодской области, Архангельск, Кострома, Череповец, Ярославль",
    og_url: "https://vectorm8.ru"
  })
});

router.get('/register', function (req, res) {
  res.render('register');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/gallery', function (req, res) {
  res.render('gallery', {
    title: "контроль топлива, установка, обслуживание, переговоры",
    description: "Новости ГЛОНАСС, транспортная телематика, контроль транспорта, контроль топлива",
    keywords: "топливо, ГЛОНАСС, вектор м-8",
    og_title: "контроль топлива, установка, обслуживание, переговоры",
    og_description: "Новости ГЛОНАСС, транспортная телематика, контроль транспорта, контроль топлива",
    og_url: "https://vectorm8.ru/gallery"
  })
});

router.get('/articles', function(req, res) {
  res.render('articles', {
    title: "Новости. Контроль топлива. Мониторинг транспорта",
    description: "Новости компании Вектор М-8 и рынка мониторинга транспорта.",
    keywords: "Контроль топлива. Спутниковый мониторинг.  GPS. ГЛОНАСС. Мониторинг транспорта",
    og_title: "Новости. Контроль топлива. Мониторинг транспорта",
    og_description: "Новости компании Вектор М-8 и рынка мониторинга транспорта.",
    og_url: "https://vectorm8.ru/articles"
  });
});

router.get('/privacy_policy', function(req, res) {
  res.render('privacy_policy', {
    title: "Политика конфиденциальности",
    og_title: "Политика конфиденциальности",
    description: "",
    keywords: ""
  })
});

router.get('/user_agreement', function(req, res) {
  res.render('user_agreement', {
    title: "Пользовательское соглашение",
    og_title: "Пользовательское соглашение",
    description: "",
    keywords: ""
  })
});

router.get('/signin', function (req, res) {
  res.render('signin');
});

//router.get('/table', function (req, res) {
//  
//  res.render('table', {
//    rows: data.results.rows,
//    
//  });
//  console.log(data.results.rows.length);
//});


/*router.post('/refresh', function (req, res) {
  const jwt = req.body.jwt;
  console.log(jwt);
  res.send(`
  <html>
    <body>
      <h2>${jwt}</h2>
    </body>
  </html>`);
});*/

//router.post('/login', async function (req, res) {
//  const { login, password } = req.body;
//
//  const data = await axios.post('http://online.omnicomm.ru/auth/login?jwt=1', { login, password });
//
//  const jwt = data.data.jwt;
//
//  //Promise.all([без await все что после])
//
//  let instance = await axios.create({headers: {
//    "Authorization": "JWT " + jwt
//  }}, {body:  {
//    "ids": [
//      202000295,
//      281001458,
//      303006856,
//      303013239,
//      303013240,
//      336014678,
//      336015445,
//      336017875,
//      336017876,
//      336017878,
//      336017879,
//      336017880,
//      336017881,
//      336017882,
//      336017883,
//      336017884,
//      336017898,
//      336020428,
//      336022384,
//      336026783,
//      336027062,
//      336027497,
//      336027600,
//      336027879,
//      336027880,
//      336027881,
//      336027898,
//      336027900,
//      336027901,
//      336030037,
//      336030046,
//      336032468,
//      369005017,
//      369005066,
//      369005069
//    ],
//    "parseAddress": false
//  }});
//
//  const vehiclesActivity = await instance.post('https://online.omnicomm.ru/ls/api/v1/activity/vehicles');
//  try {
//    let activity = vehiclesActivity.data;
//    console.log(activity);
//  } catch (error) {
//    console.log(error);
//  }
//
//  /*const geozoneData = await instance.get('https://online.omnicomm.ru/api/service/geozones/geozones?pageSize=200');
//  try {
//    someZone = geozoneData.data.rows[20];
//    router.get('/geozones', function(req, res) {
//      
//      res.render('geozones',  {name: someZone.name, id: someZone.id, pointID: someZone.points[0].pointID, latitude: someZone.points[0].latitude, longitude: someZone.points[0].longitude});
//      console.log(someZone);
//    });
//  } catch (err) {
//    console.log(err);
//  }*/
//  });

  
  /*
  //этот код работает, но попробуем сделать лучше
  axios.post('http://online.omnicomm.ru/auth/login?jwt=1', {login, password})
  .then((data) => {
    res.send(`${data}`);
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
  */

module.exports = router;