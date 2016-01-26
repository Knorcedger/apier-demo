describe('/projects/updaterating Service', function() {
	it('should add ratings to features to a project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				ratings: [
							{
								featureId: localStorage.getItem('featureId0'),
								ratingId: localStorage.getItem('rating0'),
								grade: -200
							},
							{
								featureId: localStorage.getItem('featureId1'),
								ratingId: localStorage.getItem('rating1'),
								grade: -100
							}
				],
				secret: APIKEY,
				token: localStorage.getItem('memberToken')
			},
			type: 'POST',
			url: '/v1/projects/' + localStorage.getItem('projectId') + '/updaterating'
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

});

// describe('/projects/addfeature Service', function() {
// 	it('should add a second feature to a project when valid data are sent', function() {
// 		var callback = jasmine.createSpy();
//
// 		var config = {
// 			data: {
// 				description: 'Offline Mode',
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
// 			var response = expect(callback).toBeSuccessful(callback);
// 			expect(response.data).toBeProject();
// 		});
// 	});
//
// });
