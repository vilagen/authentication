const db = require('../models')
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat:timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    // User has already ahd their email and password auth'd
    // We need to give them a token
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {
  const { username, email, password } = req.body

	if (!username || !password || !email) {
		return res.status(422).send({ error: "Username, password, and email are all required."})
  }
  
  // see if username exist
  
  db.User.findOne({where: {username: username} }).then( existingUser => {

		if (existingUser) 
		return res.status(422).send({ error: "Username is taken" })
		})

		.catch( error => {
			if(error) {return `Error signing up username. \n ${error}` }
		})		

		// create and save user record.

		const user = new db.User({
			username: username,
			email: email,
			password: password
		});

		user.save().then( () => {
			res.json({ token: tokenForUser(user) })
			})
			.catch( error => {
				if(error) {return `Error signing up username. \n ${error}` }
			})
	};
	