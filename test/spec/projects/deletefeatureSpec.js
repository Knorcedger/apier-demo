describe('/projects/:id/deletefeature Service', function() {

	it('should delete a feature when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				featureId: localStorage.getItem('featureId0'),
				token: localStorage.getItem('memberToken'),
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/deletefeature'
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
			expect(response.data).toBeProject();
			expect(response.data.features).toBeFeatures();			
		});
	});

	describe('Parameter Validation', function() {
		it('should return id.INVALID_LENGTH error when id parameter is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					featureId: '12345',
					token: localStorage.getItem('memberToken'),
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/projects/' + localStorage.getItem('projectId') + '/deletefeature'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'featureId.INVALID_LENGTH');
			});
		});

	});
});
