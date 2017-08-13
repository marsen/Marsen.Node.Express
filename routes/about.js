import * as express from 'express';
var router = express.Router();
/* GET about page. */
router.get(['/', '/me'], (req, res, next) => {
    res.render('about/me', { title: '關於我' });
});
router.get('/site', (req, res, next) => {
    var host = req.hostname;
    console.log(host);
    res.render('about/site', { title: '關於本站' });
});
module.exports = router;
