
// standard imports
var util = require("util");

// local imports
var Scriptum = require(__dirname + "/scriptum").Scriptum;


/**
 * Stream
 *
 * implements a Scriptum as a writable stream
 * @constructor
 */
function Stream(options) {
  options = options || {};
  this.stream = options.stream || null;
  this.encoding = options.encoding || null;
}
util.inherits(Stream, Scriptum);

/**
 * init
 *
 * initialize
 */
Stream.prototype.init = function() {
  this.emit("init");
};

Stream.prototype.post = function(msg) {
  this.stream.write(msg, this.encoding, this._msg_cb.bind(this));
};

/**
 * _msg_cb
 *
 * callback for message write
 * @param e
 * @param r
 * @private
 */
Stream.prototype._msg_cb = function(e,r) {
  if (e) {
    this.emit("error", e);
  } else {
    this.emit("posted", r);
  }
};

/**
 * setStream
 *
 * sets stream (which should be writable)
 * @param {stream.Writable} s
 */
Stream.prototype.setStream = function(s) {
  this.stream = s;
};


// export module
module.exports = {
  Stream: Stream
};