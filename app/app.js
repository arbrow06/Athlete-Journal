var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var http = require('http');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var errorHandler = require('express-error-handler');

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });

app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.use(cookieParser('VkonWr2p7c'));
app.use(session());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//for development
app.use(errorHandler({ dumpExceptions: true, showStack: true }));


//for production
//app.use(errorHandler());


// Configure passport
var Athlete = require('./models/athlete');

passport.use(new LocalStrategy(Athlete.authenticate()));

passport.serializeUser(Athlete.serializeUser());
passport.deserializeUser(Athlete.deserializeUser());

// Connect mongoose
mongoose.connect('mongodb://admin_andrew:VkonWr2p7c@ds029950.mongolab.com:29950/athletejournal');

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
