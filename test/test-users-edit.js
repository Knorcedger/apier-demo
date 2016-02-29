import test from 'ava';
import setup from './fixtures/setup';
var info = require('./fixtures/info');
var addUser = require('./fixtures/add-user');
var helpers = require('./helpers/helpers');

var admin;

test.before('setup', async t => {
	try {
		var done = await setup();
		admin = await addUser('admin');
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
			query: {
				username: admin.username
			},
			update: {
				email: 'test@example.com'
			}
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: admin.username,
		email: 'test@example.com',
		type: admin.type
	});
});

test('edit-username', async t => {
	const res = await info.request
		.post('/users/edit')
		.send({
			secret: info.secret,
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
		type: admin.type
	});
});
