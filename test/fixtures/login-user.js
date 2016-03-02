var Session = require('../../schemas/sessionSchema');
var Promise = require('es6-promise').Promise;

module.exports = function(userId) {
	return new Promise(function(resolve) {
		Session.create({
			userId: userId
		}).then(function(result) {
			resolve(result._id);
		});
	});
};
