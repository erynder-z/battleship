const shipFactory = require('./ship');

const mockBattleship = shipFactory('battleship', 4, ['A1', 'A2', 'A3', 'A4']);

describe('ship has:', () => {
  test('correct id:', () => {
    expect(mockBattleship.id).toBe('battleship');
  });

  test('correct length:', () => {
    expect(mockBattleship.length).toBe(4);
  });

  test('correct coordinates:', () => {
    expect(mockBattleship.coordinates).toEqual(['A1', 'A2', 'A3', 'A4']);
  });
});

describe('ship can:', () => {
  test('be missed:', () => {
    mockBattleship.hit('A5');
    expect(mockBattleship.hitbox).toEqual([]);
  });

  test('be hit:', () => {
    mockBattleship.hit('A1');
    expect(mockBattleship.hitbox).toEqual(['A1']);
  });

  test('survive hits before sinking:', () => {
    mockBattleship.hit('A2');
    expect(mockBattleship.isSunk()).toBe(false);
  });

  test('be sunk:', () => {
    mockBattleship.hit('A3');
    mockBattleship.hit('A4');
    expect(mockBattleship.isSunk()).toBe(true);
  });
});
