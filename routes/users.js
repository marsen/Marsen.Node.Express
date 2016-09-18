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


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
