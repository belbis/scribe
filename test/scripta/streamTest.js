
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
        assert.deepEqual(s.__proto__, Stream.prototype);
      });
    });

    describe("setters", function() {
      it("#setStream", function() {
        var stream = process.stdout;
        var s = new Stream();
        s.setStream(stream);
        assert.deepEqual(s._stream, stream); // todo: not use private var check
      });

      // todo: add test for check on writable
    });

    describe("#open", function() { // inherited from Scriptum
      it("should check that stream is writable and emit", function(done) {
        var s = new Stream();
        s.setStream(process.stdout);
        s.on("open", function() {
          done();
        });
        s.open();
      });

      it("should error if stream is not writable", function() {
        var s = new Stream();
        assert.throws(s.open, Error);
      });
    });

    describe("#write", function() {
      it("should log and emit", function(done) {
        var s = new Stream();
        s.setStream(process.stdout);
        s.write("msg", null, done);
      });
    });

    describe("#close", function() {
      it("should noop and emit", function(done) {
        var s = new Stream();
        s.on("close", done);
        s.close();
      })
    })
  });
});