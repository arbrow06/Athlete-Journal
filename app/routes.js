 var passport = require('passport'),
    Athlete = require('./models/athlete');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { user : req.user });
    });

    app.get('/register', function(req, res) {
        res.render('register', { });
    });

    app.post('/register', function(req, res) {
        Athlete.register(new Athlete({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account : account });
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
        req.logout();
        res.redirect('/');
    });
    app.get('/resources', function(req, res) {
        res.render('index', { title: 'Resources Page' });
    });
};

/
app.use('/resources', resources); //show dynamic     resources page


/*When Logged In
    all these gets and posts for db manipulation and presentation.
*/
