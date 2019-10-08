const Authentication = require('./Contollers/authentication')

module.exports = function(app) {
    app.post('/signup', Authentication.signup);
}