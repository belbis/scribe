
// standard imports
var util = require("util");

// local imports
var Scriptum = require(__dirname + "/scriptum").Scriptum;

/**
 * Console
 *
 * a scriptum implementation for console output
 * @param [options] options
 * @constructor
 */
function Console(options) {
  Scriptum.call(this);
  options = options || {};
  this.id = options.id || "console";
  this.level = options.level || "info";
}
util.inherits(Console, Scriptum);

/**
 * post
 *
 * writes a message to the console
 * @param {string} msg message to be posted
 */
Console.prototype.post = function(msg) {
  process.stdout.write(msg + "\n");
  this.emit("logged");
};


// export module
module.exports = {
  Console: Console
};