var {toArray, toGenerator} = require('./generators');


module.exports = {
  preorder,
  inorder,
  postorder,
  breadthFirst,
  reduce,
  makeNode,
  toNode,
  asNode,
  allBinaryTrees,
  printTree
};



//   R
//  / \
// A  B
//
// : [R, A, B]
function* preorder(node) {
  if (!node) {
    //return undefined;
    throw Error('preorder, no node!');
  }
console.log('preorder', node);
  var result = node.next(),
      value = result.value;

  if (result.done) return value;

  yield value;

  while (true) {
    var childResult = node.next();

    var childGenerator = preorder(childResult.value);
    while (true) {
      var childGeneratorResult = childGenerator.next();

      if (childGeneratorResult.done) {
        if (childResult.done) return childGeneratorResult.value;

        yield childGeneratorResult.value;
        break;
      }
      else yield childGeneratorResult.value;
    }
  }
}

function reduce(node, reduceFn, collapseFn, unitValue) {
  if (unitValue === undefined) {
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

    if (valueResult.done) return collapseFn(value, unitValue());

    return collapseFn(value, reduceChildren(node));
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
function* inorder(node) {
  if (!node) {
    console.log('inorder, no node!');
  }

  var valueResult = node.next(),
      value = valueResult.value;

  if (valueResult.done) return value;

  var yieldedValue = false;
  while (true) {
    var child = node.next();

    var childGenerator = inorder(child.value);
    while (true) {
      var childGeneratorResult = childGenerator.next();

      if (childGeneratorResult.done) {
        if (yieldedValue && child.done) return childGeneratorResult.value;
        yield childGeneratorResult.value;
        break;
      }
      else {
        yield childGeneratorResult.value;
      }
    }

    if (!yieldedValue) {
      if (child.done) return value;
      else yield value;

      yieldedValue = true;
    }
  }
}


//   R
//  / \
// A  B
//
// : [A, B, R]
function* postorder(node) {
  if (!node) {
    console.log('postorder, no node!');
  }

  var valueResult = node.next(),
      value = valueResult.value;

  if (valueResult.done) return value;

  while (true) {
    var child = node.next();

    var childGenerator = postorder(child.value);
    while (true) {
      var childGeneratorResult = childGenerator.next();

      yield childGeneratorResult.value;

      if (childGeneratorResult.done) break;
    }

    if (child.done) return value;
  }
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
function* breadthFirst(node, indent) {
  indent = indent || '';
  if (!node) {
    console.log('breadthFirst, no node', node);
  }

  var valueResult = node.next(),
      value = valueResult.value;

  if (valueResult.done) return value;

  yield value;

  var queue = [{generator:node}];

  while (queue.length !== 0) {
    var generator = queue.shift();

    while (true) {
      var result = generator.generator.next(),
          childGenerator = result.value;

      var firstResult = childGenerator.next();

      if (firstResult.done) {
        if (result.done && queue.length === 0) return firstResult.value;
      }
      else {
        queue.push({parent: firstResult.value, generator: childGenerator});
      }

      yield firstResult.value;

      if (result.done) break;
    }
  }
}

function* makeNode(value, children) {
  if (children) {
    yield value;

    if (children.length) children = toGenerator(children); // really we want to just do this for arrays
    if (typeof children == 'function') children = children();

    while (true) {
      var result = children.next();
      if (result.done) return result.value;
      else yield result.value;
    }
  }
  else return value;
}

function makeFnNode(value, children) {
  return () => makeNode(value, children);
}

function toNode(generator) {
  var ret = {};

  var result = generator.next();
  ret.value = result.value;
  if (!result.done) ret.children = toArray(generator);
  return ret;
}

function asNode(generator, ...args) {
  return toNode(generator(...args));
}

function printGenerator(generator) {
  while (true) {
    var result = generator.next();

    console.log('print', result.value);

    if (result.done) break;
  }
}

function* allBinaryTrees(size, valueGenerator) {
  if (size === 0) return makeNode(undefined);

  // foreach (tree in trees) {
  //   yield tree;
  // }

  var i = 0;
  for (i; i < size - 1; i++) {
    for (var j = 0; j < size - i - 1; j++) {
      yield constructTree(i, j, valueGenerator, 0);
    }
  }


  function* constructTree(leftSize, rightSize, valueGenerator, seed) {
    var value = valueGenerator(seed).next().value;
  }
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


function* allBinaryTrees(size, valueGenerator, seed) {
  if (size === 0) return makeFnNode(undefined);

  var nodeValue = valueGenerator(seed).next().value;

  if (size == 1) return makeFnNode(nodeValue);

  let i = 0;
  for (i; i < size - 1; i++) {
    let left = allBinaryTrees(i, valueGenerator, nodeValue + 1);

    while (true) {
      let j = size - 1 - i,
          right = allBinaryTrees(j, valueGenerator, nodeValue + 1),
          leftResult = left.next(),
          createLeft = leftResult.value;

      while (true) {
        let rightResult = right.next(),
            createRight = rightResult.value;

        yield makeFnNode(nodeValue, [createLeft, createRight]);

        if (rightResult.done) break;
      }
      if (leftResult.done) break;
    }
  }

  let left = allBinaryTrees(i, valueGenerator, nodeValue + 1);
  while (true) {
    var leftResult = left.next();

    if (leftResult.done) return makeFnNode(nodeValue, [leftResult.value, makeFnNode(undefined)]);
    yield makeFnNode(nodeValue, [leftResult.value, makeFnNode(undefined)]);
  }
}

function* allTrees(size, maxChildren, parent, nodeValueGenerator) {
  console.log('all', size);
  if (size === 0) return makeNode(undefined);

  nodeValue = nodeValueGenerator.next().value;

  if (size == 1) return makeNode(nodeValue);

  yield makeNode(nodeValue);

  let i = 0;
  for (i; i < size - 1; i++) {
    console.log('i', i);
    let left = allBinaryTrees(i, nodeValueGenerator);
    console.log('left', left);
    while (true) {
      let leftResult = left.next(),
          j = size - 1 - i,
          right = allBinaryTrees(j, nodeValueGenerator);

      console.log('leftResult', leftResult);
      console.log('right', right);

      while (true) {
        let rightResult = right.next(),
            children = [];

        console.log('rightResult', rightResult);

        // if (i != 0) children.push(leftResult.value);
        // if (j != 0) children.push(rightResult.value);
        // if (!(leftResult.done && leftResult.value == undefined)) children.push(leftResult.value);
        // if (!(rightResult.done && rightResult.value == undefined)) children.push(rightResult.value);

        console.log('children', children);
        console.log('nodeValue', nodeValue);

        let childValue = nodeValueGenerator.next().value;
        // yield makeNode(nodeValue, children.length > 0 ? children : undefined);
        yield makeNode(childValue, [leftResult.value, rightResult.value]);

        if (rightResult.done) break;
      }
      if (leftResult.done) break;
    }
  }

  let left = allBinaryTrees(i, nodeValueGenerator),
      j = 0;
  while (true) {
    let leftResult = left.next();

    console.log('last leftResult', leftResult);

    nodeValue = nodeValueGenerator.next().value;
    if (leftResult.done) return makeNode(nodeValue, [leftResult.value, makeNode(undefined)]);
    yield makeNode(nodeValue, [leftResult.value, makeNode(undefined)]);
    j++;
  }
}

function printTree(tree, level) {
  level = level || 0;

  if (tree === undefined) return print('<undefined>');

  var node = tree(),
      valueResult = node.next(),
      nodeValue = valueResult.value;

  if (nodeValue === undefined) return;
  if (valueResult.done) return print(nodeValue);

  printChild(node);
  print(nodeValue);
  printChild(node);

  function print(value) {
    console.log(indent(level) + value);
  }

  function printChild(tree) {
    var childResult = tree.next(),
        childValue = childResult.value;

    if (childValue !== undefined) printTree(childValue, level + 1);

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
