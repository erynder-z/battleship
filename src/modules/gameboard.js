const shipFactory = require('./ship');

let gameboard;

const gameboardFactory = () => {
  // a two dimensional array
  gameboard = {
    placeShip(id, length, coordinates) {
      // get the ship from the factory function and get its position
      const ship = shipFactory(id, length, coordinates);
      const position = ship.coordinates;

      /* coordinates format representing index of the array (vertical) and index of the object inside that array (horizontal)
       [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ] */

      // define the position to look for
      position.forEach((item) => {
        const vert = item[0];
        const horiz = item[1];

        // and mark the mathing nested objects
        for (const property in gameboard) {
          for (let i = 0; i < gameboard[property].length; i++) {
            if (
              gameboard[property][i].vertical === vert &&
              gameboard[property][i].horizontal === horiz
            ) {
              gameboard[property][i].occupied = true;
              return;
            }
          }
        }
      });
    },
    recieveAttack() {
      // recieve coordinates of an attach and mark that field as hit
    },
  };

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
