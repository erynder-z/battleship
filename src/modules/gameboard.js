import { shipFactory } from './ship';

let gameboard;
const myFleet = [];

const gameboardFactory = () => {
  // a two dimensional array
  gameboard = {
    placeShip(id, length, coordinates) {
      // get the ship from the factory function and get its position
      const ship = shipFactory(id, length, coordinates);
      const position = ship.coordinates;

      if (position[0] === null) {
        return;
      }

      // define the position to look for
      position.forEach((item) => {
        const vert = item[0];
        const horiz = item[1];

        for (const property in gameboard) {
          for (let i = 0; i < gameboard[property].length; i++) {
            if (
              this[property][i].vertical === vert &&
              this[property][i].horizontal === horiz
            ) {
              this[property][i].occupied = true;
              return;
            }
          }
        }
      });

      myFleet.push(ship);
    },
    recieveAttack() {
      // recieve coordinates of an attach and mark that field as hit
    },
    illegalPositions: [],
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

export { gameboard, myFleet, gameboardFactory };
