const gameboardFactory = () => {
  /*   const gameboard = [];
  const size = 100;
  for (let i = 0; i < size; i++) {
    gameboard.push({ field: i + 1, occupied: false, hit: false });
  }
  return gameboard; */

  const gameboard = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      gameboard.push({
        field: gameboard.length + 1,
        y: i + 1,
        x: j + 1,
        occupied: false,
        hit: false,
      });
    }
  }
  return gameboard;
};

module.exports = gameboardFactory;
