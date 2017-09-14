var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var plugins = {
    index:  './routes/index',
    system: './routes/system/index',
    images: './routes/images/index',
    volume: './routes/volume/index',
    ps: './routes/ps/index',
    network: './routes/network/index',
    rm: './routes/rm/index',
    rmi: './routes/rmi/index',
    stop: './routes/stop/index',
    pause: './routes/pause/index',
    run: './routes/run/index',
    unpause: './routes/unpause/index',
    restart: './routes/restart/index'
};

var load_plugin = {};
for (var key in plugins) {
    if (plugins.hasOwnProperty(key)) {
        console.log('Loading Plugins: '+ key + "\n");
        load_plugin[key] = require(plugins[key]);
    };
}

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

app.use('/', load_plugin['index']);
app.use('/font', express.static(__dirname + '/node_modules/open-iconic/font'));
for (var key in load_plugin) {
    if (key === 'index') { continue };
    if (load_plugin.hasOwnProperty(key)) {
        console.log('Hooking Plugins: '+ key + "\n");
        app.use('/docker/'+key, load_plugin[key]);
    }
}

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
