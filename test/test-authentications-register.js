import test from 'ava';
import setup from './fixtures/setup';
var info = require('./fixtures/info');
var addUser = require('./fixtures/add-user');
var helpers = require('./helpers/helpers');

test.before('setup', async t => {
	try {
		var done = await setup();
		t.pass();
	} catch(error) {
		t.fail(error);
	}
});

test('register', async t => {
	const res = await info.request
		.post('/authentications/register')
		.send({
			secret: info.secret,
			username: 'member',
			password: '1234',
			email: 'member@example.com'
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: 'member',
		email: 'member@example.com'
	});
});

test('username-invalid-length', async t => {
	const res = await info.request
		.post('/authentications/register')
		.send({
			secret: info.secret,
			username: 'abc',
			password: '1234',
			email: 'member@example.com'
		});

	helpers.checkFail(t, res, 'username.INVALID_LENGTH');
});

test('password-invalid-length', async t => {
	const res = await info.request
		.post('/authentications/register')
		.send({
			secret: info.secret,
			username: 'abcd',
			password: '123',
			email: 'member@example.com'
		});

	helpers.checkFail(t, res, 'password.INVALID_LENGTH');
});

test('email-invalid', async t => {
	const res = await info.request
		.post('/authentications/register')
		.send({
			secret: info.secret,
			username: 'abcd',
			password: '1234',
			email: 'member'
		});

	helpers.checkFail(t, res, 'email.INVALID');
});
