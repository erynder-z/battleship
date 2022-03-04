import { playerFactory, players } from './player';
import { boards, gameboardFactory, myFleet } from './gameboard';

afterEach(() => {
  const clear = () => {
    boards.length = 0;
    players.length = 0;
  };
  clear();
});

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

test('player should be able to attack the enemy gameboard', () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  const p1Board = gameboardFactory();
  const pAIBoard = gameboardFactory();
  p1Board.id = 'player1';
  pAIBoard.id = 'player2';
  boards.push(p1Board);
  boards.push(pAIBoard);

  const boardSpy = jest.spyOn(pAIBoard, 'recieveAttack');
  const attack = player1.attack([0, 5]);

  expect(boardSpy).toHaveBeenCalled();
});

test('player should be able to attack enemy ship', () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  const p1Board = gameboardFactory();
  const pAIBoard = gameboardFactory();
  p1Board.id = 'player1';
  pAIBoard.id = 'player2';
  boards.push(p1Board);
  boards.push(pAIBoard);

  pAIBoard.placeShip('carrier', 5, [
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
  ]);

  const pAIShip = pAIBoard.myFleet[0];
  const shipSpy = jest.spyOn(pAIShip, 'hit');
  const attack = player1.attack([0, 5]);

  expect(shipSpy).toHaveBeenCalled();
  expect(pAIShip.hitbox).toEqual([[0, 5]]);
});

test('AI player should get random fields', () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  const p1Board = gameboardFactory();
  const pAIBoard = gameboardFactory();
  p1Board.id = 'player1';
  pAIBoard.id = 'player2';
  boards.push(p1Board);
  boards.push(pAIBoard);

  const position = playerAI.getRandomPosition();

  expect(position[0]).toBeGreaterThanOrEqual(0);
  expect(position[0]).toBeLessThanOrEqual(9);
  expect(position[1]).toBeGreaterThanOrEqual(0);
  expect(position[1]).toBeLessThanOrEqual(9);
});

test('AI player should attack random fields', () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  const p1Board = gameboardFactory();
  const pAIBoard = gameboardFactory();
  p1Board.id = 'player1';
  pAIBoard.id = 'player2';
  boards.push(p1Board);
  boards.push(pAIBoard);

  const boardSpy = jest.spyOn(p1Board, 'recieveAttack');

  const randomAttack = playerAI.attack(playerAI.getRandomPosition());

  expect(boardSpy).toHaveBeenCalled();
  expect(JSON.stringify(p1Board)).toContain('"hit":true');
});
