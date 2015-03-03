
// standard imports
var assert = require("assert");

// local imports
var Scriptum = require("../../").scripta.Scriptum;

describe("Scriptum", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new Scriptum();
        assert(s.init instanceof Function);
        assert(s.post instanceof Function);
      });
    });

    describe("#init", function() {
      it("should noop and emit", function(done) {
        var s = new Scriptum();
        s.on("init", done);
        s.init();
      });
    });

    describe("#post", function() {
      it("should noop and emit", function(done) {
        var s = new Scriptum();
        s.on("posted", done);
        s.post("msg");
      });
    });

    describe("#shutdown", function() {
      it("should noop and emit", function(done) {
        var s = new Scriptum();
        s.on("shutdown", done);
        s.shutdown();
      })
    });

  });
});