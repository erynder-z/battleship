import { playerFactory, players } from './player';

test('if player is AI, it should return the AI-player', () => {
  const playerAI = playerFactory('hal', true);
  expect(playerAI.isAI).toBe(true);
});

test('if player is not AI, it should return the non-AI-player', () => {
  const player1 = playerFactory('dave', false);
  expect(player1.isAI).toBe(undefined);
});

test('players get placed my players-array', () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  players.push(player1);
  players.push(playerAI);

  expect(players.length).toBe(2);
  expect(players[0].name).toBe('dave');
});

test('players should take turns', () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  players.push(player1);
  players.push(playerAI);
  expect(player1.isActive).toBe(true);
  expect(playerAI.isActive).toBe(false);

  player1.attack([0, 5]);

  expect(player1.isActive).toBe(false);
  expect(playerAI.isActive).toBe(true);

  playerAI.attack([5, 5]);

  expect(player1.isActive).toBe(true);
  expect(playerAI.isActive).toBe(false);
});
