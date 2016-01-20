
module.exports = function(apier) {
	apier.endpoint('/users', function(req, res) {
		this.send('The users');
	});
};
