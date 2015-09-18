var BasicMenu = function(app, endpoint, config) {
  this._app = app;
  this._endpoint = endpoint;
  this.config = config;
  this.running = false;
}

BasicMenu.prototype.init = function() {
  // Write the template specified in the config to the buffer
  this._endpoint.sock.write(this._app.templates[this.config.template]);
  this.running = true;

  // Get user input
  getSelection.call(this);
}

function getSelection() {
  function onLine(str) {
    // TODO Process the line
    console.log("The user chose " + str);

    if(!(this.running)) return;
    this._endpoint.gets(onLine.bind(this));
  }

  this._endpoint.gets(onLine.bind(this));
}

BasicMenu.prototype.deinit = function() {
  this.running = false;
  // Cancel the gets operation we have going for option selection
  this._endpoint.cancelGets();
}

module.exports = BasicMenu;
