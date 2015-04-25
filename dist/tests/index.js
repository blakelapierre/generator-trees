'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var marked0$0 = [reduceTest, test, parseAsNode, clusterMachineGenerator, generator2, generator3].map(_regeneratorRuntime.mark);
var generators = require('../index');

var _generators$t = generators.t;
var preorder = _generators$t.preorder;
var inorder = _generators$t.inorder;
var postorder = _generators$t.postorder;
var breadthFirst = _generators$t.breadthFirst;
var reduce = _generators$t.reduce;
var makeNode = _generators$t.makeNode;
var toNode = _generators$t.toNode;
var asNode = _generators$t.asNode;
var allBinaryTrees = _generators$t.allBinaryTrees;
var printTree = _generators$t.printTree;
var _generators$g = generators.g;
var transform = _generators$g.transform;
var interleave = _generators$g.interleave;
var map = _generators$g.map;
var each = _generators$g.each;
var toGenerator = _generators$g.toGenerator;
var toArray = _generators$g.toArray;
var integers = _generators$g.integers;
var zip = _generators$g.zip;

function reduceTest() {
  return _regeneratorRuntime.wrap(function reduceTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        console.log('yielding 1');
        context$1$0.next = 3;
        return 1;

      case 3:
        context$1$0.next = 5;
        return makeNode(2);

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.mark(function callee$1$0() {
          return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                return context$2$0.abrupt('return', 3);

              case 1:
              case 'end':
                return context$2$0.stop();
            }
          }, callee$1$0, this);
        });

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.mark(function callee$1$1() {
          return _regeneratorRuntime.wrap(function callee$1$1$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                return context$2$0.abrupt('return', 4);

              case 1:
              case 'end':
                return context$2$0.stop();
            }
          }, callee$1$1, this);
        });

      case 9:
        return context$1$0.abrupt('return', _regeneratorRuntime.mark(function callee$1$2() {
          return _regeneratorRuntime.wrap(function callee$1$2$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return 5;

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.mark(function callee$2$0() {
                  return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        return context$3$0.abrupt('return', 6);

                      case 1:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, callee$2$0, this);
                });

              case 4:
                return context$2$0.abrupt('return', _regeneratorRuntime.mark(function callee$2$1() {
                  return _regeneratorRuntime.wrap(function callee$2$1$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        return context$3$0.abrupt('return', 7);

                      case 1:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, callee$2$1, this);
                }));

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, callee$1$2, this);
        }));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

var reduceTest = function reduceTest() {
  return makeNode(1, [makeNode(2, [makeNode(3)]), makeNode(4), makeNode(5, [makeNode(6), makeNode(7)])]);
};

console.log(reduce(reduceTest(), function (x, y) {
  console.log('reduce', x, y);
  return x + y;
}, function () {
  return 0;
}));

console.log(reduce(reduceTest(), function (x, y) {
  console.log('reduce', x, y);
  return x + y;
}, function (x, y) {
  console.log('collapse', x, y);
  return x * y;
}, function () {
  return 0;
}));

console.log(reduce(reduceTest(), function (x, y) {
  console.log('reduce', x, y);
  x[y.toString()] = y;
  return x;
}, function (x, y) {
  console.log('collapse', x, y);
  y[x.toString()] = x;
  return y;
}, function () {
  return {};
}));

console.log('done');

function test() {
  return _regeneratorRuntime.wrap(function test$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return 1;

      case 2:
        context$1$0.next = 4;
        return 2;

      case 4:
        return context$1$0.delegateYield(toGenerator([4, 5, 6, 7]), 't0', 5);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}

// gMap(toGenerator([1, 2, 3]), value => console.log(value));

// gMap(test(), value => {
//   if (typeof value == 'function') {
//     gMap(value(), v => console.log('v', v));
//   }
//   console.log('va', value);
// });

// console.log('\ndepth first, toGenerator');
// gMap(depthFirst(makeNode(1, toGenerator([makeNode(2, toGenerator([makeNode(4)])), makeNode(3)]))), value => console.log('value', value));

// console.log('\ndpeth firs 2');
// gMap(depthFirst(makeNode(1, [makeNode(2, [makeNode(4)]), makeNode(3)])), value => console.log('value', value));

var addition = function addition() {
  return makeNode('+', _regeneratorRuntime.mark(function callee$1$0() {
    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return makeNode(1);

        case 2:
          return context$2$0.abrupt('return', makeNode('*', _regeneratorRuntime.mark(function callee$2$0() {
            return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return makeNode(2);

                case 2:
                  return context$3$0.abrupt('return', makeNode(3));

                case 3:
                case 'end':
                  return context$3$0.stop();
              }
            }, callee$2$0, this);
          })));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));
};

console.log(asNode(makeNode, 1, makeNode('+', [makeNode(3), makeNode(4)])));

console.log('\npreorder addition');
each(preorder(addition()), function (value) {
  return console.log('log', value);
});
console.log(toArray(preorder(addition())));

