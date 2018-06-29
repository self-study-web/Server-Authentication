const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// authenticate using jwt strategy, and if user is authenticated dont crete a session.
// by default passprt will create a cookie based session for the request,
// we dont need the session as we are using tokens
const requireAuth = passport.authenticate('jwt', { session: false } );
const requireSignin = passport.authenticate('local', {session: false });


module.exports = function(app) {

    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'});
    });
    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup);
    // app.get("/", function(req, res, next){
    //     res.send(['Hello','World']);
    // });
    // req - incoming http request
    // res - response which we are sending back
    // next - for error handling
}