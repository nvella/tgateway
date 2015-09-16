// tgateway reverse telnet server

var fs = require('fs');
var tgateway = new (require('./lib/tgateway'))(JSON.parse(fs.readFileSync('config.json')));

// Load frontend drivers
// Telnet frontend, allows clients to connect to the server via telnet
tgateway.loadFrontendDriver('telnet', require('./lib/tgateway/frontends/telnet'));

tgateway.run();
