require('../../schemas/userSchema');
var db = require('apier-database');
var User = db.mongoose.model('User');
var reqlog = require('reqlog');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/users',
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
	reqlog.info('user.all');
	var user = new User();

	user.find(req, res, {})
		.then(function(result) {
			self.send(result);
		});
}
