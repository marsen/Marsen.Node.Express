var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('kata/index', { title: 'KATA!!' });
});
router.get('/todo', function(req, res, next) {
  res.render('kata/todo', { title: 'todo' });
});



module.exports = router;