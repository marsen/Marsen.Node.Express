import * as core from 'express-serve-static-core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
var router = express.Router();

router.get('/', (req:core.Request, res:core.Response, next:core.NextFunction)=> {
  var phares =
  [ 'Life without a friend is death.',
    'Kings go mad， and the people suffer for it.',
    'Action speak louder than words.',
    'Bad times make a good man.',
    'Sharp tools make good work.',
    'Never put off what you can do today until tomorrow'           
             ];
  //取亂數           
  //todo 抽離為共用元件，必要時寫測試             
  var randex = ~~((phares.length-0) * Math.random())+0 ;
  console.log("random number is : " + randex);           
  res.send(phares[randex]);
});

// http://expressjs.com/en/api.html
// router.param(['id', 'url'], (req:core.Request, res:core.Response, next:core.NextFunction,value:any)=> {
//   console.log('CALLED ONLY ONCE with', value);
//   next();
// });

router.post('/note', (req:core.Request, res:core.Response, next:core.NextFunction)=>{
  
  res.send("/note " + req.body.url);
});

module.exports = router;