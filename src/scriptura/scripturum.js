
// standard imports
var events = require("events");
var util = require("util");

/**
 * Scripturum
 *
 * describes the interface for a backend module
 * of the scribe logger
 * @constructor
 */
function Scripturum(options) {
  events.EventEmitter.call(this);
  options = options || {};
  this.level = options.level || "info";
}
util.inherits(Scripturum, events.EventEmitter);

/**
 * init
 *
 * initializes the scripturum backend
 */
Scripturum.prototype.init = function() {
  noop();
  this.emit("initialized");
};

/**
 * post
 *
 * writes the message
 */
Scripturum.prototype.post = function(msg, callback) {
  noop();
  this.emit("posted");
};


// export module
module.exports = {
  Scripturum: Scripturum
};