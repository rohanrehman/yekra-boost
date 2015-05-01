var express = require('express'),
  path = require('path'),
    logger = require('morgan'),
cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser');

var signup = require('./routes/signup');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//if (app.get('env') === 'development') {
//  // This will change in production since we'll be using the dist folder
//  app.use(express.static(path.join(__dirname, '../public')));
//  // This covers serving up the index page
//  app.use(express.static(path.join(__dirname, '../public/app')));
//
//  // Error Handling
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}

//if (app.get('env') === 'production') {
//
//  // changes it to use the optimized version for production
//  app.use(express.static(path.join(__dirname, '/dist')));
//
//  // production error handler
//  // no stacktraces leaked to user
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: {}
//    });
//  });
//}

//app.get('/', routes.index);
app.get('*', function(req, res) {
  res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
  // res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/signup', signup);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	// log a message to console!
});

module.exports = app;
