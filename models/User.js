const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
	let User = sequelize.define("User", {
			
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				min: 6,
				// msg: "Username must at least be 6 characters.",
				// notNull: {
				// 	msg: "Please enter a username"
				// }
			}
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
				// msg: "This field must be a valid email.",
				// notNull: {
				// 	msg: "Email is required."
				// }
			}
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				min: 8,
				// msg: "Password requires at least 8 characters.",
				// notNull: {
				// 	msg: "A password is required."
				// }
			}
		}
	});

	User.addHook("beforeCreate", function(user) {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	});
		
	User.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};
		
	return User;
}