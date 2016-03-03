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
		user = await addUser('member');
		token = await loginUser(user._id);
		t.pass();
	} catch(error) {
		t.fail(error);
	}
});

test('update-username', async t => {
	const res = await info.request
		.post('/users/' + user._id + '/update')
		.send({
			secret: info.secret,
			token: token,
			username: 'user2'
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: 'user2',
		email: user.email
	});
});


test('id-invalid-length', async t => {
	const res = await info.request
		.post('/users/' + '1234' + '/update')
		.send({
			secret: info.secret,
			token: token,
			email: 'testme@example.com'
		});

	helpers.checkFail(t, res, 'id.INVALID_LENGTH');
});

test('id-not-exist', async t => {
	const res = await info.request
		.post('/users/' + '123456789012345678901234' + '/update')
		.send({
			secret: info.secret,
			token: token,
			username: 'noname'
		});

	helpers.checkFail(t, res, 'id.NOT_EXIST');
});

test('no-username-no-email', async t => {
	const res = await info.request
		.post('/users/' + user._id + '/update')
		.send({
			secret: info.secret,
			token: token
		});

	helpers.checkFail(t, res, 'updateParams.INVALID');
});
