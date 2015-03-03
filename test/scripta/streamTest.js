
// standard imports
var assert = require("assert");
var fs = require("fs");

// local imports
var Stream = require("../../").scripta.Stream;

describe("Stream", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new Stream();
        assert(s.init instanceof Function);
        assert(s.post instanceof Function);
      });
    });

    describe("setters", function() {
      it("#setStream", function() {
        var stream = process.stdout;
        var s = new Stream();
        s.setStream(stream);
        assert.deepEqual(s.stream, stream);
      });
    });

    describe("#init", function() { // inherited from Scriptum
      it("should noop and emit", function(done) {
        var s = new Stream();
        s.on("init", done);
        s.init();
      });
    });

    describe("#post", function() {
      it("should log and emit", function(done) {
        var s = new Stream();
        var stream = process.stdout;
        s.setStream(process.stdout);
        s.on("posted", done);
        s.post("msg");
      });
    });

    describe("#shutdown", function() {
      it("should noop and emit", function(done) {
        var s = new Stream();
        s.on("shutdown", done);
        s.shutdown();
      })
    })
  });
});