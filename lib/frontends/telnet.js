var net = require('net'); // Pull in 'net' for tcp server

var Endpoint = function(app, driver, sock) {
  this._app    = app;
  this._driver = driver;
  this.sock    = sock;
}

Endpoint.prototype.init = function() {
  // Ask the app for a backend and connect to it
  var addr = this.sock.address();
  console.log("tcp server[" + this._driver.config.port + "] endpoint started (" +
    addr.address + ":" + addr.port + ")");
}

var Driver = function(app, config) {
  this._app      = app;
  this.config    = config;
  this.server    = null; // Not hosting anything right now
  this.endpoints = []; // An endpoint is a 'client' to the 'server's
                       // For modems, there will only ever be one endpoint
}

Driver.prototype.init = function() {
  // Initializes driver
  // TODO Open TCP server
  // Start accepting
  // Create a new worker for each connection and handle those
  // Etc etc so on so forth

  this.server = net.createServer(function(sock) {
    // `sock' is client socket
    // Create a new endpoint and push it onto the endpoints array
    var endpoint = new Endpoint(this._app, this, sock);
    this.endpoints.push(endpoint);
    endpoint.init();
  }.bind(this));

  this.server.listen(this.config.port, function() {
    console.log("tcp server[" + this.config.port + "] started.");
  }.bind(this));
}

module.exports = Driver;