console.log('\ninorder addition');
each(inorder(addition()), function (value) {
  return console.log('log', value);
});
console.log(toArray(inorder(addition())));

console.log('\npostorder addition');
each(postorder(addition()), function (value) {
  return console.log('log', value);
});
console.log(toArray(postorder(addition())));

console.log('\nbreadthFirst addition');
each(breadthFirst(addition()), function (value) {
  return console.log('log', value);
});
console.log(toArray(breadthFirst(addition())));

console.log('\ndepthFirst addition2');
var addition2 = toGenerator(['+', toGenerator([1]), toGenerator([2])]);
each(inorder(addition2), function (value) {
  return console.log('log', value);
});

var treeNode = function treeNode() {
  return makeNode('root', [makeNode('+', [makeNode(1), makeNode(2)]), makeNode('names', [makeNode('five', [makeNode(5)]), makeNode('six', [makeNode(6)])])]);
};

console.log('\ntreeNode');
map(inorder(treeNode()), function (value) {
  return console.log('tr', value);
});

function testTree(name, tree) {
  console.log('\n', name);

  console.log(name, 'preorder', toArray(preorder(parseAsNode(tree))));
  console.log(name, 'inorder', toArray(inorder(parseAsNode(tree))));
  console.log(name, 'postorder', toArray(postorder(parseAsNode(tree))));
  console.log(name, 'breadthFirst', toArray(breadthFirst(parseAsNode(tree))));
}

var basicTree = {
  root: {
    one: 1
  }
};

testTree('basic tree', basicTree);

var binaryTree = {
  root: {
    one: 1,
    two: 2
  }
};

testTree('binary tree', binaryTree);

var simpleTree = {
  root: {
    level1: {
      level2: 2,
      wut: 'this'
    }
  }
};

testTree('simple tree', simpleTree);

var tree = {
  root: {
    '+': [1, 2, { '*': [3, 4] }],
    middle: {
      goes: {
        deep: ['into', 'the', { tree: true }]
      }
    },
    names: {
      five: 5,
      six: 6
    }
  }
};

testTree('tree', tree);

// Children are ordered
var tree2 = {
  root: [{ '+': [1, 2, { '*': [3, 4] }] }, { middle: { goes: { deep: ['into', 'the', { tree: true }] } } }, { names: [{ five: 5, six: 6 }] }]
};

testTree('tree2', tree2);

var tree3 = {
  root: [{ '+': [1, 2, { '*': [3, 4] }] }, { middle: {
      goes: {
        deep: ['into', 'the', { tree: true }] } } }, { names: [{ five: 5 }, { six: 6 }] }]
};

testTree('tree3', tree3);

var tree4 = {
  root: [{ '+': [1, 2, { '*': [3, 4] }] }, { middle: {
      goes: {
        deep: ['into', 'the', { tree: true }]
      }
    }
  }, { names: [{ five: 5 }, { six: 6 }] }]
};

testTree('tree4', tree4);

// gMap(parseAsNode(tree), value => console.log('tree', value));

// gMap(parseAsNode(tree), value => {
//   if (value && value.next && typeof value.next == 'function') {
//     gMap(value, v => console.log('v', v));
//   }
//   console.log('va', value);
// });

// console.log('\ndepthFirst');
// console.log(toArray(inorder(parseAsNode(tree))));

// console.log('\nbreadthFirst');
// //print(breadthFirst(parseAsNode(tree)));
// console.log(toArray(breadthFirst(parseAsNode(tree))));
// //console.log(toArray(breadthFirst(parseAsNode(tree2))));

function print(generator, prefix) {
  prefix = prefix || 'print';
  gMap(generator, function (value) {
    return console.log(prefix, value);
  });
}

function parseAsNode(obj, value) {
  var marked1$0, generator, result, childrenFunction;
  return _regeneratorRuntime.wrap(function parseAsNode$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        childrenFunction = function childrenFunction(obj) {
          var i, keys, key, childValue;
          return _regeneratorRuntime.wrap(function childrenFunction$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!obj.length) {
                  context$2$0.next = 11;
                  break;
                }

                i = 0;

              case 2:
                if (!(i < obj.length - 1)) {
                  context$2$0.next = 8;
                  break;
                }

                context$2$0.next = 5;
                return makeNode(obj[i]);

              case 5:
                i++;
                context$2$0.next = 2;
                break;

              case 8:
                return context$2$0.abrupt('return', makeNode(obj[i]));

              case 11:
                if (!(typeof obj == 'object')) {
                  context$2$0.next = 29;
                  break;
                }

                keys = _Object$keys(obj);

                if (!(keys.length == 0)) {
                  context$2$0.next = 15;
                  break;
                }

                throw new Error('is this allowed?');

              case 15:
                i = 0;

              case 16:
                if (!(i < keys.length - 1)) {
                  context$2$0.next = 24;
                  break;
                }

                key = keys[i];
                childValue = obj[key];
                context$2$0.next = 21;
                return makeNode(key, (function (childValue) {
                  return function () {
                    return childrenFunction(childValue);
                  };
                })(childValue));

              case 21:
                i++;
                context$2$0.next = 16;
                break;

              case 24:
                key = keys[i];
                childValue = obj[key];
                return context$2$0.abrupt('return', makeNode(key, function () {
                  return childrenFunction(childValue);
                }));

              case 29:
                return context$2$0.abrupt('return', makeNode(obj));

              case 30:
              case 'end':
                return context$2$0.stop();
            }
          }, marked1$0[0], this);
        };

        marked1$0 = [childrenFunction].map(_regeneratorRuntime.mark);

        value = value || '@@root';

        generator = makeNode(value, function () {
          return childrenFunction(obj);
        });

      case 4:
        if (!true) {
          context$1$0.next = 14;
          break;
        }

        result = generator.next();

        if (!result.done) {
          context$1$0.next = 10;
          break;
        }

        return context$1$0.abrupt('return', result.value);

      case 10:
        context$1$0.next = 12;
        return result.value;

      case 12:
        context$1$0.next = 4;
        break;

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[2], this);
}

