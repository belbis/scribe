
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
      it("stub should invoke sendMessage and emit", function(done) {
        var s = new SQS();
        var m = "vodka tonic";
        s.init();
        s.on("posted", function(r) {
          assert.equal(r.MessageBody, m); // note: this response will be actual aws SQS response obj..
          done();
        });
        s.queue.sendMessage = function(msg, cb) {
          assert.deepEqual(msg, {MessageBody: m});
          cb(null, msg);
        };
        s.post(m);
      });

      it("simulate error should emit error", function(done) {
        var s = new SQS();
        s.init();
        var err_msg = "error message";
        s.on("error", function(e){
          assert.equal(e.message, err_msg);
          done()
        });
        s.queue.sendMessage = function(msg, cb) {
          cb(new Error(err_msg));
        };
        s.post("");
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