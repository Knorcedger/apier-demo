describe('/services/rates Service', function() {

	it('should retrieve the currency rates from external api having as base currency USD', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				secret: APIKEY
			},
			type: 'GET',
			url: '/v1/services/rates'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
		});
	});


	it('should retrieve the currency rates from external api having as base currency EUR', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				baseCurrency: 'EUR',
				secret: APIKEY
			},
			type: 'GET',
			url: '/v1/services/rates'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
		});
	});

	it('should retrieve the currency rates from external api having as base currency USD even if the currency is invalid', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				baseCurrency: 'XXX',
				secret: APIKEY
			},
			type: 'GET',
			url: '/v1/services/rates'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
		});
	});
});
