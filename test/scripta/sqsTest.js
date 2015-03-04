
// npm imports
var aws = require("aws-sdk");

// standard imports
var assert = require("assert");

// local imports
var scripta = require("../../").scripta,
  SQS = scripta.SQS;

describe("SQS", function() {
  describe("functions", function() {
    describe("#constructor", function() {
      it("prototype check", function() {
        var s = new SQS();
        assert(s.__proto__, scripta.scriptum);
      });
    });

    describe("#open", function() {
      it("should create new SQS instance and emit", function(done) {
        var s = new SQS() ;
        s.on("open", done);
        s.open();
      });
    });

    describe("#write", function() {
      it("stub should invoke sendMessage and emit", function(done) {
        var s = new SQS();
        var m = "vodka tonic";
        s.open();
        var _write_cb= function(e,r) {
          !e && done();
        };

        s._queue ={sendMessage: function(msg, cb){cb(0,1)}};

        //s._queue.sendMessage = function(msg, cb) { // todo: not stub private var?
        //  assert.deepEqual(msg, {MessageBody: m});
        //  console.log(cb);
        //  cb(0, 1);
        //};
        s.write(m, null, _write_cb);
      });

      it("stub should simulate error in sqs", function(done) {
        var s = new SQS();
        s.open();
        var m = "err msg";
        var _err_cb = function(e,r) {
          e && done();
        };
        s._queue = {sendMessage: function(msg, cb){cb(1,0)}};
        s.write(m, null, _err_cb);
      });
    });

    describe("#close", function() {
      it("should nullify remote queue and emit", function(done) {
        var s = new SQS();
        s.open();
        s.on("close", done);
        s.close();
      });
    });
  });
});