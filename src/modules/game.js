import renderBoard from './dom';
import { boards, gameboardFactory } from './gameboard';
import { setupAI } from './helpers';
import {
  activatePlacementButtons,
  activateResetButton,
  gameOver,
} from './interface';
import { playerFactory, players } from './player';

const runGame = () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  const p1Board = gameboardFactory();
  const pAIBoard = gameboardFactory();
  p1Board.id = 'Player1';
  pAIBoard.id = 'Player2';
  boards.push(p1Board);
  boards.push(pAIBoard);
  players.push(player1);
  players.push(playerAI);

  setupAI(pAIBoard);

  renderBoard(p1Board, pAIBoard, player1, playerAI);
  activatePlacementButtons(p1Board, pAIBoard, player1, playerAI);
  activateResetButton();
};

const gameoverCheck = (board) => {
  const allAreTrue = (board) =>
    board.myFleet.every((ship) => ship.isSunk() === true);
  if (allAreTrue(board) === true) {
    console.log(`${board.id} was defeated`);
    gameOver(board.id);
  }
};

export { runGame, gameoverCheck };
