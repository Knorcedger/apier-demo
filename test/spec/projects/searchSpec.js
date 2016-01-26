describe('/projects/search Service', function() {

   it('should retrieve a project by title when search by title is performed', function() {
	  var callback = jasmine.createSpy();
	  var config = {
		 data: {
			title: localStorage.getItem('projectTitle'),
			secret: APIKEY,
			token: localStorage.getItem('memberToken')
		 },
		 type: 'GET',
		 url: '/v1/projects/search'
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


   describe('Parameter Validation', function() {
	  it('should return title.INVALID_LENGTH error when title is empty', function() {
		 var callback = jasmine.createSpy();
		 var config = {
			data: {
			   title: '',
			   secret: APIKEY,
			   token: localStorage.getItem('adminToken')
			},
			type: 'GET',
			url: '/v1/projects/search'
		 };
		 request(config, callback);
		 waitsFor(function() {
			if (callback.callCount > 0) {
			   return true;
			}
		 });
		 runs(function() {
			var response = expect(callback).toBeErrorful(callback, 'title.INVALID_LENGTH');
		 });
	  });
   });
});
