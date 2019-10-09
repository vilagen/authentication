const Authentication = require('./Contollers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false });
// session is 'false' because passport tries to make a cookie based session,
// but we will use a jwt session instead.

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signup', Authentication.signup)
}