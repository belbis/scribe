
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
  this.stream = options.stream || null;
  this.path = null; // only gets created on init
  //this.fmt = options.format || "";
  //this.maxBytes = options.maxBytes || ""; // max size of file (continued writes will overwrite last line)
  //this.closeOnPost = options.closeOnPost; // close write stream on each message
}
util.inherits(File, Stream);

/**
 * init
 *
 * opens write stream to file
 */
File.prototype.init = function() {
  if (!this.stream) {
    this.path = path.join(this.dir, this.file);
    if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
    var stream = fs.createWriteStream(this.path, this.fileOptions);
    stream.on("open", this._init_cb.bind(this));
    this.setStream(stream);
  } else {
    this._init_cb(null, true);
  }

};

/**
 * _init_cb
 *
 * invoked when file stream is open for writing
 * @param fd file descriptor
 * @private
 */
File.prototype._init_cb = function(fd) {
  this.emit("init", fd);
};

/**
 * shutdown
 *
 * closes the write stream to file
 */
File.prototype.shutdown = function() {
  if (this.stream) {
    fs.close(this.stream, this._shutdown_cb.bind(this));
  } else {
    this._shutdown_cb(null, true);
  }
};

File.prototype._shutdown_cb = function(e,r) {
  if (e) {
    this.emit("error", e);
  } else {
    this.emit("shutdown", r);
  }
};

/**
 * post
 *
 * writes the message to file outstream
 * then determines if its time to rotate
 * @param msg
 */
File.prototype.post = function(msg) {
  //if (this.closeOnPost) this.init();  // need to reopen stream on this case

  /*if (this.rotate) {
    var msgSize = Buffer.byteLength(msg, "utf8");  // find length of message to post
    if (fs.statSync(this.path).size + msgSize <= this.maxBytes) {
      // message within range
      if (this.rotateType === ROTATE_TYPES.DATE) {
        // date rotation
        throw new Error("not implemented");
      } else {
        // size rotation
        throw new Error("not implemented");
      }
    } else {
      throw new Error("size limit exceeded");
    }
  } else {*/
    this.stream.write(msg, this.encoding, this._msg_cb.bind(this));
  //}
};


// export module
module.exports = {
  File: File
};