// var loop = generators.loop(clusterMachineGenerator(5));

// var result;

// for (var i = 0; i < 100; i++) {
//   result = loop.next();
//   console.log('result', result);
// }

var q = [clusterMachineGenerator(10, 'sfo1-'), clusterMachineGenerator(5, 'nyc3-'), clusterMachineGenerator(7, 'lon1-')];

function clusterMachineGenerator(machineCount, prefix) {
  var i, generateMachine;
  return _regeneratorRuntime.wrap(function clusterMachineGenerator$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        generateMachine = function generateMachine(number) {
          return { id: prefix + number.toString() };
        };

        prefix = prefix || '';
        i = 0;

      case 3:
        if (!(i < machineCount - 1)) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 6;
        return generateMachine(i);

      case 6:
        i++;
        context$1$0.next = 3;
        break;

      case 9:
        return context$1$0.abrupt('return', generateMachine(i));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[3], this);
}

function generator2() {
  var loop, queue, generatorResult, machineGenerator, machineResult;
  return _regeneratorRuntime.wrap(function generator2$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        loop = interleave(toGenerator(q)), queue = loop.next().value;

      case 1:
        generatorResult = loop.next();

        if (!generatorResult.done) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return');

      case 6:
        machineGenerator = generatorResult.value, machineResult = machineGenerator.next();

        if (!machineResult.done) {
          context$1$0.next = 11;
          break;
        }

        queue.remove(machineGenerator);
        context$1$0.next = 13;
        break;

      case 11:
        context$1$0.next = 13;
        return machineResult.value;

      case 13:
        if (!generatorResult.done) {
          context$1$0.next = 1;
          break;
        }

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[4], this);
}

function generator3() {
  var loop, queue, generatorResult, machineGenerator, machineResult;
  return _regeneratorRuntime.wrap(function generator3$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        loop = interleave(toGenerator(q)), queue = loop.next().value;

      case 1:
        generatorResult = loop.next();

        if (!generatorResult.done) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return');

      case 6:
        machineGenerator = generatorResult.value, machineResult = machineGenerator.next();

        if (!machineResult.done) {
          context$1$0.next = 11;
          break;
        }

        queue.remove(machineGenerator);
        context$1$0.next = 13;
        break;

      case 11:
        context$1$0.next = 13;
        return machineResult.value;

      case 13:
        if (!generatorResult.done) {
          context$1$0.next = 1;
          break;
        }

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[5], this);
}

var gen = interleave(toGenerator(q));

var i = 0;
while (true) {
  var result = gen.next();
  console.log(i++, result);
  if (result.done) break;
}

var size = 5,
    binaryTrees = allBinaryTrees(size, integers);

var i = 0;
while (true) {
  var result = binaryTrees.next();

  console.log('tree', i++, result);
  // console.log(toArray(preorder(result.value)));
  printTree(result.value);

  if (result.done) break;
}
console.log('produced', i, 'binary trees of size', size);
console.log(typeof integers);

var generators = toGenerator([toGenerator([1, 2, 3]), toGenerator([4, undefined, 6]), toGenerator([7]), toGenerator([8, 9, 10, 11])]);

console.log('zip', toArray(zip(generators)));

//return null;

// There should be a call to makeNode in here somehweret
// var generator = toNode(childValue, key);
// var generator = makeNode(key, () => childrenFunction(childValue));
// while (true) {
//   var result = generator.next();
//   yield result.value;
//   if (result.done) break;
// }

// There should be a call to makeNode in here somehwere?
//var generator = toNode(childValue, key);
// var generator = makeNode(key, () => childrenFunction(childValue));
// while (true) {
//   var result = generator.next();
//   if (result.done) return result.value;
//   else yield result.value;
// }

// how to handle arrays?
//# sourceMappingURL=index.js.map