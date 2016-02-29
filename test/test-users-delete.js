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

test('delete', async t => {
	const res = await info.request
		.post('/users/' + admin._id + '/delete')
		.send({
			secret: info.secret
		});

	helpers.checkSuccess(t, res);
	helpers.isUser(t, res.body.data, {
		username: admin.username,
		email: admin.email,
		type: admin.type
	});
});
