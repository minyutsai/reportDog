var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.json({GET:'this is GET jsontest'});
  // res.send({ title: 'Express with nodemon : ' });
});

router.post('/', function(req, res, next) {

  res.json({POST:'this is POST jsontest'});
  // res.send({ title: 'Express with nodemon : ' });
});


module.exports = router;
