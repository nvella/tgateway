// no idea about proper javascript naming conventions
// if anyone knows, please find+replace and PR, I'll test.

var fs = require('fs');
var Connection = require('./connection');

var TGateway = function(config) {
  this.config = config;

  // Front/back-end drivers, ready to be initialised into the separate front and
  // back-end instances later.
  this.frontendDrivers = {};
  this.backendDrivers  = {};

  // Front/back-end instances
  this.frontends = []; // TODO turn this into a hash, frontend ids
  this.backends  = {};

  // Menu templates
  this.templates = {};

  this.connections = []; // Array of connection objects
}

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

  // Using all synchronous code here for the setup
  // as we can wait until everything is loaded

  // Load menu templates
  console.log('loading menu templates...');
  for(var file of fs.readdirSync('templates')) {
    this.templates[file] = fs.readFileSync('templates/' + file);
  }

  // Load the backends from the config
  console.log("initializing backends...");
  for(var id in this.config.backends) {
    var obj = this.config.backends[id];
    console.log("  " + id + " " + obj.type);
    if(this.backendDrivers[obj.type] === undefined) {
      console.log("    - skipping as driver was not loaded");
    } else {
      // TODO initialize backend
    }
  }

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

TGateway.prototype.connectFrontEndpoint = function(endpoint, frontend) {
  endpoint.puts(TGateway.NAME + " version " + TGateway.VERSION);

  // Create connection object, init it and do the start action;
  var connection = new Connection(this, endpoint);
  connection.init(); // WARN should #init run blocking operations in the future, we need to implement callbacks, async
  connection.doAction(this.config.start); // Do the initial action
  connections.push(connection); // Push the connection onto the connections array
}

module.exports = TGateway;
