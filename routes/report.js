var express = require('express');
var router = express.Router();
var ReportDogController = require('../controllers/ReportDogController')
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



// router.get('/:con', ReportDogController.abc_fun);

/* GET users listing. */
router.get('/:stock', function (req, res, next) {


  var stock_number = req.params.stock;
  var stock_price = ' ';
  logger.info(`stock_number : ${stock_number}`);

  res.render('report', { stock_number: stock_number, stock_price: stock_price });
});




module.exports = router;
