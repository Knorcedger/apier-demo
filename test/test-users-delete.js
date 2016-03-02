import test from 'ava';
import setup from './fixtures/setup';
var info = require('./fixtures/info');
var addUser = require('./fixtures/add-user');
var loginUser = require('./fixtures/login-user');
var helpers = require('./helpers/helpers');

var user;
var user2;
var user3;
var token;

test.before('setup', async t => {
	try {
		var done = await setup();
		user = await addUser('admin');
		user2 = await addUser('member');
		user3 = await addUser('member');
		token = await loginUser(user._id);
		t.pass();
	} catch(error) {
		t.fail(error);
	}
});

test('delete', async t => {
	const res = await info.request
		.post('/users/' + user2._id + '/delete')
		.send({
			secret: info.secret,
			token: token
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: user2.username,
		email: user2.email,
		type: user2.type
	});
});

test('id-invalid-length', async t => {
	const res = await info.request
		.post('/users/' + '1234' + '/delete')
		.send({
			secret: info.secret,
			token: token
		});

	helpers.checkFail(t, res, 'id.INVALID_LENGTH');
});

test('id-not-exist', async t => {
	const res = await info.request
		.post('/users/' + '123456789012345678901234' + '/delete')
		.send({
			secret: info.secret,
			token: token
		});

	helpers.checkFail(t, res, 'id.NOT_EXIST');
});
