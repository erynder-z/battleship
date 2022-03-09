import { gameboard } from './gameboard';

const getRandomField = () => {
  let randomHoritontal;
  let randomVertical;
  const randomPosition = [];

  const randomArray = gameboard[Math.floor(Math.random() * 10)];
  const randomObject = randomArray[Math.floor(Math.random() * 10)];
  randomVertical = randomObject.vertical;
  randomHoritontal = randomObject.horizontal;

  randomPosition.push(randomVertical);
  randomPosition.push(randomHoritontal);

  return randomPosition;
};

const getCoordinates = (type, alignment, position, board) => {
  const illegal = board.illegalPositions;
  const validCoordinates = [];
  const fleet = [
    {
      type: 'carrier',
      length: 5,
    },
    {
      type: 'battleship',
      length: 4,
    },
    {
      type: 'cruiser',
      length: 3,
    },
    {
      type: 'submarine',
      length: 2,
    },
    {
      type: 'destroyer',
      length: 2,
    },
  ];

  const illegalPositions = [
    {
      type: 'carrier',
      orientation: 'horizontal',
      positions: [
        [0, 6],
        [0, 7],
        [0, 8],
        [0, 9],
        [1, 6],
        [1, 7],
        [1, 8],
        [1, 9],
        [2, 6],
        [2, 7],
        [2, 8],
        [2, 9],
        [3, 6],
        [3, 7],
        [3, 8],
        [3, 9],
        [4, 6],
        [4, 7],
        [4, 8],
        [4, 9],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 6],
        [6, 7],
        [6, 8],
        [6, 9],
        [7, 6],
        [7, 7],
        [7, 8],
        [7, 9],
        [8, 6],
        [8, 7],
        [8, 8],
        [8, 9],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'carrier',
      orientation: 'vertical',
      positions: [
        [6, 0],
        [6, 1],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
        [6, 9],
        [7, 0],
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
        [7, 5],
        [7, 6],
        [7, 7],
        [7, 8],
        [7, 9],
        [8, 0],
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [8, 7],
        [8, 8],
        [8, 9],
        [9, 0],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'battleship',
      orientation: 'horizontal',
      positions: [
        [0, 7],
        [0, 8],
        [0, 9],
        [1, 7],
        [1, 8],
        [1, 9],
        [2, 7],
        [2, 8],
        [2, 9],
        [3, 7],
        [3, 8],
        [3, 9],
        [4, 7],
        [4, 8],
        [4, 9],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 7],
        [6, 8],
        [6, 9],
        [7, 7],
        [7, 8],
        [7, 9],
        [8, 7],
        [8, 8],
        [8, 9],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'battleship',
      orientation: 'vertical',
      positions: [
        [7, 0],
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
        [7, 5],
        [7, 6],
        [7, 7],
        [7, 8],
        [7, 9],
        [8, 0],
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [8, 7],
        [8, 8],
        [8, 9],
        [9, 0],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'cruiser',
      orientation: 'horizontal',
      positions: [
        [0, 8],
        [0, 9],
        [1, 8],
        [1, 9],
        [2, 8],
        [2, 9],
        [3, 8],
        [3, 9],
        [4, 8],
        [4, 9],
        [5, 8],
        [5, 9],
        [6, 8],
        [6, 9],
        [7, 8],
        [7, 9],
        [8, 8],
        [8, 9],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'cruiser',
      orientation: 'vertical',
      positions: [
        [8, 0],
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [8, 7],
        [8, 8],
        [8, 9],
        [9, 0],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'submarine',
      orientation: 'horizontal',
      positions: [
        [0, 9],
        [1, 9],
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 9],
      ],
    },
    {
      type: 'submarine',
      orientation: 'vertical',
      positions: [
        [9, 0],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'destroyer',
      orientation: 'horizontal',
      positions: [
        [0, 9],
        [1, 9],
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 9],
      ],
    },
    {
      type: 'destroyer',
      orientation: 'vertical',
      positions: [
        [9, 0],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
        [9, 7],
        [9, 8],
        [9, 9],
      ],
    },
    {
      type: 'occupied',
      positions: [],
    },
  ];

  illegalPositions[10].positions.push(illegal);

  const ship = type;
  const align = alignment; // horizotal or vertical

  const checkPosition = () => {
    const selectedField = position; // [0, 1]

    // check of selected field is inside the game grid
    for (let i = 0; i < illegalPositions.length; i++) {
      if (
        illegalPositions[i].type === ship &&
        illegalPositions[i].orientation === align &&
        JSON.stringify(illegalPositions[i].positions).includes(selectedField)
      ) {
        console.log('illegal');
        return null;
      }
    }
    illegalPositions[10].positions.push(selectedField);
    return selectedField;
  };

  const createPosition = () => {
    let length;

    fleet.forEach((item) => {
      if (item.type === ship) {
        length = item.length;
      }
    });

    const createCoordinates = (() => {
      // return is no valid position is returned from checkPosition
      if (validCoordinates[0] === null) {
        return;
      }
      const pos = [...validCoordinates[0]];
      const additionalCoordinates = [];

      // get the number corresponding to the "horizontal" axis in the gameboard-array
      // repeat "length"-times
      if (alignment === 'horizontal') {
        for (let i = 0; i < length; i++) {
          // add 1 to that number and push new coordinates to additionalCoordinates-array
          const addition = pos[1] + 1;
          const arr = pos.splice(1, 1, addition);
          additionalCoordinates.push([pos[0], arr[0]]);
        }
      } else if (alignment === 'vertical') {
        for (let i = 0; i < length; i++) {
          const addition = pos[0] + 1;
          const arr = pos.splice(0, 1, addition);
          additionalCoordinates.push([arr[0], pos[1]]);
        }
      }
      // remove first item to prevent duplicate coordinates
      additionalCoordinates.shift();

      additionalCoordinates.forEach((item) => {
        validCoordinates.push(item);
      });
    })();
  };

  const checkIllegalPositions = (coordinates) => {
    coordinates.forEach((item) => {
      if (JSON.stringify(board.illegalPositions).includes(item)) {
        coordinates = [null];
      }
    });
    if (coordinates !== null) {
      coordinates.forEach((item) => {
        board.illegalPositions.push(item);
      });
    } else return;

    return coordinates;
  };

  validCoordinates.push(checkPosition());
  createPosition();
  return checkIllegalPositions(validCoordinates);
};

const setupAI = (pAIBoard) => {
  const align = ['vertical', 'horizontal'];
  const random = () => align[Math.floor(Math.random() * align.length)];

  const placeCarrier = () => {
    pAIBoard.placeShip(
      'carrier',
      5,
      getCoordinates('carrier', random(), getRandomField(), pAIBoard)
    );
    if (
      pAIBoard.myFleet.some((element) => element.type === 'carrier') === false
    ) {
      placeCarrier();
    }
  };

  const placeBattleship = () => {
    pAIBoard.placeShip(
      'battleship',
      4,
      getCoordinates('battleship', random(), getRandomField(), pAIBoard)
    );
    if (
      pAIBoard.myFleet.some((element) => element.type === 'battleship') ===
      false
    ) {
      placeBattleship();
    }
  };

  const placeCruiser = () => {
    pAIBoard.placeShip(
      'cruiser',
      3,
      getCoordinates('cruiser', random(), getRandomField(), pAIBoard)
    );
    if (
      pAIBoard.myFleet.some((element) => element.type === 'cruiser') === false
    ) {
      placeCruiser();
    }
  };

  const placeSubmarine = () => {
    pAIBoard.placeShip(
      'submarine',
      2,
      getCoordinates('submarine', random(), getRandomField(), pAIBoard)
    );
    if (
      pAIBoard.myFleet.some((element) => element.type === 'submarine') === false
    ) {
      placeSubmarine();
    }
  };

  const placeDestroyer = () => {
    pAIBoard.placeShip(
      'destroyer',
      2,
      getCoordinates('destroyer', random(), getRandomField(), pAIBoard)
    );
    if (
      pAIBoard.myFleet.some((element) => element.type === 'destroyer') === false
    ) {
      placeDestroyer();
    }
  };

  placeCarrier();
  placeBattleship();
  placeCruiser();
  placeSubmarine();
  placeDestroyer();
};

export { getCoordinates, getRandomField, setupAI };
