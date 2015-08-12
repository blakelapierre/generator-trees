'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expectJs = require('expect.js');

var _expectJs2 = _interopRequireDefault(_expectJs);

var _promises = require('../promises');

var _generators = require('../generators');

describe('sync', function () {
  it('should run twice', function () {
    (0, _promises.sync)((0, _generators.toGenerator)([promise(1), promise(2)]), function (result, count) {
      return console.log(count, result);
    }, function (error) {
      return console.log('error', error);
    });

    var counter = 0;
    function promise(value) {
      return new Promise(function (resolve) {
        counter++;
        resolve(value);
      });
    }
  });
});

describe('async', function () {
  it('should run once', function () {
    var counter = 0;

    return (0, _promises.async)(2, (0, _generators.transform)((0, _generators.toGenerator)([1]), function (value) {
      return promise(value);
    }), function (result, count) {
      return console.log(count, result);
    }, function (error) {
      return console.log('error', error);
    });

    function promise(value) {
      return new Promise(function (resolve) {
        counter++;
        console.log('counter', counter);
        resolve(value);
      });
    }
  });
});
//# sourceMappingURL=../tests/promises.js.map