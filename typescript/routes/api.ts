var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/', function(req, res, next) {
  var phares =
  [ 'Life without a friend is death.',
    'Kings go mad， and the people suffer for it.',
    'Action speak louder than words.',
    'Bad times make a good man.',
    'Sharp tools make good work.',
    'Never put off what you can do today until tomorrow'           
             ];
  //取亂數           
  //todo 抽離為共用元件，必要時寫測試             
  var randex = ~~((phares.length-0) * Math.random())+0 ;
  console.log("random number is : " + randex);           
  res.send(phares[randex]);
});

router.param(['id', 'url'], function (req, res, next, value) {
  console.log('CALLED ONLY ONCE with', value);
  next();
});

router.post('/note', function(req, res, next) {
  
  res.send("/note " + req.body.url);
});

module.exports = router;