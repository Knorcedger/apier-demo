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
