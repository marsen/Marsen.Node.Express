"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Welcomm To 3arsen ' });
});
module.exports = router;
