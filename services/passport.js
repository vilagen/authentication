const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

// Create Local strategy
const localOptions = { usernameField: 'email'}; // by default, local strategy looks for username, not email.
const localLogin = new localStrategy(localOptions, function(email, password, done) {
	// Verify this username and password, call done with the user
	// if it is the correct username and password
	// otherwise, call done with false
	User.findOne({ email:email }, function(err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		// compare passwords - is "password" equal to user.password?
		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }

			return done(null, user);
			// the user is returned as 'req.user' from Passport
		})
	})
})

// Setup options for JWT Strategy
const jwtOptions = { 
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret // secret code needed to decode the token (the jwt)
};

// Create JST strategy
// payload is the decoded jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that user
	// Otherwise, call done without a user object
	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);