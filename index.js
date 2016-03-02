var http = require('http');
var reqlog = require('reqlog');
var nconf = require('nconf');
var apier = require('apier');

reqlog.init(false);
nconf.argv()
	.env()
	.file({file: 'config.json'});

// find the database url
// select set db, or local
reqlog.info('DB used', process.env.DB || 'production');

var app = apier({
	mongoUrl: nconf.get('databases')[process.env.DB || 'production'],
	access: nconf.get('access'),
	handleErrors: true,
	schemas: [require('./schemas/sessionSchema')]
});

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
