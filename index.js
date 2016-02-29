var http = require('http');
var reqlog = require('reqlog');
var nconf = require('nconf');
var apier = require('apier');
var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

reqlog.init(false);
nconf.argv()
	.env()
	.file({file: 'config.json'});

schemaExtender.handleError = true;

// find the database url
// select set db, or local
reqlog.info('DB used', process.env.DB || 'production');
db.connect(nconf.get('databases')[process.env.DB || 'production']);

var app = apier(nconf);

// authentications
require('./v1/authentications/login.js')(app);
require('./v1/authentications/register.js')(app);

// users
require('./v1/users/all.js')(app);
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
