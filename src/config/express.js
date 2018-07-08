var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
//var cookieSession = require('cookie-session');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('./config');
//var mongoose = require('mongoose');
//var uri = 'mongodb://localhost/my-project';
//var db = mongoose.connect(uri);

var path = require('path');

module.exports = function () {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(compression);
    }

    //   app.use(cookieSession({
    //      name: 'session',
    //      keys: ['secret_key1', 'secret_key2']
    //   }));
    app.use(session({
         secret: config.sessionSecret,
         resave: false,
         saveUninitialized: true
    }));
    // Middlewear
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(validator());



    app.set('views', './src/app/views');
    app.set('view engine', 'jade');

    require('../app/routes/index.routers')(app);
    require('../app/routes/user.routes')(app);

    app.use(sass({
        src: './sass',
        dest: './public/css',
        outputStyle: 'compressed',
        prefix: '/css',
        debug: true
    }));

    app.use(express.static(path.join(__dirname, 'public')));
    return app;
};