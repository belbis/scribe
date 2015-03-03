
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
  noop();
  this.emit("initialized");
};

/**
 * post
 *
 * writes the message
 */
Scriptum.prototype.post = function(msg, callback) {
  noop();
  this.emit("posted");
};


// export module
module.exports = {
  Scriptum: Scriptum
};