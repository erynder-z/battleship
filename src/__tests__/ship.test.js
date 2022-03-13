import { shipFactory } from '../modules/ship';

const mockBattleship = shipFactory('battleship', 4, [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);

describe('ship:', () => {
  test('correct type:', () => {
    expect(mockBattleship.type).toBe('battleship');
  });

  test('correct length:', () => {
    expect(mockBattleship.length).toBe(4);
  });

  test('correct coordinates:', () => {
    expect(mockBattleship.coordinates).toEqual([
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]);
  });
});

describe('ship:', () => {
  test('can be missed:', () => {
    mockBattleship.hit([1, 1]);
    expect(mockBattleship.hitbox).toEqual([]);
  });

  test('can be hit:', () => {
    mockBattleship.hit([0, 1]);
    expect(mockBattleship.hitbox).toEqual([[0, 1]]);
  });

  test('can survive hits before sinking:', () => {
    mockBattleship.hit([0, 2]);
    expect(mockBattleship.isSunk()).toBe(false);
  });

  test('hitbox registers correctly:', () => {
    mockBattleship.hit([0, 3]);
    expect(mockBattleship.hitbox).toEqual([
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
  });

  test('be sunk:', () => {
    mockBattleship.hit([0, 4]);
    expect(mockBattleship.isSunk()).toBe(true);
  });
});
