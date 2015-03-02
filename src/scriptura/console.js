
// standard imports
var util = require("util");

// local imports
var Scripturum = require(__dirname + "/scripturum").Scripturum;

/**
 * Console
 *
 * a scripturum implementation for console output
 * @param [options] options
 * @constructor
 */
function Console(options) {
  Scripturum.call(this);
  options = options || {};
  this.id = options.id || "console";
  this.level = options.level || "info";
}
util.inherits(Console, Scripturum);

/**
 * post
 *
 * writes a message to the console
 * @param {string} msg message to be posted
 */
Console.prototype.post = function(msg) {
  if (console[this.level] instanceof Function) {
    console[this.level](msg);
  } else {
    process.stdout.write(msg + "\n");
  }
  this.emit("logged");
};


// export module
module.exports = {
  Console: Console
};