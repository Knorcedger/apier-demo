describe('/projects/:id Service', function() {

	it('should retrieve a project by id (id param) when valid data are sent', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				secret: APIKEY,
				token: localStorage.getItem('memberToken')
			},
			type: 'GET',
			url: '/v1/projects/' + localStorage.getItem('projectId')
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
		});
	});
});
