var express = require('express');
var router = express.Router();
var phrases = ['aa','bb'];
/* GET about page. */
router.get('/', function(req, res, next) {
  res.send('aa');
});



module.exports = router;