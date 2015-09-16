// no idea about proper javascript naming conventions
// if anyone knows, please find+replace and PR, I'll test.

var TGateway = function(config) {
  this.config = config;

  // Front/back-end drivers, ready to be initialised into the separate front and
  // back-end instances later.
  this.frontendDrivers = {};
  this.backendDrivers  = {};
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
}

module.exports = TGateway;
