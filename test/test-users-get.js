import test from 'ava';
import setup from './fixtures/setup';
var info = require('./fixtures/info');
var addUser = require('./fixtures/add-user');
var helpers = require('./helpers/helpers');

var user;

test.before('setup', async t => {
	try {
		var done = await setup();
		user = await addUser('admin');
		t.pass();
	} catch(error) {
		t.fail(error);
	}
});

test('get', async t => {
	const res = await info.request
		.post('/users/' + user._id)
		.send({
			secret: info.secret
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: user.username,
		email: user.email
	});
});
