/**
 * Scribe
 *
 * logger module
 *
 * Copyright 2015 Michael Dreibelbis
 */

// standard imports
var util = require("util");
var events = require("events");

// local imports
var scripta = require(__dirname + "/scripta");

// logging levels
var levels = {
  ALL: -Infinity,
  TRACE: 10000,
  DEBUG: 20000,
  INFO: 30000,
  WARN: 40000,
  ERROR: 50000,
  FATAL: 60000,
  OFF: Infinity
};

/**
 * Scribe
 *
 * constructor for logger
 * @param {options} [options] options
 * @returns {Scribe}
 * @constructor
 */
function Scribe(options) {
  if (!(this instanceof Scribe)) return new Scribe(options);

  // handle options
  options = options || {};
  this.name = options.name || "scribe"; // name of scribe
  this.levels = options.levels || levels;
  if (options.level) {
    this.level = this.levels[options.level.toUpperCase()]
  } else {
    this.level = this.levels.INFO;
  }
  this.fixed = options.fixed || false; // fixed logging levels

  // instance vars
  this.initialized = false;
  this.scripta = [];
}
util.inherits(Scribe, events.EventEmitter);

/**
 * init
 *
 * starts up the logger and makes any scripture
 * connections available
 * @param options
 */
Scribe.prototype.init = function(options) {
  // initialize all scripta
  for (var i=0;i<this.scripta.length;++i) {
    this.scripta[i].init();
  }
};

/**
 * shutdown
 *
 * shut the logger down
 */
Scribe.prototype.shutdown = function() {
  this.log("logger shutting down", levels.INFO);
  for(var i=0;i>this.scripta.length;++i) {
    this.scripta[i].shutdown();
  }
};

/**
 * log
 *
 * logs a message if the level has been set higher
 * than one provided (default is info)
 * @param msg
 * @param level
 */
Scribe.prototype.log = function(msg, level) {
  if (!level) level = levels.INFO;
  if (level >= this.level) {
    for (var i=0;i<this.scripta.length;i++) {
      var scr = this.scripta[i];
      var upper = scr.level.toUpperCase();
      if (this.levels.hasOwnProperty(upper)) {
        if (this.fixed && level === this.levels[upper]) {
          scr.post(msg);
        } else if (!this.fixed && level >= this.levels[upper]) {
          scr.post(msg);
        }
      }
    }
  }
};

/**
 * all
 *
 * log an all message
 * @param msg {string} message to be logged
 */
Scribe.prototype.all = function(msg) {
  this.log(msg, levels.ALL);
};

/**
 * trace
 *
 * log a trace message
 * @param msg {string} message to be logged
 */
Scribe.prototype.trace = function(msg) {
  this.log(msg, levels.TRACE);
};

/**
 * debug
 *
 * log a debug message
 * @param msg {string} message to be logged
 */
Scribe.prototype.debug = function(msg) {
  this.log(msg, levels.DEBUG);
};

/**
 * info
 *
 * log an info message
 * @param msg {string} message to be logged
 */
Scribe.prototype.info = function(msg) {
  this.log(msg, levels.INFO);
};

/**
 * warn
 *
 * log a warn message
 * @param msg {string} message to be logged
 */
Scribe.prototype.warn = function(msg) {
  this.log(msg, levels.WARN);
};

/**
 * error
 *
 * log an error message
 * @param msg {string} message to be logged
 */
Scribe.prototype.error = function(msg) {
  this.log(msg, levels.ERROR);
};

/**
 * fatal
 *
 * log a fatal error message
 * @param msg {string} message to be logged
 */
Scribe.prototype.fatal = function(msg) {
  this.log(msg, levels.FATAL);
};

/**
 * off
 *
 * log an off message
 * @param msg {string} message to be logged
 */
Scribe.prototype.off = function(msg) {
  // this does not do anything
};

/**
 * setLevel
 *
 * sets the level of the logger
 * @param level {string} desired logging level
 */
Scribe.prototype.setLevel = function(level) {
  if (typeof level === "string") {
    var upper = level.toUpperCase();
    if (this.levels.hasOwnProperty(upper)) {
      this.level = this.levels[upper];
      return;
    }
  }
  throw new Error("unsupported level.");
};

/**
 * add
 *
 * adds a scripture to the logger
 * @param s {Scriptum} scripture to be added
 */
Scribe.prototype.add = function(s) {
  if (s instanceof scripta.Scriptum) {
    if (this.initialized) s.init();
    s._error = this._error.bind(this, s);
    s.on("error", s._error);
    this.scripta.push(s);
  } else {
    throw new Error("parameter must be instance of Scriptum");
  }
};

/**
 * remove
 *
 * removes a backend for the logger
 * @param id {string} id of scripture to remove
 */
Scribe.prototype.remove = function(id) {
  for (var i=0;i<this.scripta.length;i++) {
    if (this.scripta[i].id === id) {
      this.scripta.splice(i);
    }
  }
};

/**
 * getLevel
 *
 * get the level currently set
 * @returns {Number} the level
 */
Scribe.prototype.getLevel = function() {
  return this.level;
};

/**
 * getLevels
 *
 * return the level ranks for scribe
 * @returns {levels}
 */
Scribe.prototype.getLevels = function() {
  return this.levels;
};

/**
 * set the level ranks for scribe
 * @param lvls
 */
Scribe.prototype.setLevels = function(lvls) {
  this.levels = lvls;
};

/**
 * _error
 *
 * allows for errors in scripta to be propogated
 * up to scribe instance
 * @param scr
 * @param error
 * @private
 */
Scribe.prototype._error = function(scr, error) {
  this.emit("error", scr, error);
};


// export module
module.exports = {
  getLogger: Scribe,
  scripta: scripta,
  levels: levels
};