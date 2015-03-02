/**
 * Scribe index.js
 */
var src = process.env.SCRIBE_COV ? "/src-cov/" : "/src";
module.exports = require(__dirname + src + "/scribe");