import { shipFactory } from './ship';

const boards = [];

let gameboard;

const gameboardFactory = () => {
  // a two dimensional array
  gameboard = {
    id: undefined,
    myFleet: [],
    placeShip(type, length, coordinates) {
      // get the ship from the factory function and get its position
      const ship = shipFactory(type, length, coordinates);
      const position = ship.coordinates;

      if (position[0] === null) {
        return;
      }

      // define the position to look for
      position.forEach((item) => {
        const vert = item[0];
        const horiz = item[1];

        const field = this[vert].find(({ horizontal }) => horizontal === horiz);

        field.occupied = true;
      });

      this.myFleet.push(ship);
    },
    recieveAttack(position) {
      // recieve coordinates of an attach and mark that field as hit
      const vert = position[0];
      const horiz = position[1];

      const field = this[vert].find(({ horizontal }) => horizontal === horiz);

      if (field.hit === true) {
        console.log('already hit!');
        return null;
      }
      if (field.hit === false) {
        field.hit = true;
      }

      this.myFleet.forEach((object) => {
        object.coordinates.forEach((array) => {
          if (JSON.stringify(array) === JSON.stringify(position)) {
            object.hit(position);
            object.isSunk();
          }
        });
      });

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

export { gameboard, boards, gameboardFactory };
