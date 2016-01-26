describe('/projects/addfeature Service', function() {
	it('should add a feature to a project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				title: 'Convert one2one title',
				description: 'Convert one2one currency',
				secret: APIKEY,
				token: localStorage.getItem('adminToken')
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/addfeature'
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
			localStorage.setItem('featureId0', response.data.features[0]._id);
		});
	});

});

describe('/projects/addfeature Service', function() {
	it('should add a second feature to a project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				title: 'Offline Mode title',
				description: 'Offline Mode',
				secret: APIKEY,
				token: localStorage.getItem('adminToken')
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/addfeature'
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
			localStorage.setItem('featureId1', response.data.features[1]._id);
		});
	});

});

describe('/projects/addfeature Service', function() {
	it('should add feature to a project when valid data are sent by an admin', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				title: 'Financial Manager',
				description: 'How money have we spent',
				status: 'ongoing',
				milestone: 'm8',
				secret: APIKEY,
				token: localStorage.getItem('adminToken')
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/addfeature'
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
			localStorage.setItem('featureId2', response.data.features[2]._id);
		});
	});

});

// describe('Parameter Validation', function() {
//
// 	it('should return milestone.NO_PERMISSION error when  a member adds milestone', function() {
// 		var callback = jasmine.createSpy();
// 		var config = {
// 			data: {
// 				title: 'Offline Mode title',
// 				description: 'Offline Mode',
// 				milestone: 'm5',
// 				secret: APIKEY,
// 				token: localStorage.getItem('memberToken')
// 			},
// 			type: 'POST',
// 			url: '/v1/projects/' + localStorage.getItem('projectId') + '/addfeature'
// 		};
// 		request(config, callback);
// 		waitsFor(function() {
// 			if (callback.callCount > 0) {
// 				return true;
// 			}
// 		});
// 		runs(function() {
// 			var response = expect(callback).toBeErrorful(callback, 'milestone.NO_PERMISSION');
// 		});
// 	});
//
//
// 	it('should return status.NO_PERMISSION error when a member adds status', function() {
// 		var callback = jasmine.createSpy();
// 		var config = {
// 			data: {
// 				title: 'Offline Mode title',
// 				description: 'Offline Mode',
// 				status: 'completed',
// 				secret: APIKEY,
// 				token: localStorage.getItem('memberToken')
// 			},
// 			type: 'POST',
// 			url: '/v1/projects/' + localStorage.getItem('projectId') + '/addfeature'
// 		};
// 		request(config, callback);
// 		waitsFor(function() {
// 			if (callback.callCount > 0) {
// 				return true;
// 			}
// 		});
// 		runs(function() {
// 			var response = expect(callback).toBeErrorful(callback, 'status.NO_PERMISSION');
// 		});
// 	});
// });
