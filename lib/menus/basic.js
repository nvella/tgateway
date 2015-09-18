var BasicMenu = function(app, endpoint, config) {
  this._app = app;
  this._endpoint = endpoint;
  this.config = config;
}

BasicMenu.prototype.init = function() {
  // Write the template specified in the config to the buffer
  this._endpoint.sock.write(this._app.templates[this.config.template]);

  // Get user input
  getSelection.call(this);
}

function getSelection() {
  function onLine(str) {
    // TODO Process the line
    console.log("The user chose " + str);

    this._endpoint.gets(onLine.bind(this));
  };

  this._endpoint.gets(onLine.bind(this));
}

module.exports = BasicMenu;
