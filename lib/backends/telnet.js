var net = require('net');

var Endpoint = function(app, backend, sock) {
  this._app     = app;
  this._backend = backend;
  this.sock     = sock;
  this.ready    = false;
}

Endpoint.prototype.init = function() {
  this.sock.on('connect', function() { this.ready = true; }.bind(this));
  // Do we actually need to hook into 'disconnect'?
  // Mainly the connection obj will have to keep tabs, not us
}

Endpoint.prototype.deinit = function() {
  // Pack up the socket
  this.sock.end();
  this.sock.destroy();
}

var Backend = function(app, config) {
  this._app = app;
  this.config = config;
  this.endpoints = [];
}

// Nothing neesd to be done for these as telnet is
// configured per connection
Backend.prototype.init   = function() {}
Backend.prototype.deinit = function() {}

Backend.prototype.newEndpoint = function() {
  console.log('tcp backend[' + this.config.host + ':' + this.config.port + '] spawning...');

  var sock = net.connect(this.config.port, this.config.host);
  var endpoint = new Endpoint(this._app, this, sock);
  this.endpoints.push(endpoint);
  endpoint.init();

  return endpoint;
}

module.exports = Backend;
