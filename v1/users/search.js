require('../../schemas/userSchema');
var db = require('apier-database');
var User = db.mongoose.model('User');
var reqlog = require('reqlog');
var validationsRunner = require('apier-validationsrunner');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/users/search',
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
		searchTerms: {
			INVALID: req.requestData.email || req.requestData.username
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
	reqlog.info('user.search');
	var user = new User();

	if (req.requestData.email) {
		user.findOne(req, res, {
			email: req.requestData.email
		})
		.then(function(result) {
			self.send(result);
		});
	} else if (req.requestData.username) {
		user.find(req, res, {
			username: req.requestData.username
		})
		.then(function(result) {
			self.send(result);
		});
	}
}
