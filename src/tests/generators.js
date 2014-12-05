var g = require('../generators');

describe('toArray', () => {

  it('should work with 1 value', () => {
    var generator = g.repeat(value, 1);
    expect(g.toArray(generator)).toBe([1]);
  });
});

describe('transform', () => {
  var value = 1;

  it('should work with 1 value', () => {
    var generator = g.repeat(value, 1);

    expect(g.toArray(transform(generator, value => value + 1))).toBe([2]);
  });
});

describe('zip', () => {
  var generators = g.toGenerator([
    g.toGenerator([1, 2, 3]),
    g.toGenerator([4, 5, 6])
  ]);

  expect(g.zip(generators)).toBe([[1,4], [2, 5], [3, 6]]);
});