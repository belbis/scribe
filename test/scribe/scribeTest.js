
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
      var c = new scribe.scripta.Console();
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
      var c = new scribe.scripta.Console();
      c.shutdown = function() {
        assert(1);
      };
      s.shutdown()
    });
  });

  describe("setters", function() {
    //describe("setLevel", function() {
    //  var s = scribe.getLogger();
    //  it("update level to info", function() {
    //    var newLevel = "off";
    //    s.setLevel(newLevel);
    //    assert.equal(scribe.levels[s.level], scribe.levels[newLevel.toUpperCase()])
    //  });
    //});

    describe("scripta operations", function() {

      var s = scribe.getLogger();

      describe("add", function() {
        it("should update scripta", function() {
          var c = new scripta.Console({id: "console"});
          s.add(c);
          assert(s.scripta[0] instanceof scripta.Console);
        });
      });

      describe("remove", function() {
        s.remove("console");
        assert.equal(s.scripta.length, 0)
      });
    });
  });

  describe("log", function() {

    var s = scribe.getLogger();

    it("should perform function", function() {
      // stub stdout to grab message
      var stack = [];

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
      var c = new scripta.Console();
      s.add(c);
      s.log("message");
      assert.equal(stack.pop(), "message"+"\n");
      unStub();
    });
  });
});