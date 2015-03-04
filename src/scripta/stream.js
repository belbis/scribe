
// standard imports
var stream = require("stream");
var util = require("util");

// local imports
var Scriptum = require(__dirname + "/scriptum").Scriptum;


/**
 * Stream
 *
 * generic Stream backend scriptum.
 * @constructor
 */
function Stream(options) {
  Scriptum.call(this);
  options = options || {};
  this._stream = options.stream || null; // a writable stream
  this.addNewLine = options.addNewLine || false; // adds new line at each write
}
util.inherits(Stream, Scriptum);

/**
 * init
 *
 * initialize
 */
Stream.prototype._open = function() {
  if (this._stream.writable) {
    this.emit("open");
  } else {
    this.emit("error", new Error(""));
  }
};

/**
 * _write
 *
 * implements write for stdout backed scriptum
 * @param msg
 * @param encoding
 * @param callback
 * @private
 */
Stream.prototype._write = function(msg, encoding, callback) {
  var buf;
  if (this.addNewLine) {
    buf = new Buffer(msg+"\n"); // for readability
  } else {
    buf = msg;
  }
  this._stream.write(buf, encoding, callback);
};

/**
 * setStream
 *
 * sets stream (which should be writable)
 * @param {stream.Writable} s
 */
Stream.prototype.setStream = function(s) {
  if (s instanceof stream.Writable || s instanceof stream.Duplex) { // process.stdout is Duplex
    this._stream = s;
  } else {
    throw new Error("stream must be instance of stream.Writable or stream.Duplex");
  }
};

/**
 * _close
 *
 * implements close for Stream scripta
 * @private
 */
Stream.prototype._close = function() {
  this._stream = null; // todo: if Duplex stream, need to close
  this.emit("close");
};


// export module
module.exports = {
  Stream: Stream
};