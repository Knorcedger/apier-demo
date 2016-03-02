require('../../schemas/userSchema');
var db = require('apier-database');
var User = db.mongoose.model('User');
var reqlog = require('reqlog');
var crypto = require('crypto');
var validationsRunner = require('apier-validationsrunner');
var validator = require('validator');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/authentications/register',
		permissions: ['null'],
		middlewares: [validate],
		callback: function(req, res) {
			main(req, res, this);
		}
	});
};

/**
 * The endpoint validations middleware
 * @method validate
 * @param  {object}   req  The request object
 * @param  {object}   res  The response object
 * @param  {Function} next The next function
 */
function validate(req, res, next) {
	var validations = {
		username: {
			INVALID_LENGTH: function(req, resolve) {
				var username = req.requestData.username;
				if (username && username.length >= 4) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		},
		password: {
			INVALID_LENGTH: function(req, resolve) {
				var password = req.requestData.password;
				if (password && password.length >= 4) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		},
		email: {
			INVALID: function(req, resolve) {
				if (req.requestData.email &&
				validator.isEmail(req.requestData.email)) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		}
	};

	validationsRunner(req, res, next, validations);
}

/**
 * The main endpoint function
 * @method main
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param  {object} self Use self.send to send back data
 */
function main(req, res, self) {
	reqlog.info('authentications.register');

	var user = new User();

	user.create(req, res, {
		username: req.requestData.username,
		password: crypto
			.createHash('sha256')
			.update(req.requestData.password)
			.digest('hex'),
		email: req.requestData.email,
		type: 'member'
	}).then(function(result) {
		self.send(result);
	});
}
