import { boards } from './gameboard';

const players = [];

const playerFactory = (name, isAI) => {
  if (isAI === true) {
    return {
      id: 'player2',
      name,
      isAI,
      isActive: false,

      getRandomPosition() {
        let randomHoritontal;
        let randomVertical;
        const randomPosition = [];

        boards.forEach((board) => {
          if (this.id !== board.id) {
            const randomArray = board[Math.floor(Math.random() * 10)];
            const randomObject = randomArray[Math.floor(Math.random() * 10)];
            randomVertical = randomObject.vertical;
            randomHoritontal = randomObject.horizontal;
          }
        });
        randomPosition.push(randomVertical);
        randomPosition.push(randomHoritontal);

        return randomPosition;
      },

      validatePosition(position) {
        const checked = position;
        const vert = position[0];
        const horiz = position[1];
        // check if posittion  was alredy hit
        boards.forEach((board) => {
          if (this.id !== board.id) {
            const field = board[vert].find(
              ({ horizontal }) => horizontal === horiz
            );
            if (field.hit === false) {
              this.attack(checked);
              return;
            }
            if (field.hit === true) {
              this.validatePosition(this.getRandomPosition());
            }
          }
        });
      },

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

const turnAI = (pAI) => {
  pAI.attack(pAI.getRandomPosition());
  return pAI;
};

export { playerFactory, players, turnAI };
