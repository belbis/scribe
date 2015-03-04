var scribe = require("../");

var logger = scribe.getLogger();
var scr = new scribe.scripta.STDOut({addNewLine: true});
logger.open();
logger.add(scr);
logger.log("shaken, not stirred.");
logger.close();