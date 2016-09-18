var express = require('express');
var router = express.Router();

//redirect domain to www.domain
router.all(/.*/, function(req, res, next) {
  var host = req.hostname;
  console.log(host);

  res.render('index', { title: host });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
