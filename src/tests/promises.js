import expect from 'expect.js';
import {sync} from '../promises';

import {toGenerator} from '../generators';

describe('sync', () => {
  it('should run twice', () => {
    sync(
      toGenerator([promise(1), promise(2)]),
      (result, count) => console.log(count, resule),
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
