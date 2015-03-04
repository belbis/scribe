
// standard imports
var assert = require("assert");

// local imports
var Scriptum = require("../../").scripta.Scriptum;

describe("Scriptum", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new Scriptum();
        assert.deepEqual(s.__proto__, Scriptum.prototype);
      });
    });

    describe("#open", function() {
      it("should throw error", function() {
        var s = new Scriptum();
        assert.throws(s.open, Error);
      });
    });

    describe("#write", function() {
      it("should throw error", function() {
        var s = new Scriptum();
        assert.throws(s._write, Error);
      });
    });

    describe("#close", function() {
      it("should throw error", function() {
        var s = new Scriptum();
        assert.throws(s.close, Error);
      })
    });

  });
});