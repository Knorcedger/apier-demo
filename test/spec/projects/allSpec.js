describe('/projects Service', function() {

	it('should retrieve all projects that exist in database when valid data are sent (5.2.1)', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				secret: APIKEY,
				token: localStorage.getItem('memberToken')
			},
			type: 'GET',
			url: '/v1/projects'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
			expect(response.data).toBeListOf('Project');
		});
	});
});
