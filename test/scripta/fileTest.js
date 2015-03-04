
// standard imports
var assert = require("assert");
var path = require("path");
var fs = require("fs");

// local imports
var File = require("../../").scripta.File;

describe("File", function() {
  describe("functions", function() {
    describe("constructor", function() {
      it("prototype check", function() {
        var s = new File();
        assert(s.open instanceof Function);
        assert(s.write instanceof Function);
      });
    });

    describe("setters", function() {
    /*  it("#setStream", function() {
        var testDir = __dirname + "/../tmp";
        if (!fs.existsSync(testDir)) {
          fs.mkdir(testDir);
        }
        var testFile = "test.log";
        var filePath = path.join(testDir, testFile);
        var stream = fs.createWriteStream(filePath);
        var s = new File();
        s.setStream(stream);
        assert.deepEqual(s.stream, stream);
        stream.close();
        fs.unlinkSync(filePath);
        fs.rmdirSync(testDir);
      });*/
    });

    describe("#open", function() { // inherited from Scriptum
      it("should create file stream and emit open", function(done) {
        var options = {
          dir: __dirname + "/../tmp/",
          file: "out.log"
        };
        var s = new File(options);
        s.on("open", function(f) {
          fs.unlinkSync(path.join(options.dir, options.file));
          fs.rmdirSync(options.dir);
          done();
        });
        s.open();
      });
    });

    describe("#write", function() {
      it("should log and emit", function(done) {
        var options = {
          dir: __dirname + "/../tmp/",
          file: "out.log"
        };
        var s = new File(options);
        s.open();
        var _write_cb =  function() {
          fs.unlinkSync(path.join(options.dir, options.file));
          fs.rmdirSync(options.dir);
          done();
        };
        s.write("msg", null, _write_cb);
      });
    });

    describe("#close", function() {
      it("should close file stream and emit close", function(done) {
        var s = new File();
        s.on("close", function() {
          done();
        });
        s.close();
      })
    })
  });
});