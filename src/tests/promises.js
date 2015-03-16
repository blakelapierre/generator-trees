import expect from 'expect.js';
import {sync, async} from '../promises';

import {toGenerator, transform} from '../generators';

describe('sync', () => {
  it('should run twice', () => {
    sync(
      toGenerator([promise(1), promise(2)]),
      (result, count) => console.log(count, result),
      error => console.log('error', error));

    let counter = 0;
    function promise(value) {
      return new Promise(resolve => {
        counter++;
        resolve(value);
      });
    }
  });
});

describe('async', () => {
  it('should run once', () => {
    let counter = 0;

    return async(
      2,
      transform(toGenerator([1]), value => promise(value)),
      (result, count) => console.log(count, result),
      error => console.log('error', error));

    function promise(value) {
      return new Promise(resolve => {
        counter++;
        console.log('counter', counter);
        resolve(value);
      });
    }
  });
});
