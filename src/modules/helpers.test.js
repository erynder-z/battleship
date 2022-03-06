import { myFleet, gameboardFactory, gameboard } from './gameboard';
import { getCoordinates } from './helpers';
import { shipFactory } from './ship';

/* beforeEach(() => {
  const gameboardMock = jest.fn();
  gameboardMock.mockReturnValue(gameboardFactory());
});

afterEach(() => {
  jest.clearAllMocks();
}); */

test('correct ship coordinates get returned (hor)', () => {
  const board = gameboardFactory();
  expect(getCoordinates('carrier', 'horizontal', [0, 5], board)).toEqual([
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
});

test('correct ship coordinates get returned (vert)', () => {
  const board = gameboardFactory();
  expect(getCoordinates('carrier', 'vertical', [0, 5], board)).toEqual([
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ]);
});

test('invalid positions are rejected (outside the board)', () => {
  const board = gameboardFactory();
  expect(getCoordinates('carrier', 'horizontal', [0, 8], board)).toEqual([
    null,
  ]);
});

test('invalid positions are rejected (field is already occupied)', () => {
  const board = gameboardFactory();
  gameboard.illegalPositions.push([0, 5], [0, 6], [0, 7], [0, 8], [0, 9]);
  expect(getCoordinates('carrier', 'horizontal', [0, 5], board)).toEqual([
    null,
  ]);
});
