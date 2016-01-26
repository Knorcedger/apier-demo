
module.exports = function(apier) {
	apier.endpoint(['get', 'post'], '/users', function(req, res) {
		this.send('The users');
	});
};
