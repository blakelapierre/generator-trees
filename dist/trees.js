'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var marked0$0 = [preorder, inorder, postorder, breadthFirst, makeNode, allBinaryTrees, allBinaryTrees, allTrees].map(_regeneratorRuntime.mark);

var _require = require('./generators');

var toArray = _require.toArray;
var toGenerator = _require.toGenerator;

module.exports = {
  preorder: preorder,
  inorder: inorder,
  postorder: postorder,
  breadthFirst: breadthFirst,
  reduce: reduce,
  makeNode: makeNode,
  toNode: toNode,
  asNode: asNode,
  allBinaryTrees: allBinaryTrees,
  printTree: printTree
};

//   R
//  / \
// A  B
//
// : [R, A, B]
function preorder(node) {
  var result, value, childResult, childGenerator, childGeneratorResult;
  return _regeneratorRuntime.wrap(function preorder$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (node) {
          context$1$0.next = 2;
          break;
        }

        throw Error('preorder, no node!');

      case 2:
        console.log('preorder', node);
        result = node.next(), value = result.value;

        if (!result.done) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return', value);

      case 6:
        context$1$0.next = 8;
        return value;

      case 8:
        if (!true) {
          context$1$0.next = 27;
          break;
        }

        childResult = node.next();
        childGenerator = preorder(childResult.value);

      case 11:
        if (!true) {
          context$1$0.next = 25;
          break;
        }

        childGeneratorResult = childGenerator.next();

        if (!childGeneratorResult.done) {
          context$1$0.next = 21;
          break;
        }

        if (!childResult.done) {
          context$1$0.next = 16;
          break;
        }

        return context$1$0.abrupt('return', childGeneratorResult.value);

      case 16:
        context$1$0.next = 18;
        return childGeneratorResult.value;

      case 18:
        return context$1$0.abrupt('break', 25);

      case 21:
        context$1$0.next = 23;
        return childGeneratorResult.value;

      case 23:
        context$1$0.next = 11;
        break;

      case 25:
        context$1$0.next = 8;
        break;

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

function reduce(node, reduceFn, collapseFn, unitValue) {
  if (unitValue == undefined) {
    unitValue = collapseFn;
    collapseFn = reduceFn;
  }
  // console.log('reduce', node);

  // if (!node) {
  //   console.log('reduce, no node!');
  // }

  // var valueResult = node.next(),
  //     value = valueResult.value;

  //     console.log(value);

  // if (valueResult.done) return value;

  // while (true) {
  //   var child = node.next(),
  //       reducedValue = unitValue;

  //   var childGenerator = reduce(child.value, reduceFn, unitValue);
  //   while (true) {
  //     var childGeneratorResult = childGenerator.next(),
  //         childValue = childGeneratorResult.value;

  //     // should we be mutating?
  //     // reduceFn(reducedValue, childValue);

  //     reducedValue = reduceFn(reducedValue, childValue);

  //     if (childGeneratorResult.done) break;
  //   }

  //   if (child.done) return reducedValue;

  //   yield reducedValue;
  // }

  return reduceNode(node);

  function reduceNode(node) {
    console.log('reduceNode', node);
    if (!node) {
      console.log('reduceNode, no node!');
    }

    var valueResult = node.next(),
        value = valueResult.value;

    if (valueResult.done) {
      return collapseFn(value, unitValue());
    }return collapseFn(value, reduceChildren(node));
  }

  function reduceChildren(children) {
    console.log('reduceChildren', children);
    var reducedValue = unitValue();
    while (true) {
      var childResult = children.next(),
          value = childResult.value;

      reducedValue = reduceFn(reducedValue, reduceNode(value));

      if (childResult.done) break;
    }
    return reducedValue;
  }
}

//   R
//  / \
// A  B
//
// : [A, R, B]
function inorder(node) {
  var valueResult, value, yieldedValue, child, childGenerator, childGeneratorResult;
  return _regeneratorRuntime.wrap(function inorder$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!node) {
          console.log('inorder, no node!');
        }

        valueResult = node.next(), value = valueResult.value;

        if (!valueResult.done) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return', value);

      case 4:
        yieldedValue = false;

      case 5:
        if (!true) {
          context$1$0.next = 32;
          break;
        }

        child = node.next();
        childGenerator = inorder(child.value);

      case 8:
        if (!true) {
          context$1$0.next = 22;
          break;
        }

        childGeneratorResult = childGenerator.next();

        if (!childGeneratorResult.done) {
          context$1$0.next = 18;
          break;
        }

        if (!(yieldedValue && child.done)) {
          context$1$0.next = 13;
          break;
        }

        return context$1$0.abrupt('return', childGeneratorResult.value);

      case 13:
        context$1$0.next = 15;
        return childGeneratorResult.value;

      case 15:
        return context$1$0.abrupt('break', 22);

      case 18:
        context$1$0.next = 20;
        return childGeneratorResult.value;

      case 20:
        context$1$0.next = 8;
        break;

      case 22:
        if (yieldedValue) {
          context$1$0.next = 30;
          break;
        }

        if (!child.done) {
          context$1$0.next = 27;
          break;
        }

        return context$1$0.abrupt('return', value);

      case 27:
        context$1$0.next = 29;
        return value;

      case 29:

        yieldedValue = true;

      case 30:
        context$1$0.next = 5;
        break;

      case 32:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}

//   R
//  / \
// A  B
//
// : [A, B, R]
function postorder(node) {
  var valueResult, value, child, childGenerator, childGeneratorResult;
  return _regeneratorRuntime.wrap(function postorder$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!node) {
          console.log('postorder, no node!');
        }

        valueResult = node.next(), value = valueResult.value;

        if (!valueResult.done) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return', value);

      case 4:
        if (!true) {
          context$1$0.next = 19;
          break;
        }

        child = node.next();
        childGenerator = postorder(child.value);

      case 7:
        if (!true) {
          context$1$0.next = 15;
          break;
        }

        childGeneratorResult = childGenerator.next();
        context$1$0.next = 11;
        return childGeneratorResult.value;

      case 11:
        if (!childGeneratorResult.done) {
          context$1$0.next = 13;
          break;
        }

        return context$1$0.abrupt('break', 15);

      case 13:
        context$1$0.next = 7;
        break;

      case 15:
        if (!child.done) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt('return', value);

      case 17:
        context$1$0.next = 4;
        break;

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[2], this);
}

//   R
//  / \
// A  B
//
// : [R, A, B]
//
// Emit self
// foreach child:
//    Emit
function breadthFirst(node, indent) {
  var valueResult, value, queue, generator, result, childGenerator, firstResult;
  return _regeneratorRuntime.wrap(function breadthFirst$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        indent = indent || '';
        if (!node) {
          console.log('breadthFirst, no node', node);
        }

        valueResult = node.next(), value = valueResult.value;

        if (!valueResult.done) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', value);

      case 5:
        context$1$0.next = 7;
        return value;

      case 7:
        queue = [{ generator: node }];

      case 8:
        if (!(queue.length != 0)) {
          context$1$0.next = 27;
          break;
        }

        generator = queue.shift();

      case 10:
        if (!true) {
          context$1$0.next = 25;
          break;
        }

        result = generator.generator.next(), childGenerator = result.value;
        firstResult = childGenerator.next();

        if (!firstResult.done) {
          context$1$0.next = 18;
          break;
        }

        if (!(result.done && queue.length == 0)) {
          context$1$0.next = 16;
          break;
        }

        return context$1$0.abrupt('return', firstResult.value);

      case 16:
        context$1$0.next = 19;
        break;

      case 18:
        queue.push({ parent: firstResult.value, generator: childGenerator });

      case 19:
        context$1$0.next = 21;
        return firstResult.value;

      case 21:
        if (!result.done) {
          context$1$0.next = 23;
          break;
        }

        return context$1$0.abrupt('break', 25);

      case 23:
        context$1$0.next = 10;
        break;

      case 25:
        context$1$0.next = 8;
        break;

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[3], this);
}

function makeNode(value, children) {
  var result;
  return _regeneratorRuntime.wrap(function makeNode$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!children) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.next = 3;
        return value;

      case 3:

        if (children.length) children = toGenerator(children); // really we want to just do this for arrays
        if (typeof children == 'function') children = children();

      case 5:
        if (!true) {
          context$1$0.next = 15;
          break;
        }

        result = children.next();

        if (!result.done) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', result.value);

      case 11:
        context$1$0.next = 13;
        return result.value;

      case 13:
        context$1$0.next = 5;
        break;

      case 15:
        context$1$0.next = 18;
        break;

      case 17:
        return context$1$0.abrupt('return', value);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[4], this);
}

function makeFnNode(value, children) {
  return function () {
    return makeNode(value, children);
  };
}

function toNode(generator) {
  var ret = {};

  var result = generator.next();
  ret.value = result.value;
  if (!result.done) ret.children = toArray(generator);
  return ret;
}

function asNode(generator) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return toNode(generator.apply(undefined, args));
}

function printGenerator(generator) {
  while (true) {
    var result = generator.next();

    console.log('print', result.value);

    if (result.done) break;
  }
}

function allBinaryTrees(size, valueGenerator) {
  var marked1$0, i, j, constructTree;
  return _regeneratorRuntime.wrap(function allBinaryTrees$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        constructTree = function constructTree(leftSize, rightSize, valueGenerator, seed) {
          var value;
          return _regeneratorRuntime.wrap(function constructTree$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                value = valueGenerator(seed).next().value;

              case 1:
              case 'end':
                return context$2$0.stop();
            }
          }, marked1$0[0], this);
        };

        marked1$0 = [constructTree].map(_regeneratorRuntime.mark);

        if (!(size == 0)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return', makeNode(undefined));

      case 4:
        i = 0;
        i;

      case 6:
        if (!(i < size - 1)) {
          context$1$0.next = 17;
          break;
        }

        j = 0;

      case 8:
        if (!(j < size - i - 1)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 11;
        return constructTree(i, j, valueGenerator, 0);

      case 11:
        j++;
        context$1$0.next = 8;
        break;

      case 14:
        i++;
        context$1$0.next = 6;
        break;

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[5], this);
}

