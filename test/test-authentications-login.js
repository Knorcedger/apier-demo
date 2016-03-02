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

test('login', async t => {
	const res = await info.request
		.post('/authentications/login')
		.send({
			secret: info.secret,
			username: 'admin',
			password: '1234'
		});

	helpers.checkSuccess(t, res);
	t.ok(res.body.data.token);
	helpers.isUser(t, res.body.data, {
		username: user.username,
		email: user.email
	});
});

test('username-invalid-length', async t => {
	const res = await info.request
		.post('/authentications/login')
		.send({
			secret: info.secret,
			username: 'abc',
			password: '1234'
		});

	helpers.checkFail(t, res, 'username.INVALID_LENGTH');
});

test('password-invalid-length', async t => {
	const res = await info.request
		.post('/authentications/login')
		.send({
			secret: info.secret,
			username: 'abcd',
			password: '123'
		});

	helpers.checkFail(t, res, 'password.INVALID_LENGTH');
});
