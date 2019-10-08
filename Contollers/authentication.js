const User = require('../models/User')

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password

    if (!email || !password) {
        return res.status(422).send({ error: "Username and password are both required."})
    }
    // see if user with given email exist
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // if a user with email does exist, return an error

        if (existingUser)
            return res.status(422).send({ error: "Email is in use" });

        // if a user without email does not exist, create and save user record.
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if(err) { return next(err); }

             // Respond to request indicating user was created.
             res.json({ success: true });
        });
    });



    

   
}