// static IEnumerable<Node> AllBinaryTrees(int size)
// {
//     if (size == 0)
//         return new Node[] { null };
//     return from i in Enumerable.Range(0, size)
//            from left in AllBinaryTrees(i)
//            from right in AllBinaryTrees(size - 1 - i)
//            select new Node(left, right);
// }

function allBinaryTrees(size, valueGenerator, seed) {
  var nodeValue, i, left, j, right, leftResult, createLeft, rightResult, createRight;
  return _regeneratorRuntime.wrap(function allBinaryTrees$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(size == 0)) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return', makeFnNode(undefined));

      case 2:
        nodeValue = valueGenerator(seed).next().value;

        if (!(size == 1)) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', makeFnNode(nodeValue));

      case 5:
        i = 0;
        i;

      case 7:
        if (!(i < size - 1)) {
          context$1$0.next = 26;
          break;
        }

        left = allBinaryTrees(i, valueGenerator, nodeValue + 1);

      case 9:
        if (!true) {
          context$1$0.next = 23;
          break;
        }

        j = size - 1 - i, right = allBinaryTrees(j, valueGenerator, nodeValue + 1), leftResult = left.next(), createLeft = leftResult.value;

      case 11:
        if (!true) {
          context$1$0.next = 19;
          break;
        }

        rightResult = right.next(), createRight = rightResult.value;
        context$1$0.next = 15;
        return makeFnNode(nodeValue, [createLeft, createRight]);

      case 15:
        if (!rightResult.done) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt('break', 19);

      case 17:
        context$1$0.next = 11;
        break;

      case 19:
        if (!leftResult.done) {
          context$1$0.next = 21;
          break;
        }

        return context$1$0.abrupt('break', 23);

      case 21:
        context$1$0.next = 9;
        break;

      case 23:
        i++;
        context$1$0.next = 7;
        break;

      case 26:
        left = allBinaryTrees(i, valueGenerator, nodeValue + 1);

      case 27:
        if (!true) {
          context$1$0.next = 35;
          break;
        }

        leftResult = left.next();

        if (!leftResult.done) {
          context$1$0.next = 31;
          break;
        }

        return context$1$0.abrupt('return', makeFnNode(nodeValue, [leftResult.value, makeFnNode(undefined)]));

      case 31:
        context$1$0.next = 33;
        return makeFnNode(nodeValue, [leftResult.value, makeFnNode(undefined)]);

      case 33:
        context$1$0.next = 27;
        break;

      case 35:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[6], this);
}

