
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
  this.buffer = options.buffer || false; // buffer messages in batches of 10
  this.queue = null; // sqs
}
util.inherits(SQS, Scriptum);

/**
 * init
 *
 * initialized connection to SQS
 */
SQS.prototype.init = function() {
  this.queue = new aws.SQS(this.sqsOptions);
};

/**
 * post
 *
 * writes a message to SQS
 * @param {string} msg messgae to be posted
 */
SQS.prototype.post = function(msg) {
  this.queue.sendMessage(this._constructMessage(msg), this._msg_cb.bind(this));
};

/**
 * _msg_cb
 *
 * callback for sent message
 * @param e
 * @param r
 * @private
 */
SQS.prototype._msg_cb = function(e,r) {
  if (e) {
    this.emit("error", e);
  } else {
    this.emit("logged", r);
  }
};

/**
 * _constructMessage
 * @param msg
 * @returns {{}}
 * @private
 */
SQS.prototype._constructMessage = function(msg) {
  return {MessageBody: msg};
};

/**
 * shutdown
 *
 * shuts down connection to remote queue
 */
SQS.prototype.shutdown = function() {
  this.queue = null;
};


// export module
module.exports = {
  SQS: SQS
};