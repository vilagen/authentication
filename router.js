const Authentication = require('./Contollers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false });
// session is 'false' because passport tries to make a cookie based session,
// but we will use a jwt session instead.\
const requireSignin = passport.authenticate('local', {session:false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}