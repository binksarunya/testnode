// exports.login = function(req, res){
//    console.log(req.body);
//    console.log('Email: ' + req.body.email);
//    console.log('Password: ' + req.body.password);

//    res.render('index', {
//        title: 'Logged in as ' + req.body.email,
//        isLoggedIn: true
//    });

var User = require('mongoose').model('User');

exports.create = function (req, res, next) {
    var user = new User(req.body);

    user.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if(err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};


exports.login = function (req, res) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();


    if (req.body.remember === 'remember') {
        req.session.remember = true;
        req.session.email = req.body.email;
        req.session.cookie.maxAge = 60000;   // milliseconds
    }

    res.render('index', {
        title: 'Logged in as ' + req.body.email,
        isLoggedIn: true
    });


};

exports.logout = function (req, res) {
    req.session = null;

    res.render('index', {
        title: 'See you again later',
        isLoggedIn: false
    });
};