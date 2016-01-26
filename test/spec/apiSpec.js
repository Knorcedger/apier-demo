describe('API Tests', function() {

	describe('wrong urls', function() {
		it('should send not found when v1 is not included in the url (1.1.1)', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					secret: APIKEY
				},
				type: 'POST',
				url: '/users2'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				expect(callback).toBeErrorful(callback, 'NOT_FOUND');
			});
		});
	});

	// describe('apikey checks', function() {
	// 	it('should respond with no apikey error (1.2.1)', function() {
	// 		var callback = jasmine.createSpy();
	// 		var config = {
	// 			data: {},
	// 			type: 'POST',
	// 			url: '/v1/documents/add'
	// 		};
	// 		request(config, callback);
	// 		waitsFor(function() {
	// 			if (callback.callCount > 0) {
	// 				return true;
	// 			}
	// 		});
	// 		runs(function() {
	// 			expect(callback).toBeErrorful(callback, 'NO_APIKEY');
	// 		});
	// 	});
	//
	// 	it('should respond with invalid apikey error (1.2.2)', function() {
	// 		var callback = jasmine.createSpy();
	// 		var config = {
	// 			data: {
	// 				secret: '4321'
	// 			},
	// 			type: 'POST',
	// 			url: '/v1/documents/add'
	// 		};
	// 		request(config, callback);
	// 		waitsFor(function() {
	// 			if (callback.callCount > 0) {
	// 				return true;
	// 			}
	// 		});
	// 		runs(function() {
	// 			expect(callback).toBeErrorful(callback, 'INVALID_APIKEY');
	// 		});
	// 	});
/*
		it('should respond with invalid session error (1.2.3)', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					secret: APIKEY
				},
				type: 'GET',
				url: '/v1/users'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				expect(callback).toBeErrorful(callback, 'INVALID_SESSION');
			});
		});
*/
	// });

});
