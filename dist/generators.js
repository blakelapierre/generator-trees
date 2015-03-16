"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var loop = _regeneratorRuntime.mark(function loop(g) {
  var q, next, result, value;
  return _regeneratorRuntime.wrap(function loop$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        q = [], next = 0;

      case 1:
        if (!true) {
          context$1$0.next = 12;
          break;
        }

        result = g.next();

        if (result.done) {
          context$1$0.next = 9;
          break;
        }

        q.push(result.value);
        context$1$0.next = 7;
        return result.value;

      case 7:
        context$1$0.next = 10;
        break;

      case 9:
        return context$1$0.abrupt("break", 12);

      case 10:
        context$1$0.next = 1;
        break;

      case 12:
        if (!true) {
          context$1$0.next = 26;
          break;
        }

        result = g.next();

        if (result.done) {
          context$1$0.next = 20;
          break;
        }

        q.push(result.value);
        context$1$0.next = 18;
        return result.value;

      case 18:
        context$1$0.next = 24;
        break;

      case 20:
        value = q[next];
        context$1$0.next = 23;
        return value;

      case 23:
        next = (next + 1) % q.length;

      case 24:
        context$1$0.next = 12;
        break;

      case 26:
      case "end":
        return context$1$0.stop();
    }
  }, loop, this);
});

var interleave = _regeneratorRuntime.mark(

// Interleave the results of a series of generators
//
// `generators`: a generator that produces the generators to interleave
function interleave(generators) {
  var q, next, generator, result, remove;
  return _regeneratorRuntime.wrap(function interleave$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        remove = function remove(obj) {
          var index = q.indexOf(obj);
          if (index != -1) {
            q.splice(index, 1);
            if (next >= index) {
              next = next == 0 ? q.length - 1 : next - 1;
            }
          } else throw Error("Tried to remove object that is not in q", obj, q);
        };

        q = toArray(generators), next = 0;

      case 2:
        if (!(q.length > 0)) {
          context$1$0.next = 14;
          break;
        }

        next = next % q.length;
        generator = q[next], result = generator.next();

        if (!result.done) {
          context$1$0.next = 9;
          break;
        }

        remove(generator);

        if (!(q.length == 0)) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt("return", result.value);

      case 9:

        next = next + 1;

        context$1$0.next = 12;
        return result.value;

      case 12:
        context$1$0.next = 2;
        break;

      case 14:
      case "end":
        return context$1$0.stop();
    }
  }, interleave, this);
});

var threadValue = _regeneratorRuntime.mark(function threadValue(generators, value) {
  var result, generator;
  return _regeneratorRuntime.wrap(function threadValue$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        while (true) {
          result = generators.next(value), generator = result.value;
        }

      case 1:
      case "end":
        return context$1$0.stop();
    }
  }, threadValue, this);
});

var transform = _regeneratorRuntime.mark(function transform(generator, fn) {
  var _generator$next, value, done;

  return _regeneratorRuntime.wrap(function transform$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!true) {
          context$1$0.next = 12;
          break;
        }

        _generator$next = generator.next();
        value = _generator$next.value;
        done = _generator$next.done;

        if (!done) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt("return", value == TERMINAL ? TERMINAL : fn(value));

      case 8:
        context$1$0.next = 10;
        return fn(value);

      case 10:
        context$1$0.next = 0;
        break;

      case 12:
      case "end":
        return context$1$0.stop();
    }
  }, transform, this);
});

var take = _regeneratorRuntime.mark(function take(generator, count) {
  var result;
  return _regeneratorRuntime.wrap(function take$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!true) {
          context$1$0.next = 8;
          break;
        }

        result = generator.next();

        if (!(result.done || --count <= 0)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt("return", result.value);

      case 4:
        context$1$0.next = 6;
        return result.value;

      case 6:
        context$1$0.next = 0;
        break;

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, take, this);
});

