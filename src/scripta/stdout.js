
// standard imports
var util = require("util");

// local imports
var Stream = require(__dirname + "/stream").Stream;

/**
 * STDOut
 *
 * a scriptum implementation for console output
 * @param [options] options
 * @constructor
 */
function STDOut(options) {
  Stream.call(this, options);
  options = options || {};
  this.id = options.id || "console";
  this.level = options.level || "info";
}
util.inherits(STDOut, Stream);

/**
 * _open
 *
 * sets stream to be stdout
 * @private
 */
STDOut.prototype._open = function() {
  this.setStream(process.stdout);
  this.emit("open");
};

/**
 * _close
 * @private
 */
STDOut.prototype._close = function() {
  this._stream = null;
  this.emit('close');
};

// export module
module.exports = {
  STDOut: STDOut
};