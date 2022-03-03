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
