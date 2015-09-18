var BasicMenu = function(app, endpoint, config) {
  this._app = app;
  this._endpoint = endpoint;
  this.config = config;
}

BasicMenu.prototype.init = function() {
  // Write the template specified in the config to the buffer
  this._endpoint.sock.write(this._app.templates[config.template]);
  // Implement hooks on the endpoint socket
}

module.exports = BasicMenu;
