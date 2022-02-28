const getCoordinates = require('./helpers');
const shipFactory = require('./ship');
const { gameboardFactory, gameboard, myFleet } = require('./gameboard');

test('1 correct ship coordinates get returned (hor)', () => {
  gameboardFactory();
  expect(getCoordinates('carrier', 'horizontal', [0, 5])).toEqual([
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
});

/* test('2 correct ship coordinates get returned (hor)', () => {
  const board = gameboardFactory();
  expect(
    board.placeShip(
      'carrier',
      5,
      getCoordinates('carrier', 'horizontal', [0, 5])
    )
  ).toEqual([
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
}); */

/* test('invalid positions are rejected', () => {
  expect(gameboardFactory().gameboard).toEqual([null]);
}); */

/* test('correct ship coordinates get returned (hor)', () => {
  expect(
    getCoordinates('carrier', 'horizontal', [0, 5]).validCoordinates
  ).toEqual([
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
}); */

/* test('correct ship coordinates get returned (vert)', () => {
  expect(
    getCoordinates('carrier', 'vertical', [0, 5]).validCoordinates
  ).toEqual([
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ]);
}); */
