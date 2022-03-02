import { gameboardFactory } from './gameboard';

let board;

beforeEach(() => (board = gameboardFactory()));

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

test('shots return the gameboard-object', () => {
  const oldBoard = gameboardFactory();
  const newBoard = oldBoard.recieveAttack([0, 0]);

  expect(oldBoard).toEqual(newBoard);
});

test('shots should be registered on the gameboard', () => {
  board.recieveAttack([0, 0]);
  const underFire = {
    vertical: 0,
    horizontal: 0,
    occupied: false,
    hit: true,
  };

  expect(board[0]).toEqual(
    expect.arrayContaining([expect.objectContaining(underFire)])
  );
});

test('should not be able to fire at the same field twice', () => {
  board.recieveAttack([0, 0]);
  expect(board.recieveAttack([0, 0])).toEqual(null);
});
