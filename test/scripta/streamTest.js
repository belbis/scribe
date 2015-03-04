
// standard imports
var assert = require("assert");
var fs = require("fs");

// local imports
var Stream = require("../../").scripta.Stream;

// for use with writing to stdout
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

// test cases
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
        var unStub = stub();
        s.write("msg", null, done);
        unStub();
      });
    });

    describe("#close", function() {
      it("should noop and emit", function(done) {
        var s = new Stream();
        s.on("close", done);
        s.close();
      });
    });
  });
});