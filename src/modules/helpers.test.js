import { myFleet, gameboardFactory, gameboard } from './gameboard';
import { getCoordinates } from './helpers';
import { shipFactory } from './ship';

beforeEach(() => {
  const gameboardMock = jest.fn();
  gameboardMock.mockReturnValue(gameboardFactory());
});

afterEach(() => {
  jest.clearAllMocks();
});

test('correct ship coordinates get returned (hor)', () => {
  expect(getCoordinates('carrier', 'horizontal', [0, 5])).toEqual([
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
});

test('correct ship coordinates get returned (vert)', () => {
  expect(getCoordinates('carrier', 'vertical', [0, 5])).toEqual([
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ]);
});

test('invalid positions are rejected (outside the board)', () => {
  expect(getCoordinates('carrier', 'horizontal', [0, 8])).toEqual([null]);
});

test('invalid positions are rejected (field is already occupied)', () => {
  gameboard.illegalPositions.push([0, 5], [0, 6], [0, 7], [0, 8], [0, 9]);
  expect(getCoordinates('carrier', 'horizontal', [0, 5])).toEqual([null]);
});
