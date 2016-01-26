describe('/projects/add Service', function() {
	it('should create a project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				title: 'Currency Converter',
				description: 'This application will be used to convert currencies',
				categories: ['android'],
				secret: APIKEY,
				token: localStorage.getItem('adminToken')
			},
			type: 'POST',
			url: '/v1/projects/add'
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
			localStorage.setItem('projectId', response.data._id);
			console.log("ProjectId: ", localStorage.getItem('projectId'));
			localStorage.setItem('projectTitle', response.data.title);
		});
	});

	it('should create a second project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				title: 'Malakas App',
				description: 'This application will be used for many malakes',
				categories: ['android', 'web'],
				secret: APIKEY,
				token: localStorage.getItem('adminToken')
			},
			type: 'POST',
			url: '/v1/projects/add'
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
			localStorage.setItem('projectId1', response.data._id);
			localStorage.setItem('projectTitle1', response.data.title);
		});
	});

	it('should create a third project when valid data are sent', function() {
		var callback = jasmine.createSpy();

		var config = {
			data: {
				title: 'Up2Up',
				description: 'This application will be used for those who like dancing',
				customerType: 'funky people who dance all the time',
				customerRequests: 'Users must have a mobile phone',
				techSpecs: 'N/A',
				secret: APIKEY,
				token: localStorage.getItem('adminToken')
			},
			type: 'POST',
			url: '/v1/projects/add'
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
			localStorage.setItem('projectId1', response.data._id);
			localStorage.setItem('projectTitle1', response.data.title);
		});
	});

});
