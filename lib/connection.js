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
  if(this.menu !== null) this.menu.deinit();

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

  // More actions down here
}

Connection.prototype.init = function() {

}

Connection.prototype.deinit = function() {
  if(this.menu !== null) this.menu.deinit(); // Deinit the menu if it exists
  this.frontEndpoint.deinit(); // Deinit the front endpoint

  // Remove self from app 'connections' array
  var i = this._app.connections.indexOf(this);
  this._app.connections.splice(i, 1);
}

module.exports = Connection;
