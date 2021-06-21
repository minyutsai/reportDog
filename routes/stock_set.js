var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
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
router.get('/:stock_number',async function(req, res, next) {
  
  



    var stock_number = req.params.stock_number;
    logger.info(`set / stock_number : ${stock_number}`);


    if (process.platform == 'win32'){
      var chrome_path = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' 
    }else{
      var chrome_path = '/usr/bin/chromium-browser'
    }



    async function puppe() {
  
      const url = `https://s.yimg.com/nb/tw_stock_frontend/scripts/StxChart/StxChart.9d11dfe155.html?sid=${stock_number}`;

 
      console.log(chrome_path)
      const browser = await puppeteer.launch({
        executablePath: chrome_path,
        headless: true
      });
  
      const page = await browser.newPage();
      await page.goto(url);
  
  
      let html = await page.evaluate((h) => {
  
        var current_price = document.querySelector('#highcharts-0 > svg > g:nth-child(38) > text').innerHTML;
        return current_price;
      });
  
  
      return html;
    }
  
  
  
    async function report_dog_yahoo() {
  
      let stock = await puppe();
  
      return stock;
    }
  
  
  
    var bb = await report_dog_yahoo()
    console.log(bb)

    res.json(bb)
  });
  








module.exports = router;
