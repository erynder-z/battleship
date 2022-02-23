const getCoordinates = (id, alignment, position) => {
  const validCoordinates = [];
  const fleet = [
    {
      id: 'carrier',
      length: 5,
    },
    {
      id: 'battleship',
      length: 4,
    },
    {
      id: 'cruiser',
      length: 3,
    },
    {
      id: 'submarine',
      length: 2,
    },
    {
      id: 'destroyer',
      length: 2,
    },
  ];

  const illegalPositions = [
    {
      id: 'carrier',
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
      id: 'carrier',
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
      id: 'battleship',
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
      id: 'battleship',
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
      id: 'cruiser',
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
      id: 'cruiser',
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
      id: 'submarine',
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
      id: 'submarine',
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
      id: 'destroyer',
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
      id: 'destroyer',
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
  ];

  const ship = id;
  const align = alignment; // horizotal or vertical

  const checkPosition = () => {
    const selectedField = position; // [0, 1]

    for (let i = 0; i < illegalPositions.length; i++) {
      if (
        illegalPositions[i].id === ship &&
        illegalPositions[i].orientation === align &&
        JSON.stringify(illegalPositions[i].positions).includes(selectedField)
      ) {
        console.log('illegal');
        return null;
      }
    }
    return selectedField;
  };

  const createPosition = () => {
    let length;

    fleet.forEach((item) => {
      if (item.id === ship) {
        length = item.length;
      }
    });

    const createCoordinates = (() => {
      if (validCoordinates[0] === null) {
        return;
      }
      const pos = [...validCoordinates[0]];
      const additionalCoordinates = [];

      if (alignment === 'horizontal') {
        for (let i = 0; i < length; i++) {
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
      additionalCoordinates.shift();

      additionalCoordinates.forEach((item) => {
        validCoordinates.push(item);
      });
    })();
  };

  // check if ship can be placed on selected field
  // occupied fields = selected field + length
  // occupied fields can not be outside the grid
  // occupied fields can not already be arked as "occupied"

  /*  return validCoordinates; */
  /* [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ] */

  validCoordinates.push(checkPosition());
  createPosition();

  return validCoordinates;
};

module.exports = getCoordinates;
