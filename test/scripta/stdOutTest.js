
// standard imports
var assert = require("assert");

// local imports
var STDOut = require("../../").scripta.STDOut;

describe("STDOut", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new STDOut();
        assert.deepEqual(s.__proto__, STDOut.prototype);
      });
    });

    describe("#open", function() { // inherited from Scriptum
      it("should noop and emit", function(done) {
        var s = new STDOut();
        s.on("open", done);
        s.open();
      });
    });

    describe("#write", function() {
      it("should log and emit", function(done) {
        var s = new STDOut();
        s.open();
        s.write("msg", null, done);
      });
    });

    describe("#close", function() {
      it("should noop and emit", function(done) {
        var s = new STDOut();
        s.on("close", done);
        s.close();
      })
    })
  });
});