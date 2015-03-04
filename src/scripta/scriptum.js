
// standard imports
var stream = require("stream");
var events = require("events");
var util = require("util");

/**
 * Scriptum
 *
 * describes the interface for a backend module
 * of the scribe logger. all scripta are implemented
 * as writable streams
 * @constructor
 */
function Scriptum(options) {
  stream.Writable.call(this);
  options = options || {};
  this.level = options.level || "info";
}
util.inherits(Scriptum, stream.Writable);

/**
 * init
 *
 * initializes the scriptum stream
 */
Scriptum.prototype.open = function() {
  this._open();
};

/**
 * _open
 *
 * opens any remote connections for writing
 * @private
 */
Scriptum.prototype._open = function() {
  throw new Error("_open should be implemented by subclasses");
};

/**
 * _write
 *
 *
 * @param chunk
 * @param encoding
 * @param callback
 * @private
 */
Scriptum.prototype._write = function(chunk, encoding, callback) {
  throw new Error("_write should be implemented by subclasses");
};

/**
 * shutdown
 *
 * shutdown any remote connection
 */
Scriptum.prototype.close = function() {
  this._close();
};

/**
 * _close
 *
 * closes any connections previously opened
 * @private
 */
Scriptum.prototype._close = function() {
  throw new Error("_close should be implemented by subclasses");
};

/**
 * error
 *
 * wrap around subclass _error implementations
 * @param e
 */
Scriptum.prototype.error = function(e) {
  this._error(e);
};

/**
 * _error
 *
 * error handler
 * @param e
 * @private
 */
Scriptum.prototype._error = function(e) {
  throw new Error("_error should be implemented by subclasses");
};




// export module
module.exports = {
  Scriptum: Scriptum
};