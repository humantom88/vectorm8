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
  res.render('index');
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

router.post('/login', async function (req, res) {
  const { login, password } = req.body;

  const data = await axios.post('http://online.omnicomm.ru/auth/login?jwt=1', { login, password });

  const jwt = data.data.jwt;

  let instance = await axios.create({headers: {
    "Authorization": "JWT " + jwt
  }});

  const geozoneData = await instance.get('https://online.omnicomm.ru/api/service/geozones/geozones?pageSize=200');
  try {
    someZone = geozoneData.data.rows[20];
    router.get('/geozones', function(req, res) {
      
      res.render('geozones',  {name: someZone.name, id: someZone.id, pointID: someZone.points[0].pointID, latitude: someZone.points[0].latitude, longitude: someZone.points[0].longitude});
      console.log(someZone);
    });
  } catch (err) {
    console.log(err);
  }
  });

  
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