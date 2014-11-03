var generators = require('../index');

var {preorder, inorder, postorder, breadthFirst, makeNode, toNode, asNode, allBinaryTrees, printTree} = generators.t;
var {transform, interleave, map, each, toGenerator, toArray, integers} = generators.g;

function* test() {
  yield 1;
  yield 2;
  yield* toGenerator([4, 5, 6, 7]);
  //return null;
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

var addition = () => {
  return makeNode('+', function* () {
    yield makeNode(1);
    return makeNode('*', function* () {
      yield makeNode(2);
      return makeNode(3);
    });
  });
};

console.log(asNode(makeNode, 1, makeNode('+', [makeNode(3), makeNode(4)])));

console.log('\npreorder addition');
each(preorder(addition()), value => console.log('log', value));
console.log(toArray(preorder(addition())));

console.log('\ninorder addition');
each(inorder(addition()), value => console.log('log', value));
console.log(toArray(inorder(addition())));

console.log('\npostorder addition');
each(postorder(addition()), value => console.log('log', value));
console.log(toArray(postorder(addition())));

console.log('\nbreadthFirst addition');
each(breadthFirst(addition()), value => console.log('log', value));
console.log(toArray(breadthFirst(addition())));

console.log('\ndepthFirst addition2');
var addition2 = toGenerator(['+', toGenerator([1]), toGenerator([2])]);
each(inorder(addition2), value => console.log('log', value));

var treeNode = () => {
  return makeNode('root', [
          makeNode('+', [makeNode(1), makeNode(2)]),
          makeNode('names', [
            makeNode('five', [makeNode(5)]),
            makeNode('six',  [makeNode(6)])
          ])
        ]);
};

console.log('\ntreeNode');
map(inorder(treeNode()), value => console.log('tr', value));


function testTree(name, tree) {
  console.log('\n', name);

  console.log(name, 'preorder', toArray(preorder(parseAsNode(tree))));
  console.log(name, 'inorder', toArray(inorder(parseAsNode(tree))));
  console.log(name, 'postorder', toArray(postorder(parseAsNode(tree))));
  console.log(name, 'breadthFirst', toArray(breadthFirst(parseAsNode(tree))));
}


var basicTree = {
  'root': {
    'one': 1
  }
};

testTree('basic tree', basicTree);

var binaryTree = {
  'root': {
    'one': 1,
    'two': 2
  }
};

testTree('binary tree', binaryTree);

var simpleTree = {
  'root': {
    'level1': {
      'level2': 2,
      'wut': 'this'
    }
  }
};

testTree('simple tree', simpleTree);


var tree = {
  'root': {
    '+': [1, 2, {'*': [3, 4]}],
    'middle': {
      'goes': {
        'deep': ['into', 'the', {'tree': true}]
      }
    },
    'names': {
      'five': 5,
      'six': 6
    }
  }
};

testTree('tree', tree);

// Children are ordered
var tree2 = {
  'root': [
    {'+': [1, 2, {'*': [3, 4]}]},
    {'middle': {'goes': {'deep': ['into', 'the', {'tree': true}]}}},
    {'names': [{'five': 5, 'six': 6}]}
  ]
};

testTree('tree2', tree2);

var tree3 = {
  'root': [
    {'+': [
      1,
      2,
      {'*': [3, 4]}]},
    {'middle': {
      'goes': {
        'deep': [
          'into',
          'the',
          {'tree': true}]}}},
    {'names': [
      {'five': 5},
      {'six': 6}]}]
};

testTree('tree3', tree3);

var tree4 = {
  'root': [
    {'+': [
      1,
      2,
      {'*': [3, 4]}
    ]},
    {'middle': {
      'goes': {
        'deep': [
          'into',
          'the',
          {'tree': true}]
        }
      }
    },
    {'names': [
      {'five': 5},
      {'six': 6}
    ]}
  ]
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
  gMap(generator, value => console.log(prefix, value));
}


function* parseAsNode(obj, value) {

  value = value || '@@root';

  var generator = makeNode(value, () => childrenFunction(obj));

  while (true) {
    var result = generator.next();

    if (result.done) return result.value;
    else yield result.value;
  }

  function* childrenFunction(obj) {
    if (obj.length) {
      for (var i = 0; i < obj.length - 1; i++) yield makeNode(obj[i]);
      return makeNode(obj[i]);
    }
    else if (typeof obj == 'object') {
      var keys = Object.keys(obj);

      if (keys.length == 0) throw new Error('is this allowed?');

      for (var i = 0; i < keys.length - 1; i++) {
        var key = keys[i];
        var childValue = obj[key];

        yield makeNode(key, (childValue => () => childrenFunction(childValue))(childValue));

        // There should be a call to makeNode in here somehweret
        // var generator = toNode(childValue, key);
        // var generator = makeNode(key, () => childrenFunction(childValue));
        // while (true) {
        //   var result = generator.next();
        //   yield result.value;
        //   if (result.done) break;
        // }
      }

      var key = keys[i];
      var childValue = obj[key];

      return makeNode(key, () => childrenFunction(childValue));

      // There should be a call to makeNode in here somehwere?
      //var generator = toNode(childValue, key);
      // var generator = makeNode(key, () => childrenFunction(childValue));
      // while (true) {
      //   var result = generator.next();
      //   if (result.done) return result.value;
      //   else yield result.value;
      // }
    }
    else return makeNode(obj);
  }

  // how to handle arrays?

}


// var loop = generators.loop(clusterMachineGenerator(5));

// var result;

// for (var i = 0; i < 100; i++) {
//   result = loop.next();
//   console.log('result', result);
// }

var q = [
  clusterMachineGenerator(10, 'sfo1-'),
  clusterMachineGenerator(5, 'nyc3-'),
  clusterMachineGenerator(7, 'lon1-')
];

function* clusterMachineGenerator(machineCount, prefix) {
  prefix = prefix || '';
  var i;
  for (i = 0; i < machineCount - 1; i++) yield generateMachine(i);

  return generateMachine(i);

  function generateMachine(number) {
    return { id: prefix + number.toString() };
  }
}

function* generator2() {
  var loop = interleave(toGenerator(q)),
      queue = loop.next().value;
  var generatorResult;
  do {
    generatorResult = loop.next();

    if (generatorResult.done) return;
    else {
      var machineGenerator = generatorResult.value,
          machineResult = machineGenerator.next();

      if (machineResult.done) queue.remove(machineGenerator);
      else yield machineResult.value;
    }
  } while (!generatorResult.done);
}

function* generator3() {
  var loop = interleave(toGenerator(q)),
      queue = loop.next().value;
  var generatorResult;
  do {
    generatorResult = loop.next();

    if (generatorResult.done) return;
    else {
      var machineGenerator = generatorResult.value,
          machineResult = machineGenerator.next();

      if (machineResult.done) queue.remove(machineGenerator);
      else yield machineResult.value;
    }
  } while (!generatorResult.done);
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
  console.log(toArray(preorder(result.value)));
  //printTree(result.value);

  if (result.done) break;
}
console.log('produced', i, 'binary trees of size', size);
console.log(typeof integers);