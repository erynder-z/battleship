import renderBoard from './dom';
import { boards, gameboardFactory } from './gameboard';
import { setupAI, setupPlayer } from './helpers';
import { activatePlacementButtons } from './interface';
import { playerFactory, players } from './player';

const runGame = () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  const p1Board = gameboardFactory();
  const pAIBoard = gameboardFactory();
  const gameover = false;
  p1Board.id = 'player1';
  pAIBoard.id = 'player2';
  boards.push(p1Board);
  boards.push(pAIBoard);
  players.push(player1);
  players.push(playerAI);

  setupAI(pAIBoard);

  /* console.log(player1); */
  /* console.log(playerAI); */
  /*  console.log(p1Board);
  console.log(pAIBoard); */
  renderBoard(p1Board, pAIBoard, player1, playerAI);
  activatePlacementButtons(p1Board, pAIBoard, player1, playerAI);
};

const gameoverCheck = (board) => {
  const allAreTrue = (board) =>
    board.myFleet.every((ship) => ship.isSunk() === true);
  if (allAreTrue(board) === true) {
    console.log(`${board.id}has won the game`);
  }
};

export { runGame, gameoverCheck };
