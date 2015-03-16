"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

var expect = _interopRequire(require("expect.js"));

var _promises = require("../promises");

var sync = _promises.sync;
var async = _promises.async;

var _generators = require("../generators");

var toGenerator = _generators.toGenerator;
var transform = _generators.transform;

describe("sync", function () {
  it("should run twice", function () {
    sync(toGenerator([promise(1), promise(2)]), function (result, count) {
      return console.log(count, result);
    }, function (error) {
      return console.log("error", error);
    });

    var counter = 0;
    function promise(value) {
      return new _core.Promise(function (resolve) {
        counter++;
        resolve(value);
      });
    }
  });
});

describe("async", function () {
  it("should run once", function () {
    var counter = 0;

    return async(2, transform(toGenerator([1]), function (value) {
      return promise(value);
    }), function (result, count) {
      return console.log(count, result);
    }, function (error) {
      return console.log("error", error);
    });

    function promise(value) {
      return new _core.Promise(function (resolve) {
        counter++;
        console.log("counter", counter);
        resolve(value);
      });
    }
  });
});
//# sourceMappingURL=promises.js.map