var zip = _regeneratorRuntime.mark(

//Shouldn't we be yielding generators?
function zip(generators) {
  var array, remaining, product, i, generator, result;
  return _regeneratorRuntime.wrap(function zip$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        array = toArray(generators);
        remaining = array.length;

      case 2:
        if (!(remaining > 0)) {
          context$1$0.next = 11;
          break;
        }

        product = [];

        for (i = 0; i < array.length; i++) {
          generator = array[i], result = generator != null ? generator.next() : undefined;

          if (result) {
            product.push(result.value);
            if (result.done) {
              delete array[i];
              remaining--;
            }
          } else product.push(undefined);
        }

        if (!(remaining == 0)) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt("return", product);

      case 7:
        context$1$0.next = 9;
        return product;

      case 9:
        context$1$0.next = 2;
        break;

      case 11:
      case "end":
        return context$1$0.stop();
    }
  }, zip, this);
});

var repeatG = _regeneratorRuntime.mark(

// There are multiple ways to implement this function...
function repeatG(generator, count) {
  var values, i;
  return _regeneratorRuntime.wrap(function repeatG$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        values = [];
        context$1$0.next = 3;
        return _regeneratorRuntime.mark(function callee$1$0() {
          var result;
          return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!true) {
                  context$2$0.next = 12;
                  break;
                }

                result = generator.next();

                console.log("got result", result);
                values.push(result.value);

                if (!result.done) {
                  context$2$0.next = 8;
                  break;
                }

                return context$2$0.abrupt("return", result.value);

              case 8:
                context$2$0.next = 10;
                return result.value;

              case 10:
                context$2$0.next = 0;
                break;

              case 12:
              case "end":
                return context$2$0.stop();
            }
          }, callee$1$0, this);
        });

      case 3:
        i = 0;

      case 4:
        if (!(i < count - 1)) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.mark(function callee$1$1() {
          var v;
          return _regeneratorRuntime.wrap(function callee$1$1$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                v = 0;

              case 1:
                if (!(v < values.length - 1)) {
                  context$2$0.next = 7;
                  break;
                }

                context$2$0.next = 4;
                return values[v];

              case 4:
                v++;
                context$2$0.next = 1;
                break;

              case 7:
                return context$2$0.abrupt("return", values[v]);

              case 8:
              case "end":
                return context$2$0.stop();
            }
          }, callee$1$1, this);
        });

      case 7:
        i++;
        context$1$0.next = 4;
        break;

      case 10:
      case "end":
        return context$1$0.stop();
    }
  }, repeatG, this);
});

var repeat = _regeneratorRuntime.mark(function repeat(item, count) {
  var i;
  return _regeneratorRuntime.wrap(function repeat$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(count == 0)) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("why did you do that?");

      case 2:
        i = 0;

      case 3:
        if (!(i < count - 1)) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 6;
        return item;

      case 6:
        i++;
        context$1$0.next = 3;
        break;

      case 9:
        return context$1$0.abrupt("return", item);

      case 10:
      case "end":
        return context$1$0.stop();
    }
  }, repeat, this);
});

var toGenerator = _regeneratorRuntime.mark(function toGenerator(array) {
  var length, i;
  return _regeneratorRuntime.wrap(function toGenerator$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        length = array.length;

        if (!(length == 0)) {
          context$1$0.next = 3;
          break;
        }

        throw Error("What should we do here?");

      case 3:
        i = 0;

      case 4:
        if (!(i < length - 1)) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 7;
        return array[i];

      case 7:
        i++;
        context$1$0.next = 4;
        break;

      case 10:
        return context$1$0.abrupt("return", array[i]);

      case 11:
      case "end":
        return context$1$0.stop();
    }
  }, toGenerator, this);
});

var modifiableStack = _regeneratorRuntime.mark(

// if the stack is modified after popping the last element, the remaining
// stack won't be generated...
function modifiableStack(stack) {
  return _regeneratorRuntime.wrap(function modifiableStack$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(stack.length == 0)) {
          context$1$0.next = 2;
          break;
        }

        throw Error("Empty stack", stack);

      case 2:
        if (!(stack.length > 1)) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 5;
        return stack.pop();

      case 5:
        context$1$0.next = 2;
        break;

      case 7:
        return context$1$0.abrupt("return", stack.pop());

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, modifiableStack, this);
});

