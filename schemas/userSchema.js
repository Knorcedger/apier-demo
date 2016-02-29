var mongoose = require('mongoose');
var schemaExtender = require('mongoose-schema-extender');
var nconf = require('nconf');

var typeEnums = nconf.get('users').types;

var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, unique: true, required: true, trim: true},
	type: {type: String, trim: true, required: true, enum: typeEnums}
}, {
	collection: 'users'
}, {
	versionKey: false
});

// says which attributes each user role can see
userSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		username: ['null'],
		email: ['null']
	};
};

userSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, mongoose, userSchema, 'User', save,
		populations);
};

userSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, mongoose, userSchema, 'User',
		query, populations);
};

userSchema.methods.findById = function(req, res, id, populations) {
	return schemaExtender.findById(req, res, mongoose, userSchema, 'User',
		id, populations);
};

userSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, mongoose, userSchema,
		'User', id);
};

userSchema.methods.find = function(req, res, query, populations) {
	return schemaExtender.find(req, res, mongoose, userSchema, 'User',
		query, populations);
};

userSchema.methods.findByIdAndUpdate = function(req, res, id, update,
	options, populations) {
	return schemaExtender.findByIdAndUpdate(req, res, mongoose, userSchema,
		'User', id, update, options, populations);
};

userSchema.methods.findOneAndUpdate = function(req, res, query, update,
	options, populations) {
	return schemaExtender.findOneAndUpdate(req, res, mongoose, userSchema,
		'User', query, update, options, populations);
};

module.exports = mongoose.model('User', userSchema);
