var nconf = require('nconf');
var db = require('apier-database');
var Promise = require('es6-promise').Promise;

nconf.argv()
	.env()
	.file({file: '../config.json'});

module.exports = function setup() {
	return new Promise(function(resolve, reject) {
		db.connect(nconf.get('databases')[process.env.DB || 'production'])
			.then(function() {
				db.mongoose.connection.db.dropDatabase(function(error) {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				});
			}, function(error) {
				reject(error);
			});
	});
};
