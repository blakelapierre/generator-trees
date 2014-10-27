

module.exports = {
  preorder,
  inorder,
  postorder,
  breadthFirst,
  gMap,
  gEach,
  toGenerator,
  toArray,
  loop,
  loopUntilEmpty,
  makeNode,
  toNode,
  asNode
};

function* loop(g) {
  var q = [],
      next = 0;

  var result;
  while(true) {
    var result = g.next();
    if (!result.done) {
      q.push(result.value);
      yield result.value;
    }
    else break;
  }

  while (true) {
    var result = g.next();
    if (!result.done) {
      q.push(result.value);
      yield result.value;
    }
    else {
      var value = q[next];
      yield value;
      next = (next + 1) % q.length;
    }
  }
}

// q: an array of generators
// A generator that loops through `q` in round-robin fashion,
// yielding the next value from each generator
// until all values have been generated
function* loopUntilEmpty(q) {
  var next = 0;

  while (q.length > 0) {
    next = next % q.length;
    var generator = q[next],
        result = generator.next();

    if (result.done) {
      remove(generator);
      if (q.length == 0) return result.value;
    }

    next = next + 1;

    yield result.value;
  }

  function remove(obj) {
    var index = q.indexOf(obj);
    if (index != -1) {
      q.splice(index, 1);
      if (next >= index) {
        next = next == 0 ? q.length - 1 : next - 1;
      }
    }
    else throw Error('Tried to remove object that is not in q', obj, q);
  }
}

function gMap(g, fn) {
  var mapped = [];
  while (true) {
    var result = g.next();
    mapped.push(fn(result.value));
    if (result.done) return mapped;
  }
}

function gEach(g, fn) {
  while (true) {
    var result = g.next();
    fn(result.value);
    if (result.done) return;
  }
}


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

function* transform(generator, fn) {
  while (true) {
    var result = generator.next();
        newValue = fn(result.value);

    if (result.done) return newValue;
    else yield (fn(result.value));
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

function* toGenerator(array) {
  var length = array.length;

  if (length == 0) throw Error('What should we do here?');
  if (length == 1) return array[0];

  var i;
  for (i = 0; i < length - 1; i++) yield array[i];
  return array[i];
}

// There are multiple ways to implement this function...
function* repeat(generator, count) {
  var values = [];

  yield function* () {
    while(true) {
      var result = generator.next();
      console.log('got result', result);
      values.push(result.value);

      if (result.done) return result.value;
      else yield result.value;
    }
  };

  for (var i = 0; i < count - 1; i++) {
    yield function* () {
      for (var v = 0; v < values.length - 1; v++) yield values[v];
      return values[v];
    };
  }
}

function toArray(generator) {
  var array = [];

  while (true) {
    var result = generator.next();
    array.push(result.value);
    if (result.done) return array;
  }
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