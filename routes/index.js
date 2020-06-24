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

router.post('/refresh', function(req, res) {
  const jwt = req.body.jwt;
  res.send(`
  <html>
    <body>
      <h2>${jwt}</h2>
    </body>
  </html>`);
});

router.post('/login',async function(req, res) {
  const { login, password } = req.body;
  
  const data = await axios.post('http://online.omnicomm.ru/auth/login?jwt=1', {login, password});

  const jwt = await axios.post('/refresh', {jwt, refresh});

  console.log(data);
  console.log(jwt);
  /*
  этот код работает, но попробуем сделать лучше
  axios.post('http://online.omnicomm.ru/auth/login?jwt=1', {login, password})
  .then((data) => {
    res.send(`${data}`);
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
  */
});

module.exports = router;