
// standard imports
var util = require("util");

// npm imports
var aws = require("aws-sdk");

// local imports
var Scriptum = require(__dirname + "/scriptum").Scriptum;

/**
 * SQS
 *
 * @param {object} [options] options
 * a Scriptum that writes to Amazon AWS SQS
 */
function SQS(options) {
  Scriptum.call(this, options);

  options = options || {};
  this.sqsOptions = options.sqs || {}; // sqs constructor options
  this.buffer = options.buffer || false; // buffer messages
  this.bufferMax = 10; // this value is AWS SQS limit for batch writes
  this._chunks = [];
  this._queue = null; // sqs

  // as a standalone write stream this is necessary
  this.on("error", this._error);
}
util.inherits(SQS, Scriptum);

/**
 * _open
 *
 * initialized connection to SQS
 */
SQS.prototype._open = function() {
  this._queue = new aws.SQS(this.sqsOptions);
  this.emit("open");
};

/**
 * _write
 * @param chunk
 * @param encoding
 * @param callback
 * @private
 */
SQS.prototype._write = function(chunk, encoding, callback) {
  if (this.buffer) {
    this._chunks.push(this._process_chunk(chunk, encoding));
    if (this._chunks.length === this.bufferMax) { // time to flush the buffer
      this._queue.sendMessageBatch({Entries: this._chunks}, callback);
      this._chunks.length = 0; // reset arr
    } else {
      callback && callback(null, true);
    }
  } else {
    this._queue.sendMessage(this._process_chunk(chunk, encoding), callback);
  }
};

/**
 * _process_chunk
 * @param chunk
 * @param encoding
 * @returns {{MessageBody: *}}
 * @private
 */
SQS.prototype._process_chunk = function(chunk, encoding) { // todo: incorporate encoding
  if (this.buffer) {
    return {
      Id: this._chunks.length+"",
      MessageBody: chunk.toString()
    };
  } else {
    return {
      MessageBody: chunk.toString()
    };
  }
};

/**
 * shutdown
 *
 * shuts down connection to remote queue
 */
SQS.prototype._close = function() {
  if (this._chunks.length) {
    this._queue.sendMessage({Entries: this._chunks}, this._close_cb.bind(this));
    this._chunks.length = 0;
  } else {
    this.emit("close");
  }
};

/**
 * _close_cb
 *
 * close callback if chunks needed to be written
 * @param e
 * @param r
 * @private
 */
SQS.prototype._close_cb = function(e,r) {
  if (e) {
    this.emit("error", e);
  } else {
    this._queue = null;
    this.emit("close");
  }
};

/**
 * _error
 * @private
 */
SQS.prototype._error = function(e) {
  // do nothing...
};


// export module
module.exports = {
  SQS: SQS
};