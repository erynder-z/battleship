const gameboardFactory = require('./gameboard');

const mockGameboard = gameboardFactory();

test('grid fields are correctly named:', () => {
  expect(mockGameboard[0].field).toEqual(1);
});

test('grid fields are objects with correct key-values:', () => {
  expect(mockGameboard[98]).toEqual({
    field: 99,
    x: 9,
    y: 10,
    occupied: false,
    hit: false,
  });
});
