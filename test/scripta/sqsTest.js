
// npm imports
var aws = require("aws-sdk");

// standard imports
var assert = require("assert");

// local imports
var SQS = require("../../").scripta.SQS;

describe("SQS", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new SQS();
        assert(s.init instanceof Function);
        assert(s.post instanceof Function);
      });
    });

    describe("#init", function() {
      it("should create new SQS instance and emit", function(done) {
        var s = new SQS() ;
        s.on("init", done);
        s.init();
        assert(s.queue instanceof aws.SQS);
      });
    });

    describe("#post", function() {
      it("should invoke sendMessage and emit", function(done) {
        var s = new SQS();
        s.init();
        s.on("posted", done);
        var m = "vodka tonic";
        s.queue.sendMessage = function(msg) {
          assert.deepEqual(msg, {MessageBody: m});
        };
        s.post(m);
      });
    });

    describe("#shutdown", function() {
      it("should nullify remote queue and emit", function(done) {
        var s = new SQS();
        s.init();
        s.on("shutdown",done);
        s.shutdown();
      });
    });
  });
});