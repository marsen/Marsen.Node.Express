import * as core from "express-serve-static-core";
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req:core.Request, res:core.Response, next:core.NextFunction)=> {
  res.render('index', { title: 'Welcomm To 3arsen ' });
});

module.exports = router;
