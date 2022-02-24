const getCoordinates = require('./helpers');

test('invalid positions are rejected', () => {
  expect(
    getCoordinates('destroyer', 'horizontal', [9, 9]).validCoordinates
  ).toEqual([null]);
});

test('correct ship coordinates get returned (hor)', () => {
  expect(
    getCoordinates('carrier', 'horizontal', [0, 5]).validCoordinates
  ).toEqual([
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
});

test('correct ship coordinates get returned (vert)', () => {
  expect(
    getCoordinates('carrier', 'vertical', [0, 5]).validCoordinates
  ).toEqual([
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ]);
});
