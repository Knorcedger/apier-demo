require('../../schemas/userSchema');
var User = require('mongoose').model('User');
var reqlog = require('reqlog');

module.exports = function(app) {
	app.endpoint(['get', 'post'], '/users/add', function(req, res) {
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
	reqlog.info('user.add');
	var user = new User();

	user.create(req, res, {
		username: req.requestData.username,
		email: req.requestData.email
	})
		.then(function(result) {
			self.send(result);
		}, function() {
			self.setStatusCode('INTERNAL_SERVER_ERROR');
			self.send(null);
		});
}
