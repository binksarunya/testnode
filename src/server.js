process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();

/*app.use( function(req, res, next) {
   // Middlewear
   res.setHeader('Content-Type', 'text-plain');
   res.end('Hello Bink');
});*/


/*var logger = function(req, res, next) {
    console.log(req.method, req.url);

    next();
}; 

var helloWorld = function(req, res, next) {
   /*res.setHeader('Content-Type', 'text-plain');
   res.end('Hello Bink');*

   res.send('Hello Bink');
};

var goodbyeWorld  =function(req, res, next) {
   res.setHeader('Content-Type', 'text-plain');
   res.end('Goodbye');
};




/*app.use(logger);
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);*

app.use('/', helloWorld);*/

app.listen(3000);
module.exports = app;

console.log('Server running.. port3000');

