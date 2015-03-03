
// standard imports
var assert = require("assert");

// npm imports
//var mocha = require("mocha");

// local imports
var scribe = require(__dirname + "/../../");
var scripta = scribe.scripta;

describe("Scribe", function() {

  describe("constructor", function() {
    var s = scribe.getLogger();
    it("should have prototype", function() {
      assert(s.trace instanceof Function);
      assert(s.debug instanceof Function);
      assert(s.info instanceof Function);
      assert(s.warn instanceof Function);
      assert(s.error instanceof Function);
      assert(s.fatal instanceof Function);
      assert(s.off instanceof Function);
      assert(s.info instanceof Function);
      assert(s.add instanceof Function);
      assert(s.remove instanceof Function);
      assert(s.getLevel instanceof Function);
    });

    describe("without options", function() {
      var s = scribe.getLogger();
      it("should set defaults", function() {
        assert(s.scripta instanceof Array);
        assert.equal(s.scripta.length, 0);
        assert.equal(s.level, scribe.levels["INFO"]);
      });
    });

    it("with options", function() {
      var o = {
        level: "INFO"
      };
      var s = new scribe.getLogger(o);
      assert.equal(s.level, s.levels[o.level]);
    });
  });

  describe("init", function() {
    var s = scribe.getLogger();
    it("should call scripta init", function() {
      var c = new scribe.scripta.STDOut();
      c.init = function() {
        assert(1);
      };
      s.add(c);
      s.init();
    });
  });

  describe("shutdown", function() {
    var s = scribe.getLogger();
    it("should call scripta shutdown", function() {
      var c = new scribe.scripta.STDOut();
      c.shutdown = function() {
        assert(1);
      };
      s.shutdown();
    });
  });

  describe("setters", function() {
    it("setLevel", function() {
      var s = scribe.getLogger();
      var newLevel = "all";
      s.setLevel(newLevel);
      assert.equal(s.level, scribe.levels[newLevel.toUpperCase()])
    });

    it("setLevels", function() {
      var s = scribe.getLogger();
      var lvls = {};
      s.setLevels(lvls);
      assert.deepEqual(s.levels, lvls);
    });
  });

  describe("getters", function() {
    it("getLevel", function() {
      var s = scribe.getLogger();
      var l = s.getLevel();
      assert.equal(l, scribe.levels.INFO);
    });

    it("getLevels", function() {
      var s = scribe.getLogger();
      assert.deepEqual(s.getLevels(), scribe.levels);
    });
  });

  describe("error", function() {
    it("emit", function() {
      //implement me
    });
  });

  describe("scripta operations", function() {
    var s = scribe.getLogger();
    describe("add", function() {
      it("should update scripta", function() {
        var c = new scripta.STDOut({id: "console"});
        s.add(c);
        assert(s.scripta[0] instanceof scripta.STDOut);
      });
    });

    describe("remove", function() {
      it("should update scripta", function() {
        s.remove("console");
        assert.equal(s.scripta.length, 0);
      });
    });
  });

  describe("logging functions", function() {
    var s = scribe.getLogger();
    var c = new scripta.STDOut();
    s.add(c);
    var stack = [];

    it("log", function() {
      var m = "martini";
      var stub = function() {
      var write = process.stdout.write;
      process.stdout.write = (function (write) {
        return function (buf, encoding, fd) {
          //write.apply(process.stdout, arguments);
          stack.push(buf.toString()); // our extra
        };
      }(process.stdout.write));
      return function () {
        process.stdout.write = write
      };
    };
    var unStub = stub();
      s.log(m);
      unStub();
    });

    var lvl = "all";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "glass";
      s.log = function(ms, l) {
        assert.equal(m, ms);
        assert.equal(scribe.levels.ALL, l);
      };
      s.all(m);
    });

    lvl = "trace";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "gin";
      s.log = function(ms, l) {
        assert.equal(m, ms);
        assert.equal(scribe.levels.TRACE, l);
      };
      s.trace(m);
    });

    lvl = "debug";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "gin";
      s.log = function(ms, l) {
        assert.equal(m, ms);
        assert.equal(scribe.levels.DEBUG, l);
      };
      s.debug(m);
    });

    lvl = "info";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "tonic";
      s.log = function(ms, l) {
        assert.equal(m, ms);
        assert.equal(scribe.levels.INFO, l);
      };
      s.info(m);
    });

    lvl = "warn";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "tonic";
      s.log = function(ms, l) {
        assert.equal(m, ms);
        assert.equal(scribe.levels.WARN, l);
      };
      s.warn(m);
    });

    lvl = "error";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "olive";
      s.log = function(ms, l) {
        assert.equal(m, ms);
        assert.equal(scribe.levels.ERROR, l);
      };
      s.error(m);
    });

    lvl = "fatal";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "onion";
      s.log = function(ms, l) {
        assert.equal(m, ms);
        assert.equal(scribe.levels.FATAL, l);
      };
      s.fatal(m);
    });

    lvl = "off";
    s.setLevel(lvl);
    it(lvl, function() {
      var m = "spear";
      s.log = function(ms, l) {};
      s.off(m);
    });
  });
});