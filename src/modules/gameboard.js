const gameboardFactory = () => {
  // a two dimensional array
  const gameboard = {};
  const cols = 10;
  const rows = 10;
  for (let i = 0; i < cols; i++) {
    gameboard[i] = [];
    for (let j = 0; j < rows; j++) {
      gameboard[i].push({
        vertical: i,
        horizontal: j,
        occupied: false,
        hit: false,
      });
    }
  }

  return gameboard;
};
module.exports = gameboardFactory;
