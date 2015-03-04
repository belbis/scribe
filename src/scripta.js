
// standard imports
var fs = require("fs");

var scripta = {};
var scriptaDir = __dirname + "/scripta";

// load scripta
var files = fs.readdirSync(scriptaDir).forEach(function(file) {
  var scriptaPath = scriptaDir + "/" + file;
  var mod = require(scriptaPath);
  var key = Object.keys(mod)[0];
  scripta[key] = mod[key];
});

// module export
module.exports = scripta;