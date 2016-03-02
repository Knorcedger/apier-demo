require('../../schemas/userSchema');
var db = require('apier-database');
var User = db.mongoose.model('User');
var reqlog = require('reqlog');
var crypto = require('crypto');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/authentications/register',
		permissions: ['null'],
		callback: function(req, res) {
			main(req, res, this);
		}
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
