import { gameboardFactory } from './gameboard';

const board = gameboardFactory();

test('grid fields are correctly named', () => {
  expect(board[0][1].horizontal).toEqual(1);
});

test('grid fields are objects with correct key-values', () => {
  expect(board[3][4]).toEqual({
    hit: false,
    occupied: false,
    vertical: 3,
    horizontal: 4,
  });
});

test('ships can be placed', () => {
  board.placeShip('carrier', 5, [
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
  expect(
    board[0][5].occupied &&
      board[0][6].occupied &&
      board[0][7].occupied &&
      board[0][8].occupied &&
      board[0][9].occupied
  ).toBe(true);
  expect(board[0][4].occupied).toBe(false);
});
