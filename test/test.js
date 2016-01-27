import test from 'ava';
// import delay from 'delay';

var request = require('supertest-as-promised');

request = request('http://localhost:2000');
var x = 1;

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

test.serial('api:NOT_FOUND', async t => {
	t.plan(3);

	const res = await request
	.post('/users2');

	t.is(res.status, 200);
	t.is(res.body.data, null);
	t.is(res.body.meta.statusCode, 'NOT_FOUND');
});

test.serial('users:Success', async t => {
	t.plan(2);

	const res = await request
		.post('/users')
		.send({email: 'ava@rocks.com', password: '123123'});

	t.is(res.status, 200);
	t.is(res.body.data, 'The users');
});


// test('api:NOT_FOUND', async t => {
// 	t.plan(2);
//
// 	const res = await request
// 		.post('/users2')
// 		.send({email: 'ava@rocks.com', password: '123123'});
//
// 	t.is(res.status, 200);
// 	t.is(res.body.data, null);
// 	// t.is(res.body.meta, 'object');
// 	// t.is(res.body.meta.statusCode, 'NOT_FOUND');
//
// 	setTimeout(() => {
// 		// This failure is now reliably caught.
// 		t.fail();
// 		t.end();
// 	}, 5000);
// });
