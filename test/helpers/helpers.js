exports.checkSuccess = function(t, res) {
	t.is(res.status, 200);
	t.ok(res.body.data);
	t.is(res.body.meta.statusCode, 'OK');
};

exports.checkFail = function(t, res, errorCode) {
	t.is(res.status, 200);
	t.is(res.body.data, null);
	t.is(res.body.meta.statusCode, errorCode);
};

exports.isUser = function(t, response, compare) {
	// has all atributes
	t.true(response.hasOwnProperty('username'));
	t.true(response.hasOwnProperty('email'));
	t.true(response.hasOwnProperty('_id'));
	// has the correct values
	for (var attr in compare) {
		if (compare.hasOwnProperty(attr)) {
			if (response[attr] !== compare[attr]) {
				t.fail(attr + ' is different');
			}
		}
	}
};