function allTrees(size, maxChildren, parent, nodeValueGenerator) {
  var i, left, leftResult, j, right, rightResult, children, childValue;
  return _regeneratorRuntime.wrap(function allTrees$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        console.log('all', size);

        if (!(size == 0)) {
          context$1$0.next = 3;
          break;
        }

        return context$1$0.abrupt('return', makeNode(undefined));

      case 3:

        nodeValue = nodeValueGenerator.next().value;

        if (!(size == 1)) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return', makeNode(nodeValue));

      case 6:
        context$1$0.next = 8;
        return makeNode(nodeValue);

      case 8:
        i = 0;
        i;

      case 10:
        if (!(i < size - 1)) {
          context$1$0.next = 37;
          break;
        }

        console.log('i', i);
        left = allBinaryTrees(i, nodeValueGenerator);

        console.log('left', left);

      case 14:
        if (!true) {
          context$1$0.next = 34;
          break;
        }

        leftResult = left.next(), j = size - 1 - i, right = allBinaryTrees(j, nodeValueGenerator);

        console.log('leftResult', leftResult);
        console.log('right', right);

      case 18:
        if (!true) {
          context$1$0.next = 30;
          break;
        }

        rightResult = right.next(), children = [];

        console.log('rightResult', rightResult);

        // if (i != 0) children.push(leftResult.value);
        // if (j != 0) children.push(rightResult.value);
        // if (!(leftResult.done && leftResult.value == undefined)) children.push(leftResult.value);
        // if (!(rightResult.done && rightResult.value == undefined)) children.push(rightResult.value);

        console.log('children', children);
        console.log('nodeValue', nodeValue);

        childValue = nodeValueGenerator.next().value;
        context$1$0.next = 26;
        return makeNode(childValue, [leftResult.value, rightResult.value]);

      case 26:
        if (!rightResult.done) {
          context$1$0.next = 28;
          break;
        }

        return context$1$0.abrupt('break', 30);

      case 28:
        context$1$0.next = 18;
        break;

      case 30:
        if (!leftResult.done) {
          context$1$0.next = 32;
          break;
        }

        return context$1$0.abrupt('break', 34);

      case 32:
        context$1$0.next = 14;
        break;

      case 34:
        i++;
        context$1$0.next = 10;
        break;

      case 37:
        left = allBinaryTrees(i, nodeValueGenerator), j = 0;

      case 38:
        if (!true) {
          context$1$0.next = 49;
          break;
        }

        leftResult = left.next();

        console.log('last leftResult', leftResult);

        nodeValue = nodeValueGenerator.next().value;

        if (!leftResult.done) {
          context$1$0.next = 44;
          break;
        }

        return context$1$0.abrupt('return', makeNode(nodeValue, [leftResult.value, makeNode(undefined)]));

      case 44:
        context$1$0.next = 46;
        return makeNode(nodeValue, [leftResult.value, makeNode(undefined)]);

      case 46:
        j++;
        context$1$0.next = 38;
        break;

      case 49:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[7], this);
}

function printTree(tree, level) {
  level = level || 0;

  if (tree == undefined) {
    return print('<undefined>');
  }var node = tree(),
      valueResult = node.next(),
      nodeValue = valueResult.value;

  if (nodeValue == undefined) {
    return;
  }if (valueResult.done) {
    return print(nodeValue);
  }printChild(node);
  print(nodeValue);
  printChild(node);

  function print(value) {
    console.log(indent(level) + value);
  }

  function printChild(tree) {
    var childResult = tree.next(),
        childValue = childResult.value;

    if (childValue != undefined) printTree(childValue, level + 1);

    return !childResult.done;
  }

  function indent(count, character) {
    character = character || ' ';
    var s = '';
    for (var i = 0; i < count; i++) s += character;
    return s;
  }
}

// Implementing and Traversing Trees Using Generators in JavaScript [ECMAScript 6]

//   f
//  b
//   e
// r
//   d
//  a
//   c

//return undefined;

// foreach (tree in trees) {
//   yield tree;
// }

// yield makeNode(nodeValue, children.length > 0 ? children : undefined);
//# sourceMappingURL=trees.js.map