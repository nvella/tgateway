var Menus = require('./menus');

var Connection = function(app, frontEndpoint) {
  this._app = app;

  // Current state
  this.frontEndpoint = frontEndpoint;
  this.backEndpoint = null;
  this.menu = null;
}

Connection.prototype.doAction = function(action) {
  // If there is a current menu, let it go/deinit
  if(this.menu !== null) { this.menu.deinit(); this.menu = null; }
  // If there is a current backendpoint, deinit it.
  if(this.backEndpoint !== null) this.deinitBackend();

  // If the action is a menu, init the new menu
  if(action.menu !== undefined) {
    // Init menu
    this.menu = new Menus.Basic(this._app, this, this.frontEndpoint, this._app.config.menus[action.menu]);
    this.menu.init(); // This will display the menu to the user and wait for an option to be selected
    return;
  }

  // If the action is disconnect, pack things up
  if(action.disconnect !== undefined) {
    this.deinit();
    return;
  }

  // If the action is backend, connect to the backend
  if(action.backend !== undefined) {
    this.initBackend(action.backend);
  }

  // More actions down here
}

Connection.prototype.initBackend = function(id) {
  // Create a new backend endpoint from the specified backend
  this.backEndpoint = this._app.backends[id].newEndpoint();

  this.backEndpoint.sock.on('error', function() {
    // TODO better disconnect
    this.frontEndpoint.puts('Backend error occurred, please reconnect');
    this.deinit();
  }.bind(this));

  this.backEndpoint.sock.on('end', function() {
    // TODO better disconnect
    this.frontEndpoint.puts('Connection closed by backend');
    this.deinit();
  }.bind(this));

  this.frontEndpoint.puts("Connecting...");
  // Pipe the two sockets together
  this.backEndpoint.sock.pipe(this.frontEndpoint.sock);
  this.frontEndpoint.sock.pipe(this.backEndpoint.sock);
}

Connection.prototype.deinitBackend = function() {
  // Unpipe the two sockets
  this.backEndpoint.sock.unpipe(this.frontEndpoint.sock);
  this.frontEndpoint.sock.unpipe(this.backEndpoint.sock);
  // Call the backend's deinit
  this.backEndpoint.deinit();
  this.backEndpoint = null;
}

Connection.prototype.init = function() {

}

Connection.prototype.deinit = function() {
  if(this.menu !== null) { this.menu.deinit(); this.menu = null; } // Deinit the menu if it exists
  this.frontEndpoint.deinit(); // Deinit the front endpoint
  if(this.backEndpoint !== null) this.deinitBackend(); // Deinit the back endpoint if it exists.

  // Remove self from app 'connections' array
  var i = this._app.connections.indexOf(this);
  this._app.connections.splice(i, 1);
}

module.exports = Connection;
