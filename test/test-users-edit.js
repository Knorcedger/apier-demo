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

test('edit-email', async t => {
	const res = await info.request
		.post('/users/edit')
		.send({
			secret: info.secret,
			token: token,
			query: {
				username: user.username
			},
			update: {
				email: 'test@example.com'
			}
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: user.username,
		email: 'test@example.com',
		type: user.type
	});
});

test('edit-username', async t => {
	const res = await info.request
		.post('/users/edit')
		.send({
			secret: info.secret,
			token: token,
			query: {
				email: 'test@example.com'
			},
			update: {
				username: 'test'
			}
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: 'test',
		email: 'test@example.com',
		type: user.type
	});
});

test('query-empty', async t => {
	const res = await info.request
		.post('/users/edit')
		.send({
			secret: info.secret,
			token: token,
			update: {
				username: 'test'
			}
		});

	helpers.checkFail(t, res, 'query.EMPTY');
});

test('query-bad-format', async t => {
	const res = await info.request
		.post('/users/edit')
		.send({
			secret: info.secret,
			token: token,
			query: 'test',
			update: {
				username: 'test'
			}
		});

	helpers.checkFail(t, res, 'query.BAD_FORMAT');
});

test('update-empty', async t => {
	const res = await info.request
		.post('/users/edit')
		.send({
			secret: info.secret,
			token: token,
			query: {
				email: 'test@example.com'
			}
		});

	helpers.checkFail(t, res, 'update.EMPTY');
});

test('update-bad-format', async t => {
	const res = await info.request
		.post('/users/edit')
		.send({
			secret: info.secret,
			token: token,
			query: {
				email: 'test@example.com'
			},
			update: true
		});

	helpers.checkFail(t, res, 'update.BAD_FORMAT');
});
