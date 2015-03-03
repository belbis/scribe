
// standard imports
var fs = require("fs");

var scripta = {};
var scriptureDir = __dirname + "/scripta";

// load scripta
var files = fs.readdirSync(scriptureDir).forEach(function(file) {
  var scripturumPath = scriptureDir + "/" + file;
  var mod = require(scripturumPath);
  var key = Object.keys(mod)[0];
  scripta[key] = mod[key];
});

// module export
module.exports = scripta;