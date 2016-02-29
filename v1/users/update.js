require('../../schemas/userSchema');
var User = require('mongoose').model('User');
var reqlog = require('reqlog');

module.exports = function(app) {
	app.endpoint(['get', 'post'], '/users/:id/update', function(req, res) {
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
	reqlog.info('user.update');
	var user = new User();

	var update = {};
	if (req.requestData.email) {
		update.email = req.requestData.email;
	}
	if (req.requestData.username) {
		update.username = req.requestData.username;
	}
	user.findByIdAndUpdate(req, res, req.params.id, update, {new: true})
		.then(function(result) {
			self.send(result);
		});
}
