var express = require('express');
var router = express.Router();

//redirect domain to www.domain
router.all(/.*/, function(req, res, next) {
  var host = req.hostname;
  console.log(host);

  if (host.match(/^www\..*/i)) {
    next();
  } else {
    res.redirect(301, "http://www." + host);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
