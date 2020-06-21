const express = require('express');

const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res) {
    res.send(`
    <html>
      <body>
        <h1>Main page</h1>
        <a href="/about">About</a>
        <form method="POST" action="/register">
          <input type="text" name="firstname" />
          <input type="submit" value="register" />
        </form>
      </body>
    </html>`);
});

app.post('/register', function(req, res) {

    //var database = db.connect('asdfasdf')
    //const data = database.query('SELECT * FROM TABLE "asdf";')

    const data = [
        'Ivan',
        'Danil',
        'Vlada',
        'Tema'
    ]

    let resultString = ""

    data.forEach(element => {
        resultString += `<li>${element}</li>`
    });

    res.send(`
      <html>
        <body>
          <h1>Success</h1>
          <h2>POST: ${req.body.firstname}</h2>
          <ul>
          express --view=pug myapp
          </ul>
        </body>
      </html>`);
});

app.get('/about', function(req, res) {
    res.send(`
    <html>
      <body>
        <h1>Stuff</h1>
      </body>
    </html>`);
});

app.listen(5000, function() {
    console.log('Example app listening on port 5000!');
});