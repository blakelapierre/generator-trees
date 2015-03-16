"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

var expect = _interopRequire(require("expect.js"));

var sync = require("../promises").sync;

var toGenerator = require("../generators").toGenerator;

describe("sync", function () {
  it("should run twice", function () {
    sync(toGenerator([promise(1), promise(2)]), function (result, count) {
      return console.log(count, resule);
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
//# sourceMappingURL=promises.js.map