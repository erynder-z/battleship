import './style.css';
import { gameboardFactory, myFleet } from './modules/gameboard';
import { getCoordinates } from './modules/helpers';
import { shipFactory } from './modules/ship';

const test = gameboardFactory();

const flotte = myFleet;

const board = document.getElementById('board');
const btn1 = document.getElementById('ship1');
const btn2 = document.getElementById('ship2');

board.addEventListener('click', () => {
  gameboardFactory();
  console.log(test);
});

btn1.addEventListener('click', () => {
  test.placeShip('carrier', 5, getCoordinates('carrier', 'horizontal', [0, 5]));
  console.log(test);
  console.log(flotte);
});

btn2.addEventListener('click', () => {
  test.placeShip(
    'battleship',
    4,
    getCoordinates('battleship', 'vertical', [1, 2])
  );
  console.log(test);
  console.log(flotte);
});

/* test.placeShip('carrier', 5, getCoordinates('carrier', 'horizontal', [0, 5]));

test.placeShip(
  'battleship',
  4,
  getCoordinates('battleship', 'vertical', [1, 2])
);

test.placeShip(
  'battleship',
  4,
  getCoordinates('battleship', 'horizontal', [1, 1])
); */

/* export { myFleet, gameboard }; */
