// no idea about proper javascript naming conventions
// if anyone knows, please find+replace and PR, I'll test.

var TGateway = function(config) {
  this.config = config;
};
TGateway.NAME = "tgateway";
TGateway.VERSION = "0.0.1";

TGateway.prototype.run = function() {
  console.log(TGateway.NAME + " version " + TGateway.VERSION + " starting...");
}

module.exports = TGateway;
