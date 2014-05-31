var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var register = require('./routes/register');
var resources = require('./routes/resources');
var signin = require('./routes/signin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}var path = require('path'),
    express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser('VkonWr2p7c'));
app.use(express.session());

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Configure passport
var Athlete = require('./models/athlete');

passport.use(new LocalStrategy(Athlete.authenticate()));

passport.serializeUser(Athlete.serializeUser());
passport.deserializeUser(Athlete.deserializeUser());

// Connect mongoose
mongoose.connect('mongodb://admin_andrew:<VkonWr2p7c>@ds029950.mongolab.com:29950/athletejournal');

// Setup routes
require('./routes')(app);

http.createServer(app).listen(3000, '127.0.0.1', function() {
    console.log("Express server listening on %s:%d in %s mode", '127.0.0.1', 3000, app.settings.env);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
