require('../../schemas/userSchema');
var User = require('mongoose').model('User');
require('../../schemas/sessionSchema');
var Session = require('mongoose').model('Session');
var reqlog = require('reqlog');
var crypto = require('crypto');

module.exports = function(app) {
	app.endpoint(['get', 'post'], '/authentications/login', function(req, res) {
		main(req, res, this);
	});
};

/**
 * The main endpoint function
 * @method main
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param  {object} self Use self.send to send back data
 */
function main(req, res, self) {
	reqlog.info('authentications.login');

	var session = new Session();
	var user = new User();

	// check if the user exists in db
	user.findOne(req, res, {
		username: req.requestData.username,
		password: crypto
			.createHash('sha256')
			.update(req.requestData.password)
			.digest('hex')
	})
	.then(function(result) {
		if (result) {
			// we found the user, save him and lets find if a session already exists
			var user = result.toObject();
			session.findOne(req, res, {
				userId: user._id
			}).then(function(result) {
				if (result) {
					// session found, send token
					user.token = result._id;
					sendResponse(user);
				} else {
					// session not found, so lets create a new one
					session.create(req, res, {
						userId: user._id
					}).then(function(result) {
						user.token = result._id;
						sendResponse(user);
					});
				}
			});
		} else {
			self.setStatusCode('WRONG_DATA');
			self.send(null);
		}
	});

	/**
	 * Send back a response (the user with the token)
	 * @method sendResponse
	 * @param  {String}     user The user with the session token
	 */
	function sendResponse(user) {
		self.send(user);
	}
}
