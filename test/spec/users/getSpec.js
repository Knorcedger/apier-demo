describe('/users/:id Service', function() {

	it('should retrieve the user (:id) when valid parameters are sent (4.2.2)', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				secret: APIKEY,
				token: localStorage.getItem('memberToken')
			},
			type: 'GET',
			url: '/v1/users/' + localStorage.getItem('memberId')
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			expect(callback).toHaveBeenCalled();
			var response = callback.argsForCall[0][0];
			expect(callback).toBeSuccessful(callback);
			expect(response.data).toBeUser();
		});
	});

	describe('Parameter Validation', function() {
		it('should return id.INVALID error when id parameter is invalid (4.2.3)', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					secret: APIKEY,
					token: localStorage.getItem('memberToken')
				},
				type: 'GET',
				url: '/v1/users/' + '1234'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'id.INVALID');
			});
		});
	});
});
