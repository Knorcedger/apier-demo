describe('ResetDb', function() {

   it('should reset the database to begin the tests', function() {
      var callback = jasmine.createSpy();
      var config = {
         data: {
            hax: 'sfwfer3r3g4rdf344rdfgfkjl3j844fdfk343e',
            secret: APIKEY,
            token: localStorage.getItem('adminToken')
         },
         type: 'POST',
         url: '/v1/services/resetDb'
      };
      request(config, callback);
      waitsFor(function() {
         if (callback.callCount > 0) {
            return true;
         }
      });
      runs(function() {
         localStorage.clear();
         var response = expect(callback).toBeSuccessful(callback);
      });
   });
});
