module.exports = function(app) {
	app.endpoint(['get', 'post'], '/users', function(req, res) {
		this.send('The users');
	});

	app.endpoint(['get'], '/message', function(req, res) {
		this.send('The super message');
	});
};
