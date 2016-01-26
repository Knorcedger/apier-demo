beforeEach(function() {

   var customMatchers = {
      // REQUEST RELATED
      toHaveSuccessMeta: function(expected) {
         var result = true,
            meta = this.actual.meta;

         if (meta.statusCode !== 'OK') {
            result = false;
         }

         return result;
      },
      toHaveFailMeta: function(expected) {
         var result = true,
            meta = this.actual.meta;

         if (meta.statusCode === 'OK') {
            result = false;
         }

         return result;
      },
      toBeSuccessful: function(expected) {
         expect(expected).toHaveBeenCalled();
         var response = expected.argsForCall[0][0];
         expect(response).toHaveTheseAttributes(basicStructure);
         expect(response).toHaveSuccessMeta();
         // i dont know why this is used for, but based on the source code, it allows me to return the response
         this.reportWasCalled_ = true;

         return response;
      },
      toBeErrorful: function(expected, statusCode) {
         expect(expected).toHaveBeenCalled();
         var response = expected.argsForCall[0][0];
         expect(response).toHaveTheseAttributes(basicStructure);
         expect(response).toHaveFailMeta();
         expect(response.data).toBeNull();
         expect(response.meta.statusCode).toBe(statusCode);
         // i dont know why this is used for, but based on the source code, it allows me to return the response
         this.reportWasCalled_ = true;

         return response;
      },
      //STRINGS RELATED
      toBeId: function() {
         var result = true,
            value = this.actual;

         if (value.length !== 24) {
            result = false;
         }

         return result;
      },
      toBeEmail: function() {
         var result = true,
            value = this.actual;
           var reg_expr = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
           return reg_expr.test(value);
      },
      toBeNotEmptyString: function() {
         var result = true,
            value = this.actual;

         if (value === '') {
            result = false;
         }

         return result;
      },
      toBeCanonical: function() {
         var result = true,
            value = this.actual;

         var regex = /[^a-zα-ωάέήύίόώϊ-]/g;
         result = !regex.test(value);
         return result;
      },
      toBeString: function() {
         var result = true,
            value = this.actual;

         result = _.isString(value);

         return result;
      },
      toHaveMaxLengthOf: function(maxLength) {
         var result = true,
            value = this.actual;

         result = (value.length <= maxLength);

         return result;
      },
      // NUMBER RELATED
      toBeNumber: function() {
         var result = true,
            value = this.actual;

         if (!_.isNumber(value)) {
            result = false;
         }

         return result;
      },
      toBeTimestamp: function() {
         var result = true,
            value = this.actual;

         if (!value.toString().match(/^\d+$/) || value < 0) {
            result = false;
         }

         return result;
      },
      // ARRAY RELATED
      toBeArray: function() {
         var result = true,
            value = this.actual;

         result = _.isArray(value);

         return result;
      },
      toBeEmptyArray: function() {
         var result = true,
            value = this.actual;
         result = _.isArray(value);
         result = !value.length;

         return result;
      },
      toBeNotEmptyArray: function() {
         var result = true,
            value = this.actual;

         result = _.isArray(value);
         result = value.length;

         return result;
      },
      toExistIn: function(expected) {
         var result = true,
            value = this.actual;

         if (expected.indexOf(value) === -1) {
            result = false;
         }

         return result;
      },
      toBeListOf: function(endpoint) {
         var value = this.actual;

         for (var i = 0, length = value.length; i < length; i++) {
            expect(value[i])['toBe' + endpoint]();
         }

         return true;
      },
      // IMAGE RELATED
      toBeImageType: function() {
         var result = true,
            value = this.actual;

         if (['jpeg', 'jpg', 'png', 'gif'].indexOf(value) === -1) {
            result = false;
         }

         return result;
      },
      toBeImagePath: function() {
         var result = true,
            value = this.actual,
            validTypes = ["jpg", "jpeg", "png", "gif"];

         result = _.indexOf(validTypes, value.split(".").pop()) < 0 ? false : true;

         return result;
      },
      // OBJECT RELATED
      toHaveTheseAttributes: function(expected) {
         var result = true,
            response = this.actual;

         var keys = _.keys(response);
         var intersection = _.intersection(keys, expected);
         if (_.difference(intersection, expected).length !== 0) {
            result = false;
         }

         return result;
      }
   };

   this.addMatchers(customMatchers);


});
