// tgateway reverse telnet server

var fs = require('fs');
var tgateway = new (require('./lib/tgateway'))(JSON.parse(fs.readFileSync('config.json')));

tgateway.run();
