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

test('get-all', async t => {
	const res = await info.request
		.post('/users')
		.send({secret: info.secret});

	helpers.checkSuccess(t, res);
	t.true(Array.isArray(res.body.data));
	helpers.isUser(t, res.body.data[0], {
		username: user.username,
		email: user.email
	});
});
