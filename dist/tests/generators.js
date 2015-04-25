'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt = require('../generators');

console.log('repeat', _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.repeat);

// let g = require('../generators');
var should = require('should'),
    expect = require('expect.js');

describe('toArray', function () {

  it('should work with 1 value', function () {
    var value = 1,
        generator = _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.repeat(value, 1),
        array = _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toArray(generator);

    array.should.be.eql([1]);
    array.should.not.be.eql([2]);

    // expect(g.toArray(generator)).to.be([1]);
  });
});

describe('toGenerator', function () {
  it('should work with 1 value', function () {
    var generator = _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator([1]);

    var _generator$next = generator.next();

    var value = _generator$next.value;
    var done = _generator$next.done;

    expect(done).to.be(true);
    expect(value).to.be(1);
  });
});

describe('transform', function () {
  var value = 1;

  it('should work with 1 value', function () {
    var generator = _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.repeat(value, 1);

    expect(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toArray(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.transform(generator, function (value) {
      return value + 1;
    }))).to.be.eql([2]);
  });

  it('should work with toGenerator', function () {
    var generator = _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.transform(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator([1]), function (value) {
      return value + 1;
    });

    var _generator$next2 = generator.next();

    var value = _generator$next2.value;
    var done = _generator$next2.done;

    expect(done).to.be(true);
    expect(value).to.be(2);
  });
});

describe('zip', function () {
  var generators = _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator([_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator([1, 2, 3]), _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator([4, 5, 6])]);

  var cases = [['{args}.length generators of {1}.length items each', [[[1, 2, 3], [4, 5, 6]], [[1, 4], [2, 5], [3, 6]]]]];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function () {
      var c = _step.value;

      console.log(c);
      var name = c[0],
          parameters = c[1],
          input = parameters[0],
          output = parameters[1];

      it('should work with ' + name, function () {
        expect(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toArray(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.zip(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator([_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator(input[0]), _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toGenerator(input[1])])))).to.eql(output);
      });
    };

    for (var _iterator = _getIterator(cases), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  it('should work with 2 generators of 3 items each', function () {
    expect(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toArray(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.zip(generators))).to.be.eql([[1, 4], [2, 5], [3, 6]]);
  });
});

describe('modifiableStackAlt', function () {
  var stack = [1];

  it('should run 2 times', function () {
    var count = 0;

    var array = _repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.toArray(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.map(_repeat$toArray$toGenerator$map$transform$zip$modifiableStack$modifiableStackAlt.modifiableStackAlt(stack), function (value) {
      count++;

      if (count == 1) stack.push(3);

      return value;
    }));

    expect(count).to.equal(2);
    expect(array).to.eql([1, 3]);
  });
});

describe('stuff', function () {
  describe('should generate ' + 5 + ' tests', function () {
    var indices = [0, 1, 2, 3, 4];

    var _loop2 = function (i) {
      it('should be ' + i, function () {
        expect(indices[i]).to.equal(i);
      });
    };

    for (var i = 0; i < 5; i++) {
      _loop2(i);
    }
  });
});
//# sourceMappingURL=generators.js.map