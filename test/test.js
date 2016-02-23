import test from 'ava';
// import delay from 'delay';

var request = require('supertest-as-promised');

request = request('http://localhost:2000');
var x = 1;
var secret = '2Fx64jQ54asz8MD92MOVBOWS';

test('foo', t => {
	t.pass();
});

test('foo2', t => {
	if (x === 1) {
		t.pass();
	} else {
		t.fail('not equal');
	}
});

test('api:NOT_FOUND', async t => {
	t.plan(3);

	const res = await request
		.post('/users2')
		.send({secret: secret});

	t.is(res.status, 200);
	t.is(res.body.data, null);
	t.is(res.body.meta.statusCode, 'NOT_FOUND');
});

test('api:NO_APIKEY', async t => {
	t.plan(3);

	const res = await request
		.post('/users');

	t.is(res.status, 200);
	t.is(res.body.data, null);
	t.is(res.body.meta.statusCode, 'NO_APIKEY');
});

test('api:INVALID_APIKEY', async t => {
	t.plan(3);

	const res = await request
		.post('/users')
		.send({secret: '1234567'});

	t.is(res.status, 200);
	t.is(res.body.data, null);
	t.is(res.body.meta.statusCode, 'INVALID_APIKEY');
});

test('users:Success', async t => {
	t.plan(2);

	const res = await request
		.post('/users')
		.send({secret: secret});

	t.is(res.status, 200);
	t.is(res.body.data, 'The users');
});

var random = Math.random() * (10000 - 1) + 1;
var userEmail = 'knorcedger' + random + '@gmail.com';
var userUsername = 'fire';
var userId;

test('users:Add', async t => {
	t.plan(3);

	const res = await request
		.post('/users/add')
		.send({
			secret: secret,
			username: userUsername,
			email: userEmail
		});



	t.is(res.status, 200);
	t.is(res.body.data.username, userUsername);
	t.is(res.body.data.email, userEmail);
	userId = res.body.data._id;
});

test('users:Add-Duplicate-Email', async t => {
	t.plan(3);

	const res = await request
		.post('/users/add')
		.send({
			secret: secret,
			username: userUsername,
			email: userEmail
		});



	t.is(res.status, 200);
	t.is(res.body.data, null);
	t.is(res.body.meta.statusCode, 'INTERNAL_SERVER_ERROR');
});

test('users:Get', async t => {
	t.plan(4);

	const res = await request
		.post('/users/' + userId)
		.send({
			secret: secret
		});

	t.is(res.status, 200);
	t.is(res.body.data.username, userUsername);
	t.is(res.body.data.email, userEmail);
	t.is(res.body.meta.statusCode, 'OK');
});

test('users:Search-by-email', async t => {
	t.plan(4);

	const res = await request
		.post('/users/search')
		.send({
			secret: secret,
			email: userEmail
		});

	t.is(res.status, 200);
	t.is(res.body.data.username, userUsername);
	t.is(res.body.data.email, userEmail);
	t.is(res.body.meta.statusCode, 'OK');
});

test('users:Search-by-username', async t => {
	t.plan(4);

	const res = await request
		.post('/users/search')
		.send({
			secret: secret,
			username: userUsername
		});

	t.is(res.status, 200);
	t.true(Array.isArray(res.body.data));
	t.is(res.body.data[0].username, userUsername);
	t.is(res.body.meta.statusCode, 'OK');
});
