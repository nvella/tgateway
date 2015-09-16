// no idea about proper javascript naming conventions
// if anyone knows, please find+replace and PR, I'll test.

var TGateway = function(config) {
  this.config = config;

  // Front/back-end drivers, ready to be initialised into the separate front and
  // back-end instances later.
  this.frontendDrivers = {};
  this.backendDrivers  = {};

  // Front/back-end instances
  this.frontends = [];
  this.backends  = [];
};

TGateway.NAME = "tgateway";
TGateway.VERSION = "0.0.1";

TGateway.prototype.loadFrontendDriver = function(typeId, driver) {
  this.frontendDrivers[typeId] = driver;
  console.log("Loaded frontend driver " + typeId);
}

TGateway.prototype.loadBackendDriver = function(typeId, driver) {
  this.backendDrivers[typeId] = driver;
  console.log("Loaded backend driver " + typeId);
}

TGateway.prototype.run = function() {
  console.log(TGateway.NAME + " version " + TGateway.VERSION + " starting...");

  // Load the frontends from the config
  console.log("initializing frontends...");
  for(var obj of this.config.frontends) {
    console.log("  " + obj.type);
    if(this.frontendDrivers[obj.type] === undefined) {
      console.log("    - skipping as driver was not loaded");
    } else {
      // Initialize the front end with the frontend config
      var frontend = new (this.frontendDrivers[obj.type])(this, obj);
      this.frontends.push(frontend);
      frontend.init();
    }
  }
}

module.exports = TGateway;
