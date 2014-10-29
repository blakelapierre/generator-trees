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