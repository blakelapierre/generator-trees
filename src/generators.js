module.exports = {
  transform,
  map: transform,
  each: each,
  toGenerator,
  toArray,
  loop,
  interleave,
  repeat,
  repeatG,
  integers,
  zip
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


// Interleave the results of a series of generators
//
// `generators`: a generator that produces the generators to interleave
function* interleave(generators) {
  var q = toArray(generators),
      next = 0;

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


function* threadValue(generators, value) {
  while (true) {
    var result = generators.next(),
        generator = result.value;


  }
}

function mapGenerator(g, fn) {
  var mapped = [];
  while (true) {
    var result = g.next();
    mapped.push(fn(result.value));
    if (result.done) return mapped;
  }
}

function each(g, fn) {
  while (true) {
    var result = g.next();
    fn(result.value);
    if (result.done) return;
  }
}

function* transform(generator, fn) {
  while (true) {
    var result = generator.next();
        newValue = fn(result.value);

    if (result.done) return newValue;
    else yield newValue;
  }
}

//Shouldn't we be yielding generators?
function* zip(generators) {
  var array = toArray(generators);

  var remaining = array.length;
  while (remaining > 0) {
    var product = [];
    for (var i = 0; i < array.length; i++) {
      var generator = array[i],
          result = generator != null ? generator.next() : undefined;

      if (result) {
        product.push(result.value);
        if (result.done) {
          delete array[i];
          remaining--;
        }
      }
      else product.push(undefined);
    }

    if (remaining == 0) return product;
    yield product;
  }
}

// There are multiple ways to implement this function...
function* repeatG(generator, count) {
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

function* repeat(item, count) {
  if (count == 0) throw new Error('why did you do that?');

  for (var i = 0; i < count - 1; i++) yield item;
  return item;
}

function toArray(generator) {
  var array = [];

  while (true) {
    var result = generator.next();
    array.push(result.value);
    if (result.done) return array;
  }
}

function* toGenerator(array) {
  var length = array.length;

  if (length == 0) throw Error('What should we do here?');

  var i = 0;
  for (i; i < length - 1; i++) yield array[i];
  return array[i];
}

function* integers(start) {
  var i = start || 0;
  while (true) yield i++;
}