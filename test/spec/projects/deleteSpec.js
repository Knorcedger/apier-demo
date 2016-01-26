describe('/projects/:id/delete Service', function() {

	it('should delete a project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				token: localStorage.getItem('memberToken'),
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/delete'
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
		});
	});

	describe('Parameter Validation', function() {
		it('should return id.INVALID_LENGTH error when id parameter is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					token: localStorage.getItem('memberToken'),
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/projects/1324/delete'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'id.INVALID_LENGTH');
			});
		});

		it('should return id.INVALID error when id parameter is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					token: localStorage.getItem('memberToken'),
					secret: APIKEY
				},
				type: 'POST',
				url: '/v1/projects/132456789012345678901234/delete'
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
