
// standard imports
var events = require("events");
var util = require("util");

/**
 * Scriptum
 *
 * describes the interface for a backend module
 * of the scribe logger
 * @constructor
 */
function Scriptum(options) {
  events.EventEmitter.call(this);
  options = options || {};
  this.level = options.level || "info";
}
util.inherits(Scriptum, events.EventEmitter);

/**
 * init
 *
 * initializes the scriptum backend
 */
Scriptum.prototype.init = function() {
  this.emit("init");
};

/**
 * post
 *
 * writes the message
 */
Scriptum.prototype.post = function(msg) {
  this.emit("posted");
};

/**
 * shutdown
 *
 * shutdown any remote connection
 */
Scriptum.prototype.shutdown = function() {
  this.emit("shutdown");
};


// export module
module.exports = {
  Scriptum: Scriptum
};