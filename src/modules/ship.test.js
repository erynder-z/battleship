const shipFactory = require('./ship');

const mockBattleship = shipFactory('battleship', 4, [1, 2, 3, 4]);

describe('ship has:', () => {
  test('correct id:', () => {
    expect(mockBattleship.id).toBe('battleship');
  });

  test('correct length:', () => {
    expect(mockBattleship.length).toBe(4);
  });

  test('correct coordinates:', () => {
    expect(mockBattleship.coordinates).toEqual([1, 2, 3, 4]);
  });
});

describe('ship can:', () => {
  test('be missed:', () => {
    mockBattleship.hit(5);
    expect(mockBattleship.hitbox).toEqual([]);
  });

  test('be hit:', () => {
    mockBattleship.hit(1);
    expect(mockBattleship.hitbox).toEqual([1]);
  });

  test('survive hits before sinking:', () => {
    mockBattleship.hit(2);
    expect(mockBattleship.isSunk()).toBe(false);
  });

  test('be sunk:', () => {
    mockBattleship.hit(3);
    mockBattleship.hit(4);
    expect(mockBattleship.isSunk()).toBe(true);
  });
});
