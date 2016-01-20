var http = require('http');
var reqlog = require('reqlog');
var nconf = require('nconf');
var apier = require('apier');

reqlog.init(false);
nconf.argv()
	.env()
	.file({file: 'config.json'});

require('./v1/users/all.js')(apier);

var port = nconf.get('port');
http.createServer(apier.init()).listen(port, function() {
	reqlog.info('server.start.success', 'On port ' + port);
});
