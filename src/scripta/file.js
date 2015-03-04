
// standard imports
var util = require("util");
var path = require("path");
var fs = require("fs");

// local imports
var Stream = require("./stream").Stream;

// constants
var ROTATE_TYPES= {
  SIZE: "size", // size rotation
  DATE: "date" // date rotation
};

/**
 * File
 *
 * a scriptum implementation for files
 * @param {object} options
 * @constructor
 */
function File(options) {
  Stream.call(this, options);
  options = options || {};
  this.rotate = options.rotate || false;  // rotate file
  this.rotateType = options.rotateType || "size"; // file rotator will be
  this.dir = options.dir || "./log"; // location of log files
  this.file = options.file || "out.log"; // default log prefix (rotated files will handle)
  this.fileOptions = options.fileOptions || {flags: "a", encoding: "utf8"};
  this._stream = options.stream || null;
  this.path = null; // only gets created on open
}
util.inherits(File, Stream);

/**
 * _open
 *
 * opens write stream to file
 */
File.prototype._open = function() {
  if (!this._stream) {
    this.path = path.join(this.dir, this.file);
    if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
    var stream = fs.createWriteStream(this.path, this.fileOptions);
    stream.on("open", this._open_cb.bind(this));
    this.setStream(stream);
  } else {
    this._open_cb(null, true);
  }
};

/**
 * _open_cb
 *
 * invoked when file stream is open for writing
 * @param fd file descriptor
 * @private
 */
File.prototype._open_cb = function(fd) {
  this.emit("open");
};

/**
 * close
 *
 * closes the write stream to file
 */
File.prototype._close = function() {
  if (this._stream) {
    fs.close(this._stream, this._close_cb.bind(this));
  } else {
    this._close_cb(null, true);
  }
};

/**
 * _close_cb
 *
 * callback for closing file write stream
 * ensures close event emitted.
 * @param e
 * @param r
 * @private
 */
File.prototype._close_cb = function(e,r) {
  if (e) {
    this.emit("error", e);
  } else {
    this.emit("close");
  }
};

// _write inherited from Stream

// export module
module.exports = {
  File: File
};