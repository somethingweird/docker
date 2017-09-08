var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var images = require('./routes/images/index');
var volume = require('./routes/volume/index');
var process = require('./routes/ps/index');
var network = require('./routes/network/index');
var rm = require('./routes/rm/index');
var stop = require('./routes/stop/index');
var pause = require('./routes/pause/index');
var run = require('./routes/run/index');
var restart = require('./routes/restart/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/font', express.static(__dirname + '/node_modules/open-iconic/font'));
app.use('/docker/images', images);
app.use('/docker/volume', volume);
app.use('/docker/ps', process);
app.use('/docker/network', network);
app.use('/docker/rm', rm);
app.use('/docker/stop', stop);
app.use('/docker/pause', pause);
app.use('/docker/run', run);
app.use('/docker/restart', restart);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
