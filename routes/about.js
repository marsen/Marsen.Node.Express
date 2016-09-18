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

/* GET about page. */
router.get(['/','/me'], function(req, res, next) {
  res.render('about/me', { title: '關於我' });
});

router.get('/site', function(req, res, next) {
  var host = req.hostname;
  console.log(host);
  res.render('about/site', { title: '關於本站' });  
});

module.exports = router;
