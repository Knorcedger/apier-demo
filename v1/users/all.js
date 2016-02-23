module.exports = function(app) {
	app.endpoint(['get', 'post'], '/users', function() {
		this.send('The users');
	});
};
