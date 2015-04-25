'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _expect = require('expect.js');

var _expect2 = _interopRequireWildcard(_expect);

var _sync$async = require('../promises');

var _toGenerator$transform = require('../generators');

describe('sync', function () {
  it('should run twice', function () {
    _sync$async.sync(_toGenerator$transform.toGenerator([promise(1), promise(2)]), function (result, count) {
      return console.log(count, result);
    }, function (error) {
      return console.log('error', error);
    });

    var counter = 0;
    function promise(value) {
      return new _Promise(function (resolve) {
        counter++;
        resolve(value);
      });
    }
  });
});

describe('async', function () {
  it('should run once', function () {
    var counter = 0;

    return _sync$async.async(2, _toGenerator$transform.transform(_toGenerator$transform.toGenerator([1]), function (value) {
      return promise(value);
    }), function (result, count) {
      return console.log(count, result);
    }, function (error) {
      return console.log('error', error);
    });

    function promise(value) {
      return new _Promise(function (resolve) {
        counter++;
        console.log('counter', counter);
        resolve(value);
      });
    }
  });
});
//# sourceMappingURL=promises.js.map