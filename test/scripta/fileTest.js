
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
        assert(s.init instanceof Function);
        assert(s.post instanceof Function);
      });
    });

    describe("setters", function() {
      it("#setStream", function() {
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
      });
    });

    describe("#init", function() { // inherited from Scriptum
      it("should create file stream and emit init", function(done) {
        var options = {
          dir: __dirname + "/../tmp/",
          file: "out.log"
        };
        var s = new File(options);
        s.on("init", function(f) {
          fs.unlinkSync(path.join(options.dir, options.file));
          fs.rmdirSync(options.dir);
          assert(typeof f === "number");
          done();
        });
        s.init();
      });
    });

    describe("#post", function() {
      it("should log and emit", function(done) {
        var options = {
          dir: __dirname + "/../tmp/",
          file: "out.log"
        };
        var s = new File(options);
        s.init();
        s.on("posted", function() {
          fs.unlinkSync(path.join(options.dir, options.file));
          fs.rmdirSync(options.dir)
          done();
        });
        s.post("msg");
      });
    });

    describe("#shutdown", function() {
      it("should close file stream and emit shutdown", function(done) {
        var s = new File();
        s.on("shutdown", function(d) {
          done()
        });
        s.shutdown();
      })
    })
  });
});