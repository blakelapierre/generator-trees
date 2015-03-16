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

describe('toGenerator', () => {
  it('should work with 1 value', () => {
    let generator = toGenerator([1]);

    let {value, done} = generator.next();

    expect(done).to.be(true);
    expect(value).to.be(1);
  });
});

describe('transform', () => {
  let value = 1;

  it('should work with 1 value', () => {
    let generator = repeat(value, 1);

    expect(toArray(transform(generator, value => value + 1))).to.be.eql([2]);
  });

  it('should work with toGenerator', () => {
    let generator = transform(toGenerator([1]), value => value + 1);

    let {value, done} = generator.next();

    expect(done).to.be(true);
    expect(value).to.be(2);
  });
});

describe('zip', () => {
  let generators = toGenerator([
    toGenerator([1, 2, 3]),
    toGenerator([4, 5, 6])
  ]);

  let cases = [
    ['{args}.length generators of {1}.length items each',
      [[[1, 2, 3], [4, 5, 6]],
        [[1,4],[2,5],[3,6]]]
    ]
  ];

  for (let c of cases) {
    console.log(c);
    let name = c[0],
        parameters = c[1],
        input = parameters[0],
        output = parameters[1];

    it('should work with ' + name, () => {
      expect(toArray(zip(toGenerator([toGenerator(input[0]), toGenerator(input[1])])))).to.eql(output);
    });
  }

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

    expect(count).to.equal(2);
    expect(array).to.eql([1, 3]);
  });
});

describe('stuff', () => {
  describe('should generate ' + 5 + ' tests', () => {
    let indices = [0, 1, 2, 3, 4];
    for (let i = 0; i < 5; i++) {
      it('should be ' + i, () => {
        expect(indices[i]).to.equal(i);
      });
    }
  });
});