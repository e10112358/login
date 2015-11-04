var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

//API key authentication
var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: '/Users/Crystal/Desktop/login/apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/10aePtwxkNLEStuvH4ErsY',
  secretKey: 'asdfghjklzxcvbnm',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
app.use('/profile',stormpath.loginRequired,require('./profile')());
app.listen(3000);