import renderBoard from './dom';
import { boards, gameboardFactory } from './gameboard';
import { setupAI, setupPlayer } from './helpers';
import { playerFactory } from './player';

const runGame = () => {
  const player1 = playerFactory('dave', false);
  const playerAI = playerFactory('hal', true);
  const p1Board = gameboardFactory();
  const pAIBoard = gameboardFactory();
  p1Board.id = 'player1';
  pAIBoard.id = 'player2';
  boards.push(p1Board);
  boards.push(pAIBoard);

  setupAI(pAIBoard);
  setupPlayer(p1Board);
  /* console.log(player1); */
  /* console.log(playerAI); */
  /*  console.log(p1Board);
  console.log(pAIBoard); */
  renderBoard(p1Board, pAIBoard);

  const theButton = document.getElementById('AIattack');
  theButton.addEventListener('click', () => {
    playerAI.attack(playerAI.getRandomPosition());
    document.getElementById('p1Board').innerHTML = '';
    document.getElementById('pAIBoard').innerHTML = '';
    renderBoard(p1Board, pAIBoard);
  });
};

export default runGame;