var modifiableQueue = _regeneratorRuntime.mark(

// if the queue is modified after popping the last element, the remaining
// queue won't be generated...
function modifiableQueue(queue) {
  return _regeneratorRuntime.wrap(function modifiableQueue$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(queue.length == 0)) {
          context$1$0.next = 2;
          break;
        }

        throw Error("Empty queue", queue);

      case 2:
        if (!(queue.length > 1)) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 5;
        return queue.shift();

      case 5:
        context$1$0.next = 2;
        break;

      case 7:
        return context$1$0.abrupt("return", queue.shift());

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, modifiableQueue, this);
});

var modifiableStackAlt = _regeneratorRuntime.mark(function modifiableStackAlt(stack) {
  return _regeneratorRuntime.wrap(function modifiableStackAlt$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(stack.length == 0)) {
          context$1$0.next = 2;
          break;
        }

        throw Error("Empty stack", stack);

      case 2:
        context$1$0.next = 4;
        return stack.pop();

      case 4:
        if (stack.length > 0) {
          context$1$0.next = 2;
          break;
        }

      case 5:
        return context$1$0.abrupt("return", TERMINAL);

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, modifiableStackAlt, this);
});

var modifiableQueueAlt = _regeneratorRuntime.mark(function modifiableQueueAlt(queue) {
  return _regeneratorRuntime.wrap(function modifiableQueueAlt$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(queue.length == 0)) {
          context$1$0.next = 2;
          break;
        }

        throw Error("Empty queue", queue);

      case 2:
        context$1$0.next = 4;
        return queue.shift();

      case 4:
        if (queue.length > 0) {
          context$1$0.next = 2;
          break;
        }

      case 5:
        return context$1$0.abrupt("return", TERMINAL);

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, modifiableQueueAlt, this);
});

var integers = _regeneratorRuntime.mark(function integers(start, end) {
  var i;
  return _regeneratorRuntime.wrap(function integers$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(end != undefined)) {
          context$1$0.next = 8;
          break;
        }

        i = start || 0;

      case 2:
        if (!(i < end)) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 5;
        return i++;

      case 5:
        context$1$0.next = 2;
        break;

      case 7:
        return context$1$0.abrupt("return", i);

      case 8:
        i = start || 0;

      case 9:
        if (!true) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 12;
        return i++;

      case 12:
        context$1$0.next = 9;
        break;

      case 14:
      case "end":
        return context$1$0.stop();
    }
  }, integers, this);
});

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TERMINAL = _core.Symbol();

exports.transform = transform;
exports.map = transform;
exports.each = each;
exports.modifiableStack = modifiableStack;
exports.modifiableQueue = modifiableQueue;
exports.modifiableStackAlt = modifiableStackAlt;
exports.modifiableQueueAlt = modifiableQueueAlt;
exports.toGenerator = toGenerator;
exports.toArray = toArray;
exports.loop = loop;
exports.interleave = interleave;
exports.repeat = repeat;
exports.repeatG = repeatG;
exports.integers = integers;
exports.take = take;
exports.zip = zip;
exports.TERMINAL = TERMINAL;

function mapGenerator(g, fn) {
  var mapped = [];
  while (true) {
    var result = g.next();
    mapped.push(fn(result.value));
    if (result.done) {
      return mapped;
    }
  }
}

function each(g, fn) {
  while (true) {
    var result = g.next();
    fn(result.value);
    if (result.done) {
      return;
    }
  }
}

function toArray(generator) {
  var array = [];

  while (true) {
    var _generator$next = generator.next();

    var value = _generator$next.value;
    var done = _generator$next.done;

    if (value != TERMINAL) array.push(value);
    if (done) {
      return array;
    }
  }
}

// Do we want to embed this terminal logic here?

// var i = 0;
//# sourceMappingURL=generators.js.map