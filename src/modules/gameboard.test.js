const gameboardFactory = require('./gameboard');

const mockGameboard = gameboardFactory();

test('grid fields are correctly named:', () => {
  expect(mockGameboard[0][1].horizontal).toEqual(1);
});

test('grid fields are objects with correct key-values:', () => {
  expect(mockGameboard[3][4]).toEqual({
    hit: false,
    occupied: false,
    vertical: 3,
    horizontal: 4,
  });
});
