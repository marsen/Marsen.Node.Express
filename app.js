var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');

var app = express();
//redirect domain to www.domain
app.all(/.*/, function(req, res, next) {
  consolo.log("\r\n app is :"+req.app);
  consolo.log("\r\n baseUrl is :"+req.baseUrl);  
  consolo.log("\r\n body is :"+req.body);
  consolo.log("\r\n cookies is :"+req.cookies);
  consolo.log("\r\n fresh is :"+req.fresh);
  consolo.log("\r\n hostname is :"+req.hostname);
  consolo.log("\r\n ip is :"+req.ip);
  consolo.log("\r\n ips is :"+req.ips);
  consolo.log("\r\n method is :"+req.method);
  consolo.log("\r\n originalUrl is :"+req.originalUrl);
  console.log("\r\n params is :"+req.params);
  console.log("\r\n path is :"+req.path);
  console.log("\r\n protocol is :"+req.protocol);
  console.log("\r\n query is :"+req.query);
  console.log("\r\n route is :"+req.route);    
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, './public')));

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
