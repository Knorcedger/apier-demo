describe('/authentications/register Service', function() {
	it('should register a (member) user when valid data are sent', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				username: 'lampropoi',
				password: commonPassword,
				email: memberEmail,
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/authentications/register'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
			expect(response.data).toBeUser();
			expect(response.data.token).toBeNotEmptyString();
			localStorage.setItem('memberId', response.data._id );
		});
	});

	describe('Parameter Validation', function() {
		it('should return username.INVALID_LENGTH error when username is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					username: '',
					password: commonPassword,
					email: 'user' + Math.floor((Math.random()*10000)+1).toString() + '@example.com',
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/register'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'username.INVALID_LENGTH');
			});
		});

		it('should return password.INVALID_LENGTH error when password is empty', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					username: 'Don',
					password: '',
					email: 'user' + Math.floor((Math.random()*10000)+1).toString() + '@example.com',
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/register'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'password.INVALID_LENGTH');
			});
		});

		it('should return password.INVALID_LENGTH error when password is less than 64 chars', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					username: 'Don',
					password: '1234',
					email: 'user' + Math.floor((Math.random()*10000)+1).toString() + '@example.com',
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/register'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'password.INVALID_LENGTH');
			});
		});

		it('should return email.INVALID_LENGTH error when email is empty', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					username: 'Don',
					password: commonPassword,
					email: '',
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/register'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'email.INVALID_LENGTH');
			});
		});

		it('should return email.INVALID error when email is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					username: 'Don',
					password: commonPassword,
					email: '1234',
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/register'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'email.INVALID');
			});
		});
	});
});
