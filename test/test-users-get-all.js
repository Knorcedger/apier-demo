import test from 'ava';
import setup from './fixtures/setup';
var info = require('./fixtures/info');
var addUser = require('./fixtures/add-user');
var loginUser = require('./fixtures/login-user');
var helpers = require('./helpers/helpers');

var user;
var user2;
var token;
var token2;

test.before('setup', async t => {
	try {
		var done = await setup();
		user = await addUser('admin');
		user2 = await addUser('member');
		token = await loginUser(user._id);
		token2 = await loginUser(user2._id);
		t.pass();
	} catch(error) {
		t.fail(error);
	}
});

test('get-all', async t => {
	const res = await info.request
		.post('/users')
		.send({
			secret: info.secret,
			token: token
		});

	helpers.checkSuccess(t, res);
	t.true(Array.isArray(res.body.data));
	helpers.isUser(t, res.body.data[0], {
		username: user.username,
		email: user.email
	});
});

test('invalid-session', async t => {
	const res = await info.request
		.post('/users')
		.send({
			secret: info.secret
		});

	helpers.checkFail(t, res, 'INVALID_SESSION');
});

test('no-permission', async t => {
	const res = await info.request
		.post('/users')
		.send({
			secret: info.secret,
			token: token2
		});

	helpers.checkFail(t, res, 'NO_PERMISSION');
});
