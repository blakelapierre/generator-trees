export {sync, pipe, async};

function sync(generator, notify, notifyError) {
  return new Promise((resolve, reject) => {
    let count = 0;
    process(generator);

    function process(generator) {
      let {value, done} = generator.next();

      value
        .then(
          result => {
            count++;
            notify(result, count);
            if (done) resolve(count);
            else process(generator);
          },
          notifyError ? error : reject);

      function error(error) {
        count++;
        notifyError(error);
        if (done) resolve(count);
        else process(generator);
      }
    }
  });
}

function pipe(generator, notify, notifyError) {
  return new Promise((resolve, reject) => {
    process(generator);

    function process(generator) {
      let {value, done} = generator.next();

      value
        .then(
          next,
          error);
          //notifyError ? error : reject);

      function next(result, done) {
        notify(result);
        if (done) resolve(result);
        else process(generator);
      }

      function error(error) {
        if (!notifyError) reject(error);
        else {
          notifyError(error);
          if (done) resolve(count);
          else process(generator);
        }
      }
    }
  });
}

function async(maxConcurrent, generator, notify, notifyError) {
  return new Promise((resolve, reject) => {
    let count = 0,
        running = 0,
        finished = false;

    process(generator);

    function process(generator) {
      running++;
      count++;

      let {value, done} = generator.next();

      finished = done;

      value
        .then(
          result => {
            running--;
            notify(result, count);
            if (!finished) process(generator);
            else if (running == 0) resolve(count);
          },
          notifyError ? error : reject);

      if (running < maxConcurrent) process(generator);
    }

    function error(error) {
      running--;
      count++;
      notifyError(error);
      if (!finished) process(generator);
      else if (running == 0) resolve(count);
    }
  });
}