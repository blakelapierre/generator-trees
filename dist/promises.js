"use strict";

var _Promise = require("babel-runtime/core-js/promise")["default"];

module.exports = { sync: sync, pipe: pipe, async: async };

function sync(generator, notify, notifyError) {
  return new _Promise(function (resolve, reject) {
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
  return new _Promise(function (resolve, reject) {
    process(generator);

    function process(generator) {
      var _generator$next2 = generator.next();

      var value = _generator$next2.value;
      var done = _generator$next2.done;

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
  return new _Promise(function (resolve, reject) {
    var count = 0,
        running = 0,
        finished = false;

    process(generator);

    function process(generator) {
      running++;
      count++;

      var _generator$next3 = generator.next();

      var value = _generator$next3.value;
      var done = _generator$next3.done;

      finished = done;

      value.then(function (result) {
        running--;
        notify(result, count);
        if (!finished) process(generator);else if (running == 0) resolve(count);
      }, notifyError ? error : reject);

      if (running < maxConcurrent && !finished) process(generator);
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