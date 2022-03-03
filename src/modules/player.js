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
      },
    };
  }
  return {
    id: 'player1',
    name,
    isActive: true,
    attack(position) {
      // attack enemy gameboard
    },
  };
};

export { playerFactory, players };
