
// standard imports
var fs = require("fs");

var scriptura = {};
var scriptureDir = __dirname + "/scriptura";

// load scriptura
var files = fs.readdirSync(scriptureDir).forEach(function(file) {
  var scripturumPath = scriptureDir + "/" + file;
  var mod = require(scripturumPath);
  var key = Object.keys(mod)[0];
  scriptura[key] = mod[key];
});

// module export
module.exports = scriptura;