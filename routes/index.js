var express = require('express');
var router = express.Router();
const axios = require('axios');

const MongoClient = require("mongodb").MongoClient;

//const url = "mongodb://localhost:27017/";
//const mongoClient = new MongoClient(url, { useNewUrlParser: true });

/*mongoClient.connect(function(err, client) {
    const db = client.db("news_db");
    const collection = db.collection("news");

    
    
});*/

router.get('/', async function (req, res, next) {
  //const data = await collection.find({}).toArray();
  //console.log(data)
  res.render('index', {
    ivan: 'Ivan',
    //news: data
  });
});

router.get('/signin', function (req, res) {
  res.render('signin');
});

router.get('/contacts', function (req, res) {
  res.render('contacts');
});

router.get('/about', function (req, res) {
  res.render('about', {
    title: 'about'
  })
});

router.post('/login', function (req, res) {
  let login = req.body.login;
  let password = req.body.password;
  res.send(`
  <html>
    <head>
      <link rel='stylesheet' href='/stylesheets/style.css' />
    </head>
    <body>
      <h2>login: ${login}</h2>
      <h2>password: ${password}</h2>
    </body>
  </html>`);
});

module.exports = router;