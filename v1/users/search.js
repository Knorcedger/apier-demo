require('../../schemas/userSchema');
var User = require('mongoose').model('User');
var reqlog = require('reqlog');

module.exports = function(app) {
	app.endpoint(['get', 'post'], '/users/search', function(req, res) {
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
