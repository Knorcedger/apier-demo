describe('/clans/:id/update Service', function() {
	it('should update a clan when valid data are sent', function() {
		var callback = jasmine.createSpy();
		var config = {
			data: {
				title: "Daclan" + Math.floor((Math.random()*10000)+1),
				description: 'A random description',
				trophies: [{
					count: 100,
					townhall: 8,
					member: 'test'
				}, {
					count: 200,
					townhall: 9,
					member: 'fire'
				}],
				members: [{
					username: 'gone'
				}, {
					username: 'yeah'
				}],
				url: 'fire',
				secret: APIKEY,
				token: localStorage.getItem('adminToken')
			},
			type: 'POST',
			url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
		};
		request(config, callback);
		waitsFor(function() {
			if (callback.callCount > 0) {
				return true;
			}
		});
		runs(function() {
			var response = expect(callback).toBeSuccessful(callback);
			expect(response.data).toBeClan();
		});
	});

	describe('Parameter Validation', function() {

		it('should return trophies.INVALID_DATATYPE error when trophies is not array', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Daclan" + Math.floor((Math.random()*10000)+1),
					description: 'A random description',
					trophies: 4,
					members: [{
						username: 'gone'
					}, {
						username: 'yeah'
					}],
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'trophies.INVALID_DATATYPE');
			});
		});

		it('should return trophies.INVALID_STRUCTURE error when trophies array contains a non object', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Daclan" + Math.floor((Math.random()*10000)+1),
					description: 'A random description',
					trophies: [{
						count: 100,
						townhall: 8,
						member: 'test'
					}, 4],
					members: [{
						username: 'gone'
					}, {
						username: 'yeah'
					}],
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'trophies.INVALID_STRUCTURE');
			});
		});

		it('should return trophies.INVALID_STRUCTURE error when trophies array hasnt the correct attributes', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Daclan" + Math.floor((Math.random()*10000)+1),
					description: 'A random description',
					trophies: [{
						number: 100,
						townhall: 8,
						member: 'test'
					}, {
						count: 200,
						townhall: 9,
						member: 'fire'
					}],
					members: [{
						username: 'gone'
					}, {
						username: 'yeah'
					}],
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'trophies.INVALID_STRUCTURE');
			});
		});

		it('should return members.INVALID_DATATYPE error when members is not array', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Daclan" + Math.floor((Math.random()*10000)+1),
					description: 'A random description',
					trophies: [{
						count: 100,
						townhall: 8,
						member: 'test'
					}, {
						count: 200,
						townhall: 9,
						member: 'fire'
					}],
					members: 'me',
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'members.INVALID_DATATYPE');
			});
		});

		it('should return members.INVALID_STRUCTURE error when members array contains a non object', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Daclan" + Math.floor((Math.random()*10000)+1),
					description: 'A random description',
					trophies: [{
						count: 100,
						townhall: 8,
						member: 'test'
					}, {
						count: 200,
						townhall: 9,
						member: 'fire'
					}],
					members: [{
						nickname: 'gone'
					}, 'yeah'],
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'members.INVALID_STRUCTURE');
			});
		});

		it('should return members.INVALID_STRUCTURE error when members array hasnt the correct attributes', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Daclan" + Math.floor((Math.random()*10000)+1),
					description: 'A random description',
					trophies: [{
						count: 100,
						townhall: 8,
						member: 'test'
					}, {
						count: 200,
						townhall: 9,
						member: 'fire'
					}],
					members: [{
						nickname: 'gone'
					}, {
						username: 'yeah'
					}],
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
			};
			request(config, callback);
			waitsFor(function() {
				if (callback.callCount > 0) {
					return true;
				}
			});
			runs(function() {
				var response = expect(callback).toBeErrorful(callback, 'members.INVALID_STRUCTURE');
			});
		});

		it('should return id.INVALID error when id is invalid)', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Latvia" + Math.floor((Math.random()*10000)+1).toString(),
					description: "The clan of Latvia is very small",
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/1234/update'
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

		it('should return id.INVALID error when id is invalid)', function() {
			var callback = jasmine.createSpy();
			var config = {
				data: {
					title: "Latvia" + Math.floor((Math.random()*10000)+1).toString(),
					description: "The clan of Latvia is very small",
					secret: APIKEY,
					token: localStorage.getItem('adminToken')
				},
				type: 'POST',
				url: '/v1/clans/1234/update'
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

		// it('should return url.EXISTS error when id is invalid)', function() {
		// 	var callback = jasmine.createSpy();
		// 	var config = {
		// 		data: {
		// 			url: 'fire',
		// 			secret: APIKEY,
		// 			token: localStorage.getItem('adminToken')
		// 		},
		// 		type: 'POST',
		// 		url: '/v1/clans/' + localStorage.getItem('clanId') + '/update'
		// 	};
		// 	request(config, callback);
		// 	waitsFor(function() {
		// 		if (callback.callCount > 0) {
		// 			return true;
		// 		}
		// 	});
		// 	runs(function() {
		// 		var response = expect(callback).toBeErrorful(callback, 'url.EXISTS');
		// 	});
		// });
	});
});
