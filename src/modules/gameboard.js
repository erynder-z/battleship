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
    recieveAttack(position) {
      // recieve coordinates of an attach and mark that field as hit
      const vert = position[0];
      const horiz = position[1];

      // loop over the gameboard
      for (const property in gameboard) {
        for (let i = 0; i < gameboard[property].length; i++) {
          if (
            this[property][i].vertical === vert &&
            this[property][i].horizontal === horiz
          ) {
            if (this[property][i].hit === true) {
              console.log('already hit!');
              return null;
            }
            this[property][i].hit = true;
            // loop over ships
            myFleet.forEach((object) => {
              object.coordinates.forEach((array) => {
                if (JSON.stringify(array) === JSON.stringify(position)) {
                  object.hit();
                }
              });
            });

            return gameboard;
          }
        }
      }

      return gameboard;
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
