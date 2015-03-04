
// standard imports
var util = require("util");
var path = require("path");
var fs = require("fs");

// local imports
var File = require("./file").File;

/**
 * DevNull
 *
 *  a special
 * @param {object} options
 * @constructor
 */
function DevNull(options) {
  File.call(this, options);

  if(/^win/.test(process.platform)) {
    //this.dir = "C:\\\\";
    throw new Error("windows not supported for this yet");
  } else {
    this.dir = "/dev";
    this.file = "null";
  }
}
util.inherits(DevNull, File);

// export module
module.exports = {
  DevNull: DevNull
};