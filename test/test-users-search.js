import test from 'ava';
import setup from './fixtures/setup';
var info = require('./fixtures/info');
var addUser = require('./fixtures/add-user');
var loginUser = require('./fixtures/login-user');
var helpers = require('./helpers/helpers');

var admin;
var member;
var token;

test.before('setup', async t => {
	try {
		var done = await setup();
		admin = await addUser('admin');
		member = await addUser('member');
		token = await loginUser(admin._id);
		t.pass();
	} catch(error) {
		t.fail(error);
	}
});

test('search-by-email', async t => {
	const res = await info.request
		.post('/users/search')
		.send({
			secret: info.secret,
			token: token,
			email: admin.email
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: admin.username,
		email: admin.email,
		type: admin.type
	});
});

test('search-by-username', async t => {
	const res = await info.request
		.post('/users/search')
		.send({
			secret: info.secret,
			username: member.username
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data[0], {
		username: member.username,
		email: member.email
	});
});

test('no-username-no-email', async t => {
	const res = await info.request
		.post('/users/search')
		.send({
			secret: info.secret
		});

	helpers.checkFail(t, res, 'searchTerms.INVALID');
});
