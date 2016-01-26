describe('/projects/addrating Service', function() {
	it('should add ratings to features to a project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				featureId: localStorage.getItem('featureId0'),
				grade: 7,
				secret: APIKEY,
				token: localStorage.getItem('memberToken')
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/addrating'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
			expect(response.data).toBeProject();
			expect(response.data.features).toBeFeatures();
			for (var i = 0, length = response.data.features.length ; i < length; i++){
				expect(response.data.features[i].ratings).toBeRatings();
			}
		});
	});

	it('should add a second rating a feature to a project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				featureId: localStorage.getItem('featureId1'),
				grade: 3,
				secret: APIKEY,
				token: localStorage.getItem('memberToken')
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/addrating'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
			expect(response.data).toBeProject();
			expect(response.data.features).toBeFeatures();
			for (var i = 0, length = response.data.features.length ; i < length; i++){
				expect(response.data.features[i].ratings).toBeRatings();
			}
		});
	});

	describe('Parameter Validation', function() {
		it('should return featureId.INVALID_LENGTH error when featureId parameter is invalid (4.6.2)', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					featureId: '1234',
					grade: 7,
					secret: APIKEY,
					token: localStorage.getItem('memberToken')
				},
				type: 'POST',
				url: '/v1/projects/' + localStorage.getItem('projectId') + '/addrating'
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
		it('should return grade.EMPTY error when id parameter is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					featureId: localStorage.getItem('featureId0'),
					secret: APIKEY,
					token: localStorage.getItem('memberToken')
				},
				type: 'POST',
				url: '/v1/projects/' + localStorage.getItem('projectId') + '/addrating'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'grade.EMPTY');
			});
		});

		it('should return grade.INVALID_TYPE error when id parameter is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					featureId: localStorage.getItem('featureId0'),
					grade: 'a',
					secret: APIKEY,
					token: localStorage.getItem('memberToken')
				},
				type: 'POST',
				url: '/v1/projects/' + localStorage.getItem('projectId') + '/addrating'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'grade.INVALID_TYPE');
			});
		});

		it('should return id.INVALID error when id parameter is invalid', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					featureId: localStorage.getItem('featureId0'),
					grade: 7,
					secret: APIKEY,
					token: localStorage.getItem('memberToken')
				},
				type: 'POST',
				url: '/v1/projects/132456789012345678901234/addrating'
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
