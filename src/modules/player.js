import { boards } from './gameboard';

/* const playerFactory = (name, isAI) => ({
  name,
  isAI,
  isActive: false,
  attack(position) {
    // attack enemy gameboard
  },
}); */
const players = [];

const playerFactory = (name, isAI) => {
  if (isAI === true) {
    return {
      id: 'player2',
      name,
      isAI,
      isActive: false,
      attack(position) {
        // attack enemy gameboard
        boards.forEach((board) => {
          if (this.id !== board.id) {
            board.recieveAttack(position);
          }
        });
        // switch active player
        players.forEach((item) => {
          if (this.id === item.id) {
            item.isActive = false;
          } else if (this.id !== item.id) {
            item.isActive = true;
          }
        });
      },
    };
  }
  return {
    id: 'player1',
    name,
    isActive: true,
    attack(position) {
      // attack enemy gameboard
      boards.forEach((board) => {
        if (this.id !== board.id) {
          board.recieveAttack(position);
        }
      });
      // switch active player
      players.forEach((item) => {
        if (this.id === item.id) {
          item.isActive = false;
        } else if (this.id !== item.id) {
          item.isActive = true;
        }
      });
    },
  };
};

export { playerFactory, players };
