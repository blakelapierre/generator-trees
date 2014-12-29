import {repeat, toArray, toGenerator, map, transform, zip, modifiableStack, modifiableStackAlt} from '../generators';

console.log('repeat', repeat);

// let g = require('../generators');
let should = require('should'),
    expect = require('expect.js');

describe('toArray', () => {

  it('should work with 1 value', () => {
    let value = 1,
        generator = repeat(value, 1),
        array = toArray(generator);

    array.should.be.eql([1]);
    array.should.not.be.eql([2]);

    // expect(g.toArray(generator)).to.be([1]);
  });
});

describe('transform', () => {
  let value = 1;

  it('should work with 1 value', () => {
    let generator = repeat(value, 1);

    expect(toArray(transform(generator, value => value + 1))).to.be.eql([2]);
  });
});

describe('zip', () => {
  let generators = toGenerator([
    toGenerator([1, 2, 3]),
    toGenerator([4, 5, 6])
  ]);

  it('should work with 2 generators of 3 items each', () => {
    expect(toArray(zip(generators))).to.be.eql([[1,4], [2, 5], [3, 6]]);
  });
});

describe('modifiableStackAlt', () => {
  let stack = [1];

  it('should run 2 times', () => {
    let count = 0;

    let array = toArray(map(modifiableStackAlt(stack), value => {
      count++;

      if (count == 1) stack.push(3);

      return value;
    }));

    console.log('count', count);

    expect(count).to.equal(2);
    expect(array).to.eql([1, 3]);
  });
});