var http = require('http');
var reqlog = require('reqlog');
var nconf = require('nconf');
var apier = require('apier');

reqlog.init(false);
nconf.argv()
	.env()
	.file({file: 'config.json'});

var app = apier(nconf);
require('./v1/users/all.js')(app);

var port = nconf.get('port');
http.createServer(app).listen(port, function() {
	reqlog.warn('server.start.success', 'On port ' + port);
});
