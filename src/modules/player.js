/* const playerFactory = (name, isAI) => ({
  name,
  isAI,
  isActive: false,
  attack(position) {
    // attack enemy gameboard
  },
}); */

const playerFactory = (name, isAI) => {
  if (isAI === true) {
    return {
      name,
      isAI,
      isActive: false,
      attack(position) {
        // attack enemy gameboard
      },
    };
  }
  return {
    name,
    isActive: true,
    attack(position) {
      // attack enemy gameboard
    },
  };
};

export { playerFactory };
