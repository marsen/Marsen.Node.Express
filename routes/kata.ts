import * as core from "express-serve-static-core";
var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', (req:core.Request, res:core.Response, next:core.NextFunction)=> {
  res.render('kata/index', { title: 'KATA!!' });
});
router.get('/todo', (req:core.Request, res:core.Response, next:core.NextFunction)=> {
  res.render('kata/todo', { title: 'todo' });
});



module.exports = router;