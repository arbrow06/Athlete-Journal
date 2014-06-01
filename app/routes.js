 var passport = require('passport'),
    Athlete = require('./models/athlete');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { user : req.user, title : "Home" });
    });

    app.get('/register', function(req, res) {
        res.render('register', { });
    });

    app.post('/register', function(req, res) {
            Athlete.register(new Athlete({
            username: req.param('username'),
            firstName: req.param('firstName'),
            lastName: req.param('lastName'),
            dob: req.param('dob')
        }), req.param('password'), function(err, athlete) {
            if (err) {
                console.log(err);
                return res.render('register');
            }    
            res.redirect('/');
        });
    });

    app.get('/login', function(req, res) {
        res.render('login', { user : req.user });
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    app.get('/logout', function(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });
    app.get('/resources', function(req, res) {
        res.render('resources', { title: 'Resources Page' });
    }); //show dynamic     resources page
};


    


/*When Logged In
    all these gets and posts for db manipulation and presentation.
*/
