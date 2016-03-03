require('../../schemas/userSchema');
var db = require('apier-database');
var User = db.mongoose.model('User');
var reqlog = require('reqlog');
var validationsRunner = require('apier-validationsrunner');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/users/:id',
		permissions: ['member'],
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
		id: {
			INVALID_LENGTH: Boolean(req.params.id.length === 24),
			NOT_EXIST: function(req, resolve) {
				var user = new User();

				user.findById(req, res, req.params.id)
					.then(function(result) {
						if (result) {
							resolve(true);
						} else {
							resolve(false);
						}
					});
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
	reqlog.info('user.get');
	var user = new User();

	user.findById(req, res, req.params.id)
		.then(function(result) {
			self.send(result);
		});
}
