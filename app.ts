import * as express from 'express' ;
import * as path from 'path' ;
import * as logger from 'morgan' ;
import * as cookieParser from 'cookie-parser' ;
import * as bodyParser from 'body-parser' ;
var routes = require('./routes/index');
var kata = require('./routes/kata');
var spiritlog = require('./routes/spiritlog');
var api = require('./routes/api');
var about = require('./routes/about');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './public')));

app.use('/', routes);
app.use('/kata', kata);
app.use('/spiritlog', spiritlog);
app.use('/about', about);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err: any;
  err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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