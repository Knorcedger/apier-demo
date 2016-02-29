import test from 'ava';
var info = require('./fixtures/info');
var helpers = require('./helpers/helpers');

test('NOT_FOUND', async t => {
	const res = await info.request
		.post('/users2')
		.send({secret: info.secret});

	helpers.checkFail(t, res, 'NOT_FOUND');
});

test('NO_APIKEY', async t => {
	const res = await info.request
		.post('/users');

	helpers.checkFail(t, res, 'NO_APIKEY');
});

test('INVALID_APIKEY', async t => {
	const res = await info.request
		.post('/users')
		.send({secret: '1234567'});

	helpers.checkFail(t, res, 'INVALID_APIKEY');
});
