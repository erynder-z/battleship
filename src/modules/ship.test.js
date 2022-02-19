const shipFactory = require('./ship');

const mockCarrier = {
    id: 'carrier',
    length: 5,
    isHit: false,
    isSunk: false,
};

const mockBattleship = {
    id: 'battleship',
    length: 4,
    isHit: false,
    isSunk: false,
};

const mockCruiser = {
    id: 'cruiser',
    length: 3,
    isHit: false,
    isSunk: false,
};

const mockSubmarine = {
    id: 'submarine',
    length: 3,
    isHit: false,
    isSunk: false,
};

const mockDestroyer = {
    id: 'destroyer',
    length: 2,
    isHit: false,
    isSunk: false,
};

test('create a carrier object', () => {
    expect(shipFactory('carrier')).toMatchObject(mockCarrier);
});

test('create a battleship object', () => {
    expect(shipFactory('battleship')).toMatchObject(mockBattleship);
});

test('create a cruiser object', () => {
    expect(shipFactory('cruiser')).toMatchObject(mockCruiser);
});

test('create a submarine object', () => {
    expect(shipFactory('submarine')).toMatchObject(mockSubmarine);
});

test('create a destroyer object', () => {
    expect(shipFactory('destroyer')).toMatchObject(mockDestroyer);
});
