
// standard imports
var util = require("util");

// local imports
var Scriptum = require(__dirname + "/scriptum").Scriptum;

/**
 * STDOut
 *
 * a scriptum implementation for console output
 * @param [options] options
 * @constructor
 */
function STDOut(options) {
  Scriptum.call(this);
  options = options || {};
  this.id = options.id || "console";
  this.level = options.level || "info";
}
util.inherits(STDOut, Scriptum);

/**
 * post
 *
 * writes a message to the console
 * @param {string} msg message to be posted
 */
STDOut.prototype.post = function(msg) {
  process.stdout.write(msg + "\n");
  this.emit("posted");
};


// export module
module.exports = {
  STDOut: STDOut
};