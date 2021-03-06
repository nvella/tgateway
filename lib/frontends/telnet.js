var net = require('net'); // Pull in 'net' for tcp server
var sockReadline = require('../sockreadline');

var Endpoint = function(app, frontend, sock) {
  this._app      = app;
  this._frontend = frontend;
  this.sock      = sock;

  this._cancelGetsFunc = null;
}

Endpoint.prototype.init = function() {
  this.sock.on('disconnect', this.deinit);

  // Connect the endpoint to the app so menus can be displayed, so on so forth
  var addr = this.sock.address();
  console.log("tcp server[" + this._frontend.config.port + "] endpoint started (" +
    addr.address + ":" + addr.port + ")");

  this._app.connectFrontEndpoint(this, this._frontend);
}

Endpoint.prototype.deinit = function() {
  // Code to run on disconnect, etc
  var i = this._frontend.endpoints.indexOf(this);
  this._frontend.endpoints.splice(i, 1);

  // Close, cleanup, destory the socket
  this.sock.end();
  this.sock.destroy();

  console.log("tcp server[] endpoint disconnected");
}

Endpoint.prototype.write = function(str, callback) {
  this.sock.write(str, callback);
}

Endpoint.prototype.puts = function(str, callback) {
  this.sock.write(str + "\n", callback);
}

// callback is called with first argument of string typed
Endpoint.prototype.gets = function(callback) {
  this._cancelGetsFunc = sockReadline(this.sock, function(str) {
    this._cancelGetsFunc = null; // Remove the cancelGets call
    callback(str);
  }.bind(this));
}

Endpoint.prototype.cancelGets = function() {
  if(this._cancelGetsFunc === null) return;
  this._cancelGetsFunc();
  this._cancelGetsFunc = null;
}

var Frontend = function(app, config) {
  this._app      = app;
  this.config    = config;
  this.server    = null; // Not hosting anything right now
  this.endpoints = []; // An endpoint is a 'client' to the 'server's
                       // For modems, there will only ever be one endpoint
}

Frontend.prototype.init = function() {
  // Initializes frontend
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

module.exports = Frontend;
