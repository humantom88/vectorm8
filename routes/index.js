var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;

//const url = "mongodb://localhost:27017/";
//const mongoClient = new MongoClient(url, { useNewUrlParser: true });

/*mongoClient.connect(function(err, client) {
    const db = client.db("news_db");
    const collection = db.collection("news");

    
    
});*/

router.get('/', async function(req, res, next) {
  //const data = await collection.find({}).toArray();
  //console.log(data)
  res.render('index', {
      ivan: 'Ivan',
      //news: data
  });
});

router.get('/dashboard', function(req, res) {
    res.render('ivan')
})

router.get('/contacts', function(req, res) {
    res.render('contacts', {
        number: '8999666',
    });
})

router.get('/about', function(req, res) {
    res.render('about', {
        title: 'about'
    })
})

router.get('/vue', function(req, res) {
    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/stylesheets/style.css' />
        </head>
        <body>
          <div id="app">
            {{ message }}
          </div>
          <div id="app-2">
            <span v-bind:title="message">
              Hover your mouse over me for a few seconds
              to see my dynamically bound title!
            </span>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/vue"></script>
          <script>
          var app = new Vue({
            el: '#app',
            data: {
              message: 'Hello Vue!'
            }
          })

          var app2 = new Vue({
            el: '#app-2',
            data: {
              message: 'You loaded this page on ' + new Date().toLocaleString()
            }
          })
          </script>
        </body>
      </html>`)
})

router.post('/registration', function(req, res) {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const middlename = req.body.middlename
    const fruits = req.body.fruits

    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/stylesheets/style.css' />
        </head>
        <body>
          <h1>${firstname}</h1>
          <h1>${lastname}</h1>
          <h1>${middlename}</h1>
          <h1>${fruits}</h1>
        </body>
      </html>`)
})

module.exports = router;