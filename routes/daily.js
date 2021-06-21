var express = require('express');
var router = express.Router();
var DailyController = require('../controllers/DailyController')
const winston = require('winston');
const { createLogger, transports ,format } = require('winston');
// var logger = new winston.Logger();
const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Taipei'
  });
};



const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),

  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

logger.exceptions.handle(
  new transports.File({ filename: './logs/exceptions.log' })
);


/* GET users listing. */
router.get('/create', DailyController.create_daily)
router.post('/save',  DailyController.save_daily)
router.post('/test',  function(req,res,next){
  console.log(req.body.first)
 

  
  res.render('daily/test.ejs', {name:'ab52354ddcc'})
  next()


},function(req,res,next){
  for(let i=0; i<30000; i++){
    console.log(i)
  
  }
 
},function(req,res,next){
  console.log(5555)
})


module.exports = router;
