const request = require('request');

module.exports = function (req, res, next) {

  if (!req.body || !req.body['g-recaptcha-response']) {
    console.log('Error: No recaptcha passed.' );
    return res.send('Error: No recaptcha passed.');
  }

  request.post({
    url:'https://www.google.com/recaptcha/api/siteverify',
    form: {
      key:'value',
      secret: process.env.RECAPTCHA_SECRET,
      response: req.body['g-recaptcha-response']
    }
  }, function(err, httpResponse, body){
    const data = JSON.parse(body);
    if (err || !data || !data.success) {
      console.log('Error: Google error.');
      return res.send('Error: No recaptcha passed.');
    }
    
    next();
  })
}