
// standard imports
var assert = require("assert");
var path = require("path");
var fs = require("fs");

// local imports
var DevNull = require("../../").scripta.DevNull;

describe("DevNull", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new DevNull();
        assert(s.open instanceof Function);
        assert(s.write instanceof Function);
        assert(s.close instanceof Function);
      });
    });
    
    describe("#open", function() { // inherited from Scriptum
      it("should create file stream and emit open", function(done) {
        var s = new DevNull();
        s.on("open", function() {
          done();
        });
        s.open();
      });
    });

    describe("#write", function() {
      it("should log and emit", function(done) {
        var s = new DevNull();
        s.open();
        var _write_cb =  function() { // clean up tmp file
          done();
        };
        s.write("msg", null, _write_cb);
      });
    });

    describe("#close", function() {
      it("no open file stream should emit close", function(done) {
        var s = new DevNull();
        s.on("close", function() {
          done();
        });
        s.close();
      });

      it("open file stream should close stream and emit close", function(done) {
        var s = new DevNull();
        s.open();
        s.on("close", function() { // clean up tmp file
          done();
        });
        s.close();
      });
    })
  });
});