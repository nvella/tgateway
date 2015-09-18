var net = require('net'); // Pull in 'net' for tcp server

var Endpoint = function(app, frontend, sock) {
  this._app      = app;
  this._frontend = frontend;
  this.sock      = sock;
}

Endpoint.prototype.init = function() {
  this.sock.on('disconnect', this.deinit);

  // Connect the endpoint to the app so menus can be displayed, so on so forth
  var addr = this.sock.address();
  console.log("tcp server[" + this._frontend.config.port + "] endpoint started (" +
    addr.address + ":" + addr.port + ")");

  this._app.connectEndpoint(this, this._frontend);
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
