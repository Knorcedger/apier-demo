require('../../schemas/userSchema');
var User = require('mongoose').model('User');
var reqlog = require('reqlog');

module.exports = function(app) {
	app.endpoint(['get', 'post'], '/users/edit', function(req, res) {
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
	reqlog.info('user.edit');
	var user = new User();

	user.findOneAndUpdate(req, res, req.requestData.query,
		{$set: req.requestData.update}, {new: true})
		.then(function(result) {
			self.send(result);
		});
}
