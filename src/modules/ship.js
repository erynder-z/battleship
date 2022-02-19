const shipTypes = [
    {
        id: 'carrier',
        length: 5,
        isHit: false,
        isSunk: false,
    },
    {
        id: 'battleship',
        length: 4,
        isHit: false,
        isSunk: false,
    },
    {
        id: 'cruiser',
        length: 3,
        isHit: false,
        isSunk: false,
    },
    {
        id: 'submarine',
        length: 3,
        isHit: false,
        isSunk: false,
    },
    {
        id: 'destroyer',
        length: 2,
        isHit: false,
        isSunk: false,
    },
];

const shipFactory = (type) => {
    for (let i = 0; i < shipTypes.length; i++) {
        const currentShip = shipTypes[i];
        for (const property in currentShip) {
            if (currentShip[property] === type) {
                return currentShip;
            }
        }
    }
};

module.exports = shipFactory;
