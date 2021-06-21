var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan')
var path = require('path')
const winston = require('winston');
const { createLogger, transports } = require('winston');
const { render } = require('ejs');
const CronJob = require('cron').CronJob

var app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

logger.exceptions.handle(
  new transports.File({ filename: './logs/exceptions.log' })
);




// view engine setup
app.use(bodyParser.json())
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })


app.use('/', require('./routes/index'));
app.use('/daily', require('./routes/daily'))
app.use('/api/report', require('./routes/report'));
app.use('/api/fetch_data', require('./routes/fetch_data'));
app.use('/set', require('./routes/stock_set'));
app.use('/api/jsontest', require('./routes/jsontest'));
// app.use('/users', require('./routes/users'));



// var job = new CronJob('*/5 * * * * *', function () {
//   console.log('cron start 5s')
//   app.use('/fetch_data', require('./routes/fetch_data'));
// }, null, true, 'America/Los_Angeles');
// job.start();




// catch 404 and forward to error handler
app.use(function (req, res, next) {



  // res.status(404).send('hi there');
  next(createError(404));
});







// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('*****************' + err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
