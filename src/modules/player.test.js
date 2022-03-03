import { playerFactory } from './player';

test('if player is AI, it should return the AI-player', () => {
  const playerAI = playerFactory('hal', true);
  expect(playerAI.isAI).toBe(true);
});

test('if player is not AI, it should return the non-AI-player', () => {
  const player1 = playerFactory('dave', false);
  expect(player1.isAI).toBe(undefined);
});
