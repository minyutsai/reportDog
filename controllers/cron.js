const puppeteer = require('puppeteer');
const $ = require('cheerio')
const CronJob = require('cron').CronJob;
const greeting = "privet broker";


// function current_price() {

//   var result = 'Current price';
//   // console.log(result)

//   return result;

// }
// const winston = require('winston');
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [

//     new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
//     new winston.transports.File({ filename: './logs/combined.log' }),
//   ],
// });

// function buy_call(in_price) {

//   var result = 'Buy it at ' + in_price;
//   // console.log(result)
//   logger.log({
//     message: 'test cron log',
//     level: 'info'
//   })
//   return result;

// }


// function sell_call() {

//   var result = 'Sell it Now!!';
//   // console.log(result)

//   return result;

// }





// async function report_dog() {

//   const url = 'https://s.yimg.com/nb/tw_stock_frontend/scripts/StxChart/StxChart.9d11dfe155.html?sid=3189';

//   const browser = await puppeteer.launch({
//     executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
//     //   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',      =>for linux
//     headless: true
//   });

//   // const page = await puppeteer.newPage();
//   const page = await browser.newPage();
//   await page.goto(url);

//   let html = await page.evaluate((h) => {
//     var iframe = document.querySelector('#StxChart')
//     var current_price = iframe.children[0].children[0].children[37].children[0].innerHTML
//     return current_price;
//   });

//   console.log(`3189成交 : ${html}`)

//   // await page.setViewport({ width: 1920, height: 1080 })
//   // await page.screenshot({ path: 'realTimeStockPrice.png' });
//   await browser.close();
//   console.log('dog away')

//   return html;
// }


// async function configureBroswer() {

//   const url = 'https://tw.stock.yahoo.com/us/q?stock_id=^DJI';

//   const browser = await puppeteer.launch({
//     executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
//     //   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',      =>for linux
//     headless: true
//   });

//   const page = await browser.newPage();
//   await page.goto(url);

//   return page;
// }


// async function checkPrice(page){

//   await page.reload();
//   let html = await page.evaluate((h) => {
//     var current_price = document.querySelector('body > center > center > table:nth-child(2) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > font').innerHTML
//     return current_price;
//   });

//   console.log(html);
//   console.log('send Line message alert')
//   // return html;
// }



// async function report_dog_yahoo(){
//   let page = await configureBroswer();
 
//   var job = new CronJob('*/10 * * * * *', function() {
//       checkPrice(page);
//   }, null, true, 'America/Los_Angeles');
//   job.start();

//   return ;
// }





// module.exports = {
//   in_price,
//   greeting,
//   report_dog_yahoo: report_dog_yahoo(),
//   report_dog: report_dog(),
//   current_price: current_price(),
//   buy_call: buy_call(in_price),
//   sell_call: sell_call(),
// };




