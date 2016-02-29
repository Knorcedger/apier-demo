var mongoose = require('mongoose');
var nconf = require('nconf');
var schemaExtender = require('mongoose-schema-extender');

var sessionSchema = new mongoose.Schema({
	expires: {type: Date, default: Date.now() + nconf.get('session').timeout},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
	collection: 'sessions'
});

// says which attributes each user role can see
sessionSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		expires: ['null'],
		userId: ['null']
	};
};

sessionSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, mongoose, sessionSchema, 'Session',
		save, populations);
};

sessionSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, mongoose, sessionSchema, 'Session',
		query, populations);
};

sessionSchema.methods.findById = function(req, res, id) {
	return schemaExtender.findById(req, res, mongoose, sessionSchema,
		'Session', id);
};

// sessionSchema.methods.find = function(req, res, query, populations) {
// 	return schemaExtender.find(req, res, sessionSchema, 'Session', query, populations);
// };

sessionSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, mongoose, sessionSchema,
		'Session', id);
};

mongoose.model('Session', sessionSchema);
