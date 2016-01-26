describe('/projects/:id/updatefeature Service', function() {

	it('should update a feature when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				featureId: localStorage.getItem('featureId0'),
				description: 'Convert changed',
				token: localStorage.getItem('memberToken'),
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/updatefeature'
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

	it('should update a feature when valid data are sent by admin', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				featureId: localStorage.getItem('featureId1'),
				description: 'Malakas changed and approved',
				status:'approved',
				milestone: 'm8',
				token: localStorage.getItem('adminToken'),
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/updatefeature'
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
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/updatefeature'
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

	it('should return milestone.NO_PERMISSION error when  a member adds milestone', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				featureId: localStorage.getItem('featureId0'),
				description: 'Convert changed as well as milestone',
				milestone:'m9',
				token: localStorage.getItem('memberToken'),
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/updatefeature'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeErrorful(callback, 'milestone.NO_PERMISSION');
		});
	});


	it('should return status.NO_PERMISSION error when a member adds status', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				featureId: localStorage.getItem('featureId0'),
				description: 'Convert changed as well as status',
				status:'approved',
				token: localStorage.getItem('memberToken'),
				secret: APIKEY
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/updatefeature'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeErrorful(callback, 'status.NO_PERMISSION');
		});
	});
});
