const gameboardFactory = () => {
  const gameboard = [];
  const size = 100;
  for (let i = 0; i < size; i++) {
    gameboard.push(i + 1);
  }
  return gameboard;
};

module.exports = gameboardFactory;
