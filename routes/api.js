var express = require('express');
var router = express.Router();
//var phares = require('./utils/phares');
/* GET about page. */
router.get('/', function(req, res, next) {
  var phares =
 [  'Life without a friend is death.',
    'Kings go mad， and the people suffer for it.',
    'Action speak louder than words.',
    'Bad times make a good man.',
    'Sharp tools make good work.',
    'Never put off what you can do today until tomorrow'           
             ];
  var randex = ~~((phares.length-0) * Math.random())+0 ;
  console.log("random number is : " + randex);           
  res.send(phares[randex]);
});



module.exports = router;