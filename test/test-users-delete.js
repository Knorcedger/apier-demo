import test from 'ava';
import setup from './fixtures/setup';
var info = require('./fixtures/info');
var addUser = require('./fixtures/add-user');
var loginUser = require('./fixtures/login-user');
var helpers = require('./helpers/helpers');

var user;
var token;

test.before('setup', async t => {
	try {
		var done = await setup();
		user = await addUser('admin');
		token = await loginUser(user._id);
		t.pass();
	} catch(error) {
		t.fail(error);
	}
});

test('delete', async t => {
	const res = await info.request
		.post('/users/' + user._id + '/delete')
		.send({
			secret: info.secret,
			token: token
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: user.username,
		email: user.email,
		type: user.type
	});
});
