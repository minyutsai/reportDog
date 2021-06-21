var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({greeting:'Privet'});
  // res.send({ title: 'Express with nodemon : ' });
});




module.exports = router;
