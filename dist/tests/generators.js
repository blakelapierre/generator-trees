"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _generators = require("../generators");

var repeat = _generators.repeat;
var toArray = _generators.toArray;
var toGenerator = _generators.toGenerator;
var map = _generators.map;
var transform = _generators.transform;
var zip = _generators.zip;
var modifiableStack = _generators.modifiableStack;
var modifiableStackAlt = _generators.modifiableStackAlt;

console.log("repeat", repeat);

// let g = require('../generators');
var should = require("should"),
    expect = require("expect.js");

describe("toArray", function () {

  it("should work with 1 value", function () {
    var value = 1,
        generator = repeat(value, 1),
        array = toArray(generator);

    array.should.be.eql([1]);
    array.should.not.be.eql([2]);

    // expect(g.toArray(generator)).to.be([1]);
  });
});

describe("transform", function () {
  var value = 1;

  it("should work with 1 value", function () {
    var generator = repeat(value, 1);

    expect(toArray(transform(generator, function (value) {
      return value + 1;
    }))).to.be.eql([2]);
  });
});

describe("zip", function () {
  var generators = toGenerator([toGenerator([1, 2, 3]), toGenerator([4, 5, 6])]);

  var cases = [["{args}.length generators of {1}.length items each", [[[1, 2, 3], [4, 5, 6]], [[1, 4], [2, 5], [3, 6]]]]];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(cases), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      (function () {
        var c = _step.value;

        console.log(c);
        var name = c[0],
            parameters = c[1],
            input = parameters[0],
            output = parameters[1];

        it("should work with " + name, function () {
          expect(toArray(zip(toGenerator([toGenerator(input[0]), toGenerator(input[1])])))).to.eql(output);
        });
      })();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  it("should work with 2 generators of 3 items each", function () {
    expect(toArray(zip(generators))).to.be.eql([[1, 4], [2, 5], [3, 6]]);
  });
});

describe("modifiableStackAlt", function () {
  var stack = [1];

  it("should run 2 times", function () {
    var count = 0;

    var array = toArray(map(modifiableStackAlt(stack), function (value) {
      count++;

      if (count == 1) stack.push(3);

      return value;
    }));

    expect(count).to.equal(2);
    expect(array).to.eql([1, 3]);
  });
});

describe("stuff", function () {
  describe("should generate " + 5 + " tests", function () {
    var indices = [0, 1, 2, 3, 4];
    for (var i = 0; i < 5; i++) {
      (function (i) {
        it("should be " + i, function () {
          expect(indices[i]).to.equal(i);
        });
      })(i);
    }
  });
});
//# sourceMappingURL=generators.js.map