
// standard imports
var assert = require("assert");

// local imports
var STDOut = require("../../").scripta.STDOut;

describe("STDOut", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new STDOut();
        assert(s.init instanceof Function);
        assert(s.post instanceof Function);
      });
    });

    describe("#init", function() { // inherited from Scriptum
      it("should noop and emit", function(done) {
        var s = new STDOut();
        s.on("init", done);
        s.init();
      });
    });

    describe("#post", function() {
      it("should log and emit", function(done) {
        var s = new STDOut();
        s.on("posted", done);
        s.post("msg");
      });
    });

    describe("#shutdown", function() {
      it("should noop and emit", function(done) {
        var s = new STDOut();
        s.on("shutdown", done);
        s.shutdown();
      })
    })
  });
});