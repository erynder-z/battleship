const getCoordinates = require('./helpers');

test('valid positions are accepted', () => {
  expect(getCoordinates('carrier', 'horizontal', [0, 5])).toEqual([[0, 5]]);
});

test('invalid positions are rejected', () => {
  expect(getCoordinates('destroyer', 'horizontal', [9, 9])).toEqual([
    undefined,
  ]);
});
