describe('/authentications/login Service', function() {

	it('should login as an member when valid data are sent', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				email: memberEmail,
				password: commonPassword,
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/authentications/login'
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
			localStorage.setItem('memberId', response.data._id);
			localStorage.setItem('memberToken', response.data.token);
		});
	});

	describe('Parameter Validation', function() {
		it('should return email.INVALID_LENGTH error when email is empty', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					email: '',
					password: commonPassword,
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/login'
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

		it('should return email.NOT_EMAIL error when email is not email formatted', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					email: 'Don',
					password: commonPassword,
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/login'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'email.NOT_EMAIL');
			});
		});

		it('should return password.INVALID_LENGTH error when password is empty', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					email: 'don@example.com',
					password: '',
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/login'
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

		it('should return password.INVALID_LENGTH error when password is not sha encrypted', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					email: 'don@example.com',
					password: '1234',
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/login'
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

		it('should return WRONG_DATA error when email or password are not correct (2.1.8)', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					email: 'don@example.com',
					password: commonPassword,
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/authentications/login'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'WRONG_DATA');
			});
		});
	});
});
