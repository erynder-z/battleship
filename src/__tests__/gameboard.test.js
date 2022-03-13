import { gameboardFactory } from '../modules/gameboard';

let board;

beforeEach(() => (board = gameboardFactory()));

afterEach(() => {
  const clear = () => {
    board = null;
  };
  clear();
});

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
  expect(board.myFleet[0].type).toBe('carrier');
  expect(board.myFleet[0].coordinates).toEqual([
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
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

test('if a ship is present, it should send the field coordinates to the right ship', () => {
  board.placeShip('carrier', 5, [
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);
  board.placeShip('submarine', 2, [
    [5, 5],
    [5, 6],
  ]);

  const ship = board.myFleet[0];
  const shipSpy = jest.spyOn(ship, 'hit');
  board.recieveAttack([0, 5]);

  expect(shipSpy).toHaveBeenCalled();
});

test('hit on ships should register on the correct ship', () => {
  board.placeShip('submarine', 2, [
    [5, 5],
    [5, 6],
  ]);
  const ship = board.myFleet[0];
  board.recieveAttack([5, 5]);

  expect(ship.hitbox.length).not.toBe(0);
  expect(ship.hitbox).toEqual([[5, 5]]);
});

test('should check if ship is sunk after recieving an attack', () => {
  board.placeShip('submarine', 2, [
    [5, 5],
    [5, 6],
  ]);
  const ship = board.myFleet[0];
  const shipSpy = jest.spyOn(ship, 'isSunk');
  board.recieveAttack([5, 5]);

  expect(shipSpy).toHaveBeenCalled();
  expect(shipSpy).toHaveReturnedWith(false);
});

test('isSunk should return true only when ship is sunk', () => {
  board.placeShip('submarine', 2, [
    [5, 5],
    [5, 6],
  ]);
  const ship = board.myFleet[0];
  const shipSpy = jest.spyOn(ship, 'isSunk');
  board.recieveAttack([5, 5]);
  expect(shipSpy).toHaveReturnedWith(false);

  board.recieveAttack([5, 6]);
  expect(shipSpy).toHaveReturnedWith(true);
});
