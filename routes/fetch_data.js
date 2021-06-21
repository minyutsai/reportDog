var express = require('express');
var router = express.Router();
var cors = require('cors')
const puppeteer = require('puppeteer');
const winston = require('winston');
const { createLogger, transports ,format } = require('winston');
const $ = require('cheerio')
const CronJob = require('cron').CronJob;

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



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
 

// console.log(process.memoryUsage() )

router.post('/', cors(corsOptions) , async function (req, res, next) {
	console.log('aaaaaaaaaaaaaaaaaaaa');

  var stock_number = req.body.stock_number
  logger.info(`autoRefresh stock_number : ${stock_number}`);

  if (process.platform == 'win32'){
    var chrome_path = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' 
  }else{
    var chrome_path = '/usr/bin/chromium-browser'
  }

  console.log('chrome_path : '+chrome_path)



  async function report_dog() {
    
    const url = `https://s.yimg.com/nb/tw_stock_frontend/scripts/StxChart/StxChart.9d11dfe155.html?sid=${stock_number}`;

    const browser = await puppeteer.launch({
      executablePath: chrome_path,
      headless: true
    });

    const page = await browser.newPage();
    await page.goto(url);


    let html = await page.evaluate((h) => {

      var g_tag = document.querySelectorAll('g')
      var current_price = g_tag[38].children[0].innerHTML;
      var ups_downs = g_tag[46].children[0].innerHTML;

      var data = {current_price , ups_downs}
     
      return data;
    });

    // page.removeAllListeners()
    browser.close()
  

    return html;
  }


  async function report_dog2() {
    
    const url = `https://s.yimg.com/nb/tw_stock_frontend/scripts/TseChart/TseChart.eb1b267900.html?sid=TSE`;

    const browser = await puppeteer.launch({
      executablePath: chrome_path,
      headless: true
    });

    const page = await browser.newPage();
    await page.goto(url);


    let html = await page.evaluate((h) => {

      var current_price = document.querySelectorAll('tspan')[0].innerHTML
      var ups_downs = document.querySelectorAll('text')[3].innerHTML

      var data = {current_price, ups_downs}
     
      return data;
    });

    // page.removeAllListeners()
    browser.close()
  

    return html;
  }





  var stock = await report_dog()
  var stock2 = await report_dog2()

  res.json([stock,stock2])
});


module.exports = router;
