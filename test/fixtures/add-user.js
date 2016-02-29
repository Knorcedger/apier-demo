var User = require('../../schemas/userSchema');
var crypto = require('crypto');
var Promise = require('es6-promise').Promise;

var admin = {
	username: 'admin',
	email: 'admin@example.com',
	password: '1234',
	type: 'admin'
};

module.exports = function(userType) {
	var user;
	if (userType === 'admin') {
		user = admin;
	} else {
		user = getMember();
	}

	return new Promise(function(resolve, reject) {
		User.create({
			username: user.username,
			password: crypto
				.createHash('sha256')
				.update(user.password)
				.digest('hex'),
			email: user.email,
			type: userType
		}, function(error, result) {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

/**
 * Create a random member
 * @method getMember
 * @return {object}  The member object
 */
function getMember() {
	var random = Math.random((10000 - 1) / 1);
	return {
		username: 'member' + random,
		password: '1234',
		email: 'member' + random + '@example.com'
	};
}
