var scribe = require("scribe");

var logger = scribe.getLogger();
var scr = new scribe.scripta.SQS();
logger.open();
logger.add(scr);
logger.log("shaken, not stirred.");