const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Define our model
const userSchema = new Schema ({
    email: {
        type: String,
        lowercase: true,
        unique: true 
    },

    password: String,
});

// On Save Hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if(err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        })
    })
})


// Create the model class

const UserClass = mongoose.model('user', userSchema)

// Export the model
module.exports = UserClass
