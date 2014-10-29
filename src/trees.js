var {toArray, toGenerator} = require('./generators');


module.exports = {
  preorder,
  inorder,
  postorder,
  breadthFirst,
  makeNode,
  toNode,
  asNode
};



//   R
//  / \
// A  B
//
// : [R, A, B]
function* preorder(node) {
  if (!node) {
    throw Error('inorder, no node!');
  }

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


//   R
//  / \
// A  B
//
// : [A, R, B]
function* inorder(node) {
  if (!node) {
    console.log('undefined!');
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
    console.log('undefined!');
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
    console.log('node was undefined', node);
  }

  var valueResult = node.next(),
      value = valueResult.value;

  if (valueResult.done) return value;

  yield value;

  var queue = [{generator:node}];

  while (queue.length != 0) {
    var generator = queue.shift();

    while (true) {
      var result = generator.generator.next(),
          childGenerator = result.value;

      var firstResult = childGenerator.next();

      if (firstResult.done) {
        if (result.done && queue.length == 0) return firstResult.value;
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

// Implementing and Traversing Trees Using Generators in JavaScript [ECMAScript 6]