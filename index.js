var http = require('http');
var reqlog = require('reqlog');
var nconf = require('nconf');
var apier = require('apier');
var mongoose = require('mongoose');
var schemaExtender = require('mongoose-schema-extender');

reqlog.init(false);
nconf.argv()
	.env()
	.file({file: 'config.json'});

schemaExtender.handleError = true;

// find the database url
// select set db, or local
reqlog.info('DB used', process.env.DB || 'production');
var mongoUrl = nconf.get('databases')[process.env.DB || 'production'];

// initializes the db connection
mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', function(error) {
	reqlog.info('db.connect.fail', error);
});
db.once('open', function() {
	reqlog.info('db.connect.success');
});

var app = apier(nconf);
require('./v1/users/all.js')(app);
require('./v1/users/add.js')(app);
require('./v1/users/search.js')(app);
require('./v1/users/updateAll.js')(app);
require('./v1/users/edit.js')(app);
require('./v1/users/update.js')(app);
require('./v1/users/delete.js')(app);
require('./v1/users/get.js')(app);

var port = nconf.get('port');
http.createServer(app).listen(port, function() {
	reqlog.warn('server.start.success', 'On port ' + port);
});
