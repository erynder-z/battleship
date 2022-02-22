const gameboardFactory = require('./gameboard');

const mockGameboardEmpty = gameboardFactory();

test('grid fields are correctly named', () => {
  expect(mockGameboardEmpty[0][1].horizontal).toEqual(1);
});

test('grid fields are objects with correct key-values', () => {
  expect(mockGameboardEmpty[3][4]).toEqual({
    hit: false,
    occupied: false,
    vertical: 3,
    horizontal: 4,
  });
});

mockGameboardEmpty.placeShip('battleship', 4, [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);

const mockGameboardWithShip = mockGameboardEmpty;

test('ships can be placed', () => {
  expect(mockGameboardWithShip[0][1].occupied).toBe(true);
});
