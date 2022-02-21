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
