var express = require('express');
var router = express.Router();
const axios = require('axios');
const data = require('./consolidate.json');

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

router.get('/register', function (req, res) {
  res.render('register');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/gallery', function (req, res) {
  res.render('gallery');
});

router.get('/articles', function(req, res) {
  res.render('articles');
});

router.get('/privacy_policy', function(req, res) {
  res.render('privacy_policy');
});

router.get('/user_agreement', function(req, res) {
  res.render('user_agreement');
});

router.get('/table', function (req, res) {
  
  res.render('table', {
    rows: data.results.rows,
    
    /*
    name: data.results.rows[0].vehicleName,
    mileage: String(data.results.rows[0].mileage),
    idlingRPM: data.results.rows[0].idlingRPM,
    excessRPM: data.results.rows[0].excessRPM,
    fuelConsumption: data.results.rows[0].fuelConsumption,
    dutyConsumptionMH: data.results.rows[0].dutyConsumptionMH,
    mileageSpeeding: data.results.rows[0].mileageSpeeding,
    univInputOnTime: data.results.rows[0].univInputOnTime,
    */
  });
  console.log(data.results.rows.length);
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

router.get('/main', function(req, res) {
  res.render('main', {
    title: 'Vector M-8'
  });
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

  //Promise.all([без await все что после])

  let instance = await axios.create({headers: {
    "Authorization": "JWT " + jwt
  }}, {body:  {
    "ids": [
      202000295,
      281001458,
      303006856,
      303013239,
      303013240,
      336014678,
      336015445,
      336017875,
      336017876,
      336017878,
      336017879,
      336017880,
      336017881,
      336017882,
      336017883,
      336017884,
      336017898,
      336020428,
      336022384,
      336026783,
      336027062,
      336027497,
      336027600,
      336027879,
      336027880,
      336027881,
      336027898,
      336027900,
      336027901,
      336030037,
      336030046,
      336032468,
      369005017,
      369005066,
      369005069
    ],
    "parseAddress": false
  }});

  const vehiclesActivity = await instance.post('https://online.omnicomm.ru/ls/api/v1/activity/vehicles');
  try {
    let activity = vehiclesActivity.data;
    console.log(activity);
  } catch (error) {
    console.log(error);
  }

  /*const geozoneData = await instance.get('https://online.omnicomm.ru/api/service/geozones/geozones?pageSize=200');
  try {
    someZone = geozoneData.data.rows[20];
    router.get('/geozones', function(req, res) {
      
      res.render('geozones',  {name: someZone.name, id: someZone.id, pointID: someZone.points[0].pointID, latitude: someZone.points[0].latitude, longitude: someZone.points[0].longitude});
      console.log(someZone);
    });
  } catch (err) {
    console.log(err);
  }*/
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