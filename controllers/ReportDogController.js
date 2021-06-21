const puppeteer = require('puppeteer');
const $ = require('cheerio')
const CronJob = require('cron').CronJob;


function get_stock_price(num){
   
    let a = num + 10;

    return 'BBC'+a;
}




function show_price(){

    let stock = {name:123330,price:534}

    return stock;
}


const abc_fun= (req, res, next)=>{
    
    res.json(req.params.con)
}


module.exports = {
    get_stock_price : get_stock_price,
    abc_fun,
}