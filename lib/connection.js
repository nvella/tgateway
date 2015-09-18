var Connection = function(app, frontEndpoint) {
  this._app = app;

  // Current state
  this.frontEndpoint = frontEndpoint;
  this.backEndpoint = null;
  this.menu = null;

  // Run the default action
  this.doAction(app.config.start);
}

Connection.prototype.doAction = function(action) {
  if(action.menu !== undefined) {
    // Init menu
    return;
  }

  // More actions down here
}

Connection.prototype.init = function() {

}
