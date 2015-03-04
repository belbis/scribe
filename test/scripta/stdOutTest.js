
// standard imports
var assert = require("assert");

// local imports
var STDOut = require("../../").scripta.STDOut;

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
        var unStub = stub();
        s.write("msg", null, done);
        unStub();
      });
    });

    describe("#close", function() {
      it("should noop and emit", function(done) {
        var s = new STDOut();
        s.on("close", done);
        s.close();
      });
    });
  });
});