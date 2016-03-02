require('../../schemas/userSchema');
var db = require('apier-database');
var User = db.mongoose.model('User');
var reqlog = require('reqlog');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/users/update',
		permissions: ['admin'],
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
	reqlog.info('user.updateAll');
	var user = new User();

	user.update(req, res, req.params.query, req.params.update)
		.then(function(result) {
			self.send(result);
		});
}
