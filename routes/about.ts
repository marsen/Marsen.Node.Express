import * as core from "express-serve-static-core";
import * as express from 'express' ;
var router = express.Router();

/* GET about page. */
router.get(['/','/me'], (req:core.Request, res:core.Response, next:core.NextFunction)=> {
  res.render('about/me', { title: '關於我' });
});

router.get('/site', (req:core.Request, res:core.Response, next:core.NextFunction)=> {
  var host = req.hostname;
  console.log(host);
  res.render('about/site', { title: '關於本站' });  
});

module.exports = router;
