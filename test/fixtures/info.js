var requestModule = require('supertest-as-promised');

exports.request = requestModule('http://localhost:2000');

exports.secret = '2Fx64jQ54asz8MD92MOVBOWS';
