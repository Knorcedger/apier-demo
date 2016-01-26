/**
 * In this file we include tests that examine an object
 */
beforeEach(function() {

	var customMatchers = {
		toBeUser: function() {
			var value = this.actual;
			expect(value).toHaveTheseAttributes(['_id', 'email', 'type']);
			expect(value._id).toBeId();
			expect(value.type).toBeNotEmptyString();
			expect(value.email).toBeEmail();
			if (value.name) {
				expect(value.name.firstname).toBeNotEmptyString();
				expect(value.name.lastname).toBeNotEmptyString();
			}
			return true;
		},

		toBeProject: function() {
			var value = this.actual;
			expect(value).toHaveTheseAttributes(['_id', 'title', 'description', 'features', 'categories', 'customerType', 'customerRequests', 'techSpecs', 'marketingPlan', 'financialForecast', 'creator', 'created', 'lastUpdted', 'projectApproved']);
			expect(value._id).toBeId();
			expect(value.title).toBeNotEmptyString();
			expect(value.description).toBeNotEmptyString();
			expect(value.features).toBeArray();
			expect(value.creator).toBeString();

			return true;
		},
		toBeFeatures: function() {
			var value = this.actual;

			for (var i = 0, length = value.length; i < length; i++) {
				expect(value[i]).toBeFeature();
			}

			return true;
		},
		toBeFeature: function() {
			var value = this.actual;

			expect(value).toHaveTheseAttributes(['_id', 'title', 'description','milestone', 'ratings', 'creator']);
			expect(value._id).toBeId();
			expect(value.title).toBeNotEmptyString();
			expect(value.description).toBeNotEmptyString();
			expect(value.ratings).toBeArray();
			expect(value.creator).toBeString();

			return true;
		},
		toBeRatings: function() {
			var value = this.actual;

			for (var i = 0, length = value.length; i < length; i++) {
				expect(value[i]).toBeRating();
			}

			return true;
		},
		toBeRating: function() {
			var value = this.actual;

			expect(value).toHaveTheseAttributes(['_id', 'grade', 'userId']);
			expect(value._id).toBeId();
			expect(value.grade).toBeNumber();
			expect(value.userId).toBeString();

			return true;
		}
	};

	this.addMatchers(customMatchers);
});
