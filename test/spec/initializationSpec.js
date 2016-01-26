describe('Initialization', function() {

	it('should login as admin to use his token at later tests (1.0.1)', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				email: adminEmail,
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
			localStorage.setItem('adminToken', response.data.token);
		});
	});
});
