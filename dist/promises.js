"use strict";

var _core = require("babel-runtime/core-js")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = sync;
exports.pipe = pipe;
exports.async = async;

function sync(generator, notify, notifyError) {
  return new _core.Promise(function (resolve, reject) {
    var count = 0;
    process(generator);

    function process(generator) {
      var _generator$next = generator.next();

      var value = _generator$next.value;
      var done = _generator$next.done;

      value.then(function (result) {
        count++;
        notify(result, count);
        if (done) resolve(count);else process(generator);
      }, notifyError ? error : reject);

      function error(error) {
        count++;
        notifyError(error);
        if (done) resolve(count);else process(generator);
      }
    }
  });
}

function pipe(generator, notify, notifyError) {
  return new _core.Promise(function (resolve, reject) {
    process(generator);

    function process(generator) {
      var _generator$next = generator.next();

      var value = _generator$next.value;
      var done = _generator$next.done;

      value.then(next, error);
      //notifyError ? error : reject);

      function next(result, done) {
        notify(result);
        if (done) resolve(result);else process(generator);
      }

      function error(error) {
        if (!notifyError) reject(error);else {
          notifyError(error);
          if (done) resolve(count);else process(generator);
        }
      }
    }
  });
}

function async(maxConcurrent, generator, notify, notifyError) {
  return new _core.Promise(function (resolve, reject) {
    var count = 0,
        running = 0,
        finished = false;

    process(generator);

    function process(generator) {
      running++;
      count++;

      var _generator$next = generator.next();

      var value = _generator$next.value;
      var done = _generator$next.done;

      finished = done;

      value.then(function (result) {
        running--;
        notify(result, count);
        if (!finished) process(generator);else if (running == 0) resolve(count);
      }, notifyError ? error : reject);

      if (running < maxConcurrent) process(generator);
    }

    function error(error) {
      running--;
      count++;
      notifyError(error);
      if (!finished) process(generator);else if (running == 0) resolve(count);
    }
  });
}
//# sourceMappingURL=promises.js.map