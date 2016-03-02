require('../../schemas/userSchema');
var db = require('apier-database');
var User = db.mongoose.model('User');
var reqlog = require('reqlog');
var validationsRunner = require('apier-validationsrunner');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/users/edit',
		permissions: ['admin'],
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
		query: {
			EMPTY: Boolean(req.requestData.query),
			BAD_FORMAT: Boolean(typeof req.requestData.query === 'object')
		},
		update: {
			EMPTY: Boolean(req.requestData.update),
			BAD_FORMAT: Boolean(typeof req.requestData.update === 'object')
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
	reqlog.info('user.edit');
	var user = new User();

	user.findOneAndUpdate(req, res, req.requestData.query,
		{$set: req.requestData.update}, {new: true})
		.then(function(result) {
			self.send(result);
		});
}
