const gameboardFactory = require('./gameboard');

const mockGameboard = gameboardFactory();

test('grid fields are correctly named:', () => {
  expect(mockGameboard[0]).toEqual(1);
});

test('grid fields are correctly named:', () => {
  expect(mockGameboard[99]).toEqual(100);
});
