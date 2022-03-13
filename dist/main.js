/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/modules/game.js");
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interface */ "./src/modules/interface.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");




var renderBoard = function renderBoard(p1Board, pAIBoard, player1, playerAI) {
  var p1board = p1Board;
  var pAIboard = pAIBoard;
  var p1 = player1;
  var pAI = playerAI;
  var p1Grid = document.getElementById('p1Board');
  var pAIGrid = document.getElementById('pAIBoard');

  var createGrids = function createGrids(p1board, pAIboard) {
    p1Grid.innerHTML = '';
    pAIGrid.innerHTML = ''; // create 10 rows

    var _loop = function _loop(i) {
      var row = document.createElement('div');
      row.classList.add('row-p1');
      row.setAttribute('id', "p1-row".concat(i));
      p1Grid.appendChild(row); // fill the rows with one div for each object in the board

      p1board[i].forEach(function (element, j) {
        var field = document.createElement('div');
        field.classList.add('field-p1');
        field.setAttribute('id', "p1-row".concat(i, "-field").concat(j));

        if (element.occupied === true) {
          field.classList.add('p1-ship');
        }

        if (element.hit === true && element.occupied === true) {
          field.classList.add('hit');
          field.innerText = '●';
        }

        if (element.hit === true && element.occupied === false) {
          field.classList.add('miss');
          field.innerText = '✖';
        }

        row.appendChild(field);
      });
    };

    for (var i = 0; i < 10; i++) {
      _loop(i);
    }

    var _loop2 = function _loop2(_i) {
      var row = document.createElement('div');
      row.classList.add('row-pAI');
      row.setAttribute('id', "pAI-row".concat(_i));
      pAIGrid.appendChild(row);

      pAIboard[_i].forEach(function (element, j) {
        var field = document.createElement('div');
        field.classList.add('field-pAI');
        field.setAttribute('id', "pAI-row".concat(_i, "-field").concat(j));

        if (element.occupied === true) {
          field.classList.add('pAI-ship');
        }

        if (element.hit === true && element.occupied === true) {
          field.classList.add('hit');
          field.innerText = '●';
        }

        if (element.hit === true && element.occupied === false) {
          field.classList.add('miss');
          field.innerText = '✖';
        }

        field.addEventListener('click', function () {
          var vert = element.vertical;
          var horiz = element.horizontal; // attack

          p1.attack([vert, horiz]); // select a random ship and from the interface and let it "fire"

          shipFireEffect();
          turn();

          function shipFireEffect() {
            var parentSelector = document.querySelector('.p1-fleet-container');
            var random = Math.floor(1 + Math.random() * parentSelector.childElementCount);
            var child = document.querySelector(".p1-fleet-container>div:nth-child(".concat(random, ")"));

            if (child) {
              child.classList.add('fire');
              setTimeout(function () {
                child.classList.remove('fire');
              }, 100);
            }
          }

          function turn() {
            if (field.classList.contains('miss') === false && field.classList.contains('hit') === false) {
              (0,_game__WEBPACK_IMPORTED_MODULE_0__.gameoverCheck)(pAIBoard);
              (0,_player__WEBPACK_IMPORTED_MODULE_2__.turnAI)(pAI);
              (0,_interface__WEBPACK_IMPORTED_MODULE_1__.reportSunkShip)(p1Board);
              (0,_game__WEBPACK_IMPORTED_MODULE_0__.gameoverCheck)(p1Board);
              renderBoard(p1Board, pAIBoard, p1, pAI);
            }

            if (element.occupied === true) {
              field.classList.add('hit');
            } else {
              field.classList.add('miss');
            }
          }
        });
        row.appendChild(field);
      });
    };

    for (var _i = 0; _i < 10; _i++) {
      _loop2(_i);
    }

    return {
      p1: p1,
      pAI: pAI
    };
  };

  createGrids(p1board, pAIboard);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderBoard);

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runGame": () => (/* binding */ runGame),
/* harmony export */   "gameoverCheck": () => (/* binding */ gameoverCheck)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/modules/helpers.js");
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface */ "./src/modules/interface.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");






var runGame = function runGame() {
  var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_4__.playerFactory)('dave', false);
  var playerAI = (0,_player__WEBPACK_IMPORTED_MODULE_4__.playerFactory)('hal', true);
  var p1Board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.gameboardFactory)();
  var pAIBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.gameboardFactory)();
  p1Board.id = 'Player1';
  pAIBoard.id = 'Player2';
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.boards.push(p1Board);
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.boards.push(pAIBoard);
  _player__WEBPACK_IMPORTED_MODULE_4__.players.push(player1);
  _player__WEBPACK_IMPORTED_MODULE_4__.players.push(playerAI);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.setupAI)(pAIBoard);
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(p1Board, pAIBoard, player1, playerAI);
  (0,_interface__WEBPACK_IMPORTED_MODULE_3__.activatePlacementButtons)(p1Board, pAIBoard, player1, playerAI);
  (0,_interface__WEBPACK_IMPORTED_MODULE_3__.activateResetButton)();
};

var gameoverCheck = function gameoverCheck(board) {
  var allAreTrue = function allAreTrue(board) {
    return board.myFleet.every(function (ship) {
      return ship.isSunk() === true;
    });
  };

  if (allAreTrue(board) === true) {
    console.log("".concat(board.id, " was defeated"));
    (0,_interface__WEBPACK_IMPORTED_MODULE_3__.gameOver)(board.id);
  }
};



/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard),
/* harmony export */   "boards": () => (/* binding */ boards),
/* harmony export */   "gameboardFactory": () => (/* binding */ gameboardFactory)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

var boards = [];
var gameboard;

var gameboardFactory = function gameboardFactory() {
  // a two dimensional array
  gameboard = {
    id: undefined,
    myFleet: [],
    placeShip: function placeShip(type, length, coordinates) {
      var _this = this;

      // get the ship from the factory function and get its position
      var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(type, length, coordinates);
      var position = ship.coordinates;

      if (position[0] === null) {
        return;
      } // define the position to look for


      position.forEach(function (item) {
        var vert = item[0];
        var horiz = item[1];

        var field = _this[vert].find(function (_ref) {
          var horizontal = _ref.horizontal;
          return horizontal === horiz;
        });

        field.occupied = true;
      });
      this.myFleet.push(ship);
    },
    recieveAttack: function recieveAttack(position) {
      // recieve coordinates of an attach and mark that field as hit
      var vert = position[0];
      var horiz = position[1];
      var field = this[vert].find(function (_ref2) {
        var horizontal = _ref2.horizontal;
        return horizontal === horiz;
      });

      if (field.hit === true) {
        console.log('already hit!');
        return null;
      }

      if (field.hit === false) {
        field.hit = true;
      }

      this.myFleet.forEach(function (object) {
        object.coordinates.forEach(function (array) {
          if (JSON.stringify(array) === JSON.stringify(position)) {
            object.hit(position);
            object.isSunk();
          }
        });
      });
      return gameboard;
    },
    illegalPositions: []
  };
  var cols = 10;
  var rows = 10;

  for (var i = 0; i < cols; i++) {
    gameboard[i] = [];

    for (var j = 0; j < rows; j++) {
      gameboard[i].push({
        vertical: i,
        horizontal: j,
        occupied: false,
        hit: false
      });
    }
  }

  return gameboard;
};



/***/ }),

/***/ "./src/modules/helpers.js":
/*!********************************!*\
  !*** ./src/modules/helpers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCoordinates": () => (/* binding */ getCoordinates),
/* harmony export */   "getRandomField": () => (/* binding */ getRandomField),
/* harmony export */   "setupAI": () => (/* binding */ setupAI)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var getRandomField = function getRandomField() {
  // get a random field on the gameboard
  var randomHoritontal;
  var randomVertical;
  var randomPosition = [];
  var randomArray = _gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard[Math.floor(Math.random() * 10)];
  var randomObject = randomArray[Math.floor(Math.random() * 10)];
  randomVertical = randomObject.vertical;
  randomHoritontal = randomObject.horizontal;
  randomPosition.push(randomVertical);
  randomPosition.push(randomHoritontal);
  return randomPosition;
};

var getCoordinates = function getCoordinates(type, alignment, position, board) {
  // returns valid coordinates of all fields needed for the proposed ship placement
  var illegal = board.illegalPositions;
  var validCoordinates = [];
  var fleet = [{
    type: 'carrier',
    length: 5
  }, {
    type: 'battleship',
    length: 4
  }, {
    type: 'cruiser',
    length: 3
  }, {
    type: 'submarine',
    length: 3
  }, {
    type: 'destroyer',
    length: 2
  }];
  var illegalPositions = [// blacklist of positions where a ship can never ne placed
  {
    type: 'carrier',
    orientation: 'horizontal',
    positions: [[0, 6], [0, 7], [0, 8], [0, 9], [1, 6], [1, 7], [1, 8], [1, 9], [2, 6], [2, 7], [2, 8], [2, 9], [3, 6], [3, 7], [3, 8], [3, 9], [4, 6], [4, 7], [4, 8], [4, 9], [5, 6], [5, 7], [5, 8], [5, 9], [6, 6], [6, 7], [6, 8], [6, 9], [7, 6], [7, 7], [7, 8], [7, 9], [8, 6], [8, 7], [8, 8], [8, 9], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    type: 'carrier',
    orientation: 'vertical',
    positions: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    type: 'battleship',
    orientation: 'horizontal',
    positions: [[0, 7], [0, 8], [0, 9], [1, 7], [1, 8], [1, 9], [2, 7], [2, 8], [2, 9], [3, 7], [3, 8], [3, 9], [4, 7], [4, 8], [4, 9], [5, 7], [5, 8], [5, 9], [6, 7], [6, 8], [6, 9], [7, 7], [7, 8], [7, 9], [8, 7], [8, 8], [8, 9], [9, 7], [9, 8], [9, 9]]
  }, {
    type: 'battleship',
    orientation: 'vertical',
    positions: [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    type: 'cruiser',
    orientation: 'horizontal',
    positions: [[0, 8], [0, 9], [1, 8], [1, 9], [2, 8], [2, 9], [3, 8], [3, 9], [4, 8], [4, 9], [5, 8], [5, 9], [6, 8], [6, 9], [7, 8], [7, 9], [8, 8], [8, 9], [9, 8], [9, 9]]
  }, {
    type: 'cruiser',
    orientation: 'vertical',
    positions: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    type: 'submarine',
    orientation: 'horizontal',
    positions: [[0, 8], [0, 9], [1, 8], [1, 9], [2, 8], [2, 9], [3, 8], [3, 9], [4, 8], [4, 9], [5, 8], [5, 9], [6, 8], [6, 9], [7, 8], [7, 9], [8, 8], [8, 9], [9, 8], [9, 9]]
  }, {
    type: 'submarine',
    orientation: 'vertical',
    positions: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    type: 'destroyer',
    orientation: 'horizontal',
    positions: [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]]
  }, {
    type: 'destroyer',
    orientation: 'vertical',
    positions: [[9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    type: 'occupied',
    positions: []
  }];
  illegalPositions[10].positions.push(illegal);
  var ship = type;
  var align = alignment;

  var checkPosition = function checkPosition() {
    // check if selected field is inside the game grid
    var selectedField = position; // reject field if it is blacklisted

    for (var i = 0; i < illegalPositions.length; i++) {
      if (illegalPositions[i].type === ship && illegalPositions[i].orientation === align && JSON.stringify(illegalPositions[i].positions).includes(selectedField)) {
        console.log('illegal');
        return null;
      }
    }

    illegalPositions[10].positions.push(selectedField);
    return selectedField;
  };

  var createPosition = function createPosition() {
    var length;
    fleet.forEach(function (item) {
      if (item.type === ship) {
        length = item.length;
      }
    });

    var createCoordinates = function () {
      // creates the coordinates of all needed fields for selected ship on selected field
      // return is no valid position is returned from checkPosition
      if (validCoordinates[0] === null) {
        return;
      }

      var pos = _toConsumableArray(validCoordinates[0]);

      var additionalCoordinates = []; // get the number corresponding to the "horizontal" axis in the gameboard-array
      // repeat "length"-times

      if (alignment === 'horizontal') {
        for (var i = 0; i < length; i++) {
          // add 1 to that number and push new coordinates to additionalCoordinates-array
          var addition = pos[1] + 1;
          var arr = pos.splice(1, 1, addition);
          additionalCoordinates.push([pos[0], arr[0]]);
        }
      } else if (alignment === 'vertical') {
        for (var _i = 0; _i < length; _i++) {
          var _addition = pos[0] + 1;

          var _arr = pos.splice(0, 1, _addition);

          additionalCoordinates.push([_arr[0], pos[1]]);
        }
      } // remove first item to prevent duplicate coordinates


      additionalCoordinates.shift();
      additionalCoordinates.forEach(function (item) {
        validCoordinates.push(item);
      });
    }();
  };

  var checkIllegalPositions = function checkIllegalPositions(coordinates) {
    // check if any of the needed fields is inside the blacklist
    coordinates.forEach(function (item) {
      if (JSON.stringify(board.illegalPositions).includes(item)) {
        coordinates = [null];
      }
    }); // add all needed fields to blacklist

    if (coordinates !== null) {
      coordinates.forEach(function (item) {
        board.illegalPositions.push(item);
      });
    } else return;

    return coordinates;
  };

  validCoordinates.push(checkPosition());
  createPosition(); // return the if they passed all checks

  return checkIllegalPositions(validCoordinates);
};

var setupAI = function setupAI(pAIBoard) {
  var align = ['vertical', 'horizontal'];

  var random = function random() {
    return align[Math.floor(Math.random() * align.length)];
  };

  var placeCarrier = function placeCarrier() {
    pAIBoard.placeShip('carrier', 5, getCoordinates('carrier', random(), getRandomField(), pAIBoard));

    if (pAIBoard.myFleet.some(function (element) {
      return element.type === 'carrier';
    }) === false) {
      placeCarrier();
    }
  };

  var placeBattleship = function placeBattleship() {
    pAIBoard.placeShip('battleship', 4, getCoordinates('battleship', random(), getRandomField(), pAIBoard));

    if (pAIBoard.myFleet.some(function (element) {
      return element.type === 'battleship';
    }) === false) {
      placeBattleship();
    }
  };

  var placeCruiser = function placeCruiser() {
    pAIBoard.placeShip('cruiser', 3, getCoordinates('cruiser', random(), getRandomField(), pAIBoard));

    if (pAIBoard.myFleet.some(function (element) {
      return element.type === 'cruiser';
    }) === false) {
      placeCruiser();
    }
  };

  var placeSubmarine = function placeSubmarine() {
    pAIBoard.placeShip('submarine', 3, getCoordinates('submarine', random(), getRandomField(), pAIBoard));

    if (pAIBoard.myFleet.some(function (element) {
      return element.type === 'submarine';
    }) === false) {
      placeSubmarine();
    }
  };

  var placeDestroyer = function placeDestroyer() {
    pAIBoard.placeShip('destroyer', 2, getCoordinates('destroyer', random(), getRandomField(), pAIBoard));

    if (pAIBoard.myFleet.some(function (element) {
      return element.type === 'destroyer';
    }) === false) {
      placeDestroyer();
    }
  };

  placeCarrier();
  placeBattleship();
  placeCruiser();
  placeSubmarine();
  placeDestroyer();
};



/***/ }),

/***/ "./src/modules/interface.js":
/*!**********************************!*\
  !*** ./src/modules/interface.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activatePlacementButtons": () => (/* binding */ activatePlacementButtons),
/* harmony export */   "activateResetButton": () => (/* binding */ activateResetButton),
/* harmony export */   "reportSunkShip": () => (/* binding */ reportSunkShip),
/* harmony export */   "gameOver": () => (/* binding */ gameOver)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/modules/helpers.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var activatePlacementButtons = function activatePlacementButtons(p1Board, pAIBoard, player1, playerAI) {
  var boardContainer = document.querySelector('.board-container');
  var p1info = document.getElementById('p1info');
  var fleetHeading = document.querySelector('.fleet-heading');
  var pAIContainer = document.querySelector('.pAI-container');
  var infoContainer = document.getElementById('infoContainer');
  var alignmentBtn = document.getElementById('alignment');
  var p1Fleet = document.querySelector('.p1-fleet-wrapper');
  var carrierBtn = document.getElementById('carrierButton');
  var battleshipBtn = document.getElementById('battleshipButton');
  var cruiserBtn = document.getElementById('cruiserButton');
  var submarineBtn = document.getElementById('submarineButton');
  var destroyerBtn = document.getElementById('destroyerButton');
  infoContainer.addEventListener('click', function () {
    if (alignmentBtn.innerText === 'horizontal') {
      alignmentBtn.innerText = 'vertical';
      infoContainer.classList.toggle('vert');
    } else if (alignmentBtn.innerText === 'vertical') {
      alignmentBtn.innerText = 'horizontal';
      infoContainer.classList.toggle('vert');
    }
  });
  carrierBtn.addEventListener('click', function () {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(p1Board, pAIBoard);
    placePlayerShips(carrierBtn.parentNode.id.toLowerCase(), 5, carrierBtn);
  });
  battleshipBtn.addEventListener('click', function () {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(p1Board, pAIBoard);
    placePlayerShips(battleshipBtn.parentNode.id.toLowerCase(), 4, battleshipBtn);
  });
  cruiserBtn.addEventListener('click', function () {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(p1Board, pAIBoard);
    placePlayerShips(cruiserBtn.parentNode.id.toLowerCase(), 3, cruiserBtn);
  });
  submarineBtn.addEventListener('click', function () {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(p1Board, pAIBoard);
    placePlayerShips(submarineBtn.parentNode.id.toLowerCase(), 3, submarineBtn);
  });
  destroyerBtn.addEventListener('click', function () {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(p1Board, pAIBoard);
    placePlayerShips(destroyerBtn.parentNode.id.toLowerCase(), 2, destroyerBtn);
  });

  var placePlayerShips = function placePlayerShips(shipname, length, btn) {
    p1info.innerText = "Place your ".concat(shipname);
    p1info.classList.add('selected');
    var fields = document.querySelectorAll('.field-p1');
    fields.forEach(function (field) {
      var vert = parseInt(field.id[6]);
      var horiz = parseInt(field.id[field.id.length - 1]);
      var pos = [vert, horiz];
      field.addEventListener('click', function () {
        var align = document.getElementById('alignment').textContent;
        p1Board.placeShip(shipname, length, (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getCoordinates)(shipname, align, pos, p1Board));

        if (p1Board.myFleet.some(function (element) {
          return element.type === shipname;
        })) {
          p1info.innerText = 'Deploy the rest of your fleet!';
          btn.classList.add('hidden');
          var element = document.getElementById("".concat(shipname));
          element.classList.add('placed');
          p1info.classList.remove('selected');
        } else {
          alert('unable to place here. try again!');
          return;
        }

        if (p1Board.myFleet.length === 5) {
          p1info.innerText = 'Your fleet';
          infoContainer.classList.add('hidden');
          pAIContainer.classList.remove('hidden');
          p1Fleet.classList.add('fleet-set');
          boardContainer.classList.add('board-set');
          fleetHeading.classList.add('hidden');
        }

        (0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(p1Board, pAIBoard, player1, playerAI);
      });
      field.addEventListener('mouseover', function () {
        hoverEffect(pos);
      });
      field.addEventListener('mouseout', function () {
        hoverEffect(pos);
      });

      function hoverEffect(pos) {
        // get all fields covered by currently selected ship in real time
        var align = document.getElementById('alignment').innerText;

        var position = _toConsumableArray(pos);

        var claimed = [];

        if (align === 'horizontal') {
          for (var i = 0; i < length; i++) {
            var addition = position[1] + 1;
            var arr = position.splice(1, 1, addition);
            claimed.push([position[0], arr[0]]);
          }
        } else if (align === 'vertical') {
          for (var _i = 0; _i < length; _i++) {
            var _addition = position[0] + 1;

            var _arr = position.splice(0, 1, _addition);

            claimed.push([_arr[0], position[1]]);
          }
        }

        claimed.length = length;
        claimed.forEach(function (item) {
          var vertical = item[0];
          var horizontal = item[1];
          var board = document.querySelector('.grid-p1');
          var row = board.querySelector("#p1-row".concat(vertical));

          if (vertical <= 9 && horizontal <= 9) {
            var element = row.querySelector("#p1-row".concat(vertical, "-field").concat(horizontal));
            element.classList.toggle('hover');
          }
        });
      }
    });
  };
};

var activateResetButton = function activateResetButton() {
  var resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', function () {
    location.reload();
  });
};

var reportSunkShip = function reportSunkShip(board) {
  board.myFleet.forEach(function (ship) {
    if (ship.isSunk() === true) {
      document.getElementById(ship.type).classList.add('sunk'); // get the closest .fleet-element to prefent it from being transformed when ship is sunk

      var closestElement = document.getElementById(ship.type).closest('.fleet');
      closestElement.style.transform = 'none';
    }
  });
};

var gameOver = function gameOver(loserID) {
  if (loserID === 'Player1') {
    loserID = 'You were';
  }

  if (loserID === 'Player2') {
    loserID = 'AI was';
  }

  var modalBody = document.querySelector('.modal-body');
  var overlay = document.getElementById('overlay');

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
  }

  openModal(modal);
  modalBody.textContent = "".concat(loserID, " defeated. \n  There are no winners in war! ");
  var resetBtn = document.getElementById('resetBtnModal');
  resetBtn.addEventListener('click', function () {
    location.reload();
  });
};



/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerFactory": () => (/* binding */ playerFactory),
/* harmony export */   "players": () => (/* binding */ players),
/* harmony export */   "turnAI": () => (/* binding */ turnAI)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");

var players = [];

var playerFactory = function playerFactory(name, isAI) {
  if (isAI === true) {
    return {
      id: 'Player2',
      name: name,
      isAI: isAI,
      isActive: false,
      getRandomPosition: function getRandomPosition() {
        var _this = this;

        var randomHoritontal;
        var randomVertical;
        var randomPosition = [];
        _gameboard__WEBPACK_IMPORTED_MODULE_0__.boards.forEach(function (board) {
          if (_this.id !== board.id) {
            var randomArray = board[Math.floor(Math.random() * 10)];
            var randomObject = randomArray[Math.floor(Math.random() * 10)];
            randomVertical = randomObject.vertical;
            randomHoritontal = randomObject.horizontal;
          }
        });
        randomPosition.push(randomVertical);
        randomPosition.push(randomHoritontal);
        return randomPosition;
      },
      validatePosition: function validatePosition(position) {
        var _this2 = this;

        var checked = position;
        var vert = position[0];
        var horiz = position[1]; // check if posittion  was alredy hit

        _gameboard__WEBPACK_IMPORTED_MODULE_0__.boards.forEach(function (board) {
          if (_this2.id !== board.id) {
            var field = board[vert].find(function (_ref) {
              var horizontal = _ref.horizontal;
              return horizontal === horiz;
            });

            if (field.hit === false) {
              _this2.attack(checked);

              return;
            }

            if (field.hit === true) {
              _this2.validatePosition(_this2.getRandomPosition());
            }
          }
        });
      },
      attack: function attack(position) {
        var _this3 = this;

        _gameboard__WEBPACK_IMPORTED_MODULE_0__.boards.forEach(function (board) {
          if (_this3.id !== board.id) {
            board.recieveAttack(position);
          }
        }); // switch active player

        players.forEach(function (item) {
          if (_this3.id === item.id) {
            item.isActive = false;
          } else if (_this3.id !== item.id) {
            item.isActive = true;
          }
        });
      }
    };
  }

  return {
    id: 'Player1',
    name: name,
    isActive: true,
    attack: function attack(position) {
      var _this4 = this;

      _gameboard__WEBPACK_IMPORTED_MODULE_0__.boards.forEach(function (board) {
        if (_this4.id !== board.id) {
          board.recieveAttack(position);
        }
      }); // switch active player

      players.forEach(function (item) {
        if (_this4.id === item.id) {
          item.isActive = false;
        } else if (_this4.id !== item.id) {
          item.isActive = true;
        }
      });
    }
  };
};

var turnAI = function turnAI(pAI) {
  var attack = pAI.validatePosition(pAI.getRandomPosition());
  return pAI;
};



/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });
var shipFactory = function shipFactory(type, length, coordinates) {
  return {
    type: type,
    length: length,
    coordinates: coordinates,
    hitbox: [],
    hit: function hit(position) {
      if (JSON.stringify(this.coordinates).includes(position)) {
        this.hitbox.push(position);
      }
    },
    isSunk: function isSunk() {
      return !!(this.hitbox.length >= 0 && this.hitbox.length >= this.coordinates.length);
    }
  };
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;QACQ,MAAM;EACZ,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;SACS,MAAM;EACb,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* reset styles */\n* {\n  color: inherit;\n  margin: 0;\n}\n\nbody {\n  font-family: Poppins;\n}\n\na {\n  text-decoration: none;\n}\n\nimg {\n  max-width: 100%;\n}\n\n.row {\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.align-center {\n  align-items: center;\n}\n\n@media (min-width: 0) {\n\n  .col-12-xs {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 100%;\n  }\n}\n@media (min-width: 480px) {\n\n  .col-5-sm {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 41.6666666667%;\n  }\n}\n@media (min-width: 1200px) {\n\n  .col-2-xl {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 16.6666666667%;\n  }\n}\n.text-primary {\n  color: #07689f;\n}\n\n.text-white {\n  color: white;\n}\n\n.card {\n  display: block;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);\n}\n.card .card-title {\n  display: flex;\n  align-items: center;\n  font-size: 1.5rem;\n  padding-bottom: 0.75rem;\n  font-weight: bold;\n  border-radius: 0px;\n}\n\n.btn-primary {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #07689f;\n}\n.btn-primary:hover {\n  background-color: #0878b7;\n}\n\n.btn-error {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #b8405e;\n}\n.btn-error:hover {\n  background-color: #c2506c;\n}\n\n.p-1 {\n  padding: 0.75rem;\n}\n\n.p-2 {\n  padding: 1.5rem;\n}\n\n.m-1 {\n  margin: 0.75rem;\n}\n\n.m-2 {\n  margin: 1.5rem;\n}\n\n.mt-2 {\n  margin-top: 1.5rem;\n}\n\n.mb-2 {\n  margin-bottom: 1.5rem;\n}\n\n.fd-c {\n  flex-direction: column;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"AACA,iBAAiB;AAEjB;EACE,cAAc;EACd,SAAS;AACX;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;;EAEE;IACE,sBAAsB;IACtB,YAAY;IACZ,WAAW;EACb;AACF;AACA;;EAEE;IACE,sBAAsB;IACtB,YAAY;IACZ,qBAAqB;EACvB;AACF;AACA;;EAEE;IACE,sBAAsB;IACtB,YAAY;IACZ,qBAAqB;EACvB;AACF;AACA;EACE,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,sBAAsB;EACtB,0CAA0C;AAC5C;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,qBAAqB;EACrB,SAAS;EACT,uBAAuB;EACvB,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,qBAAqB;EACrB,SAAS;EACT,uBAAuB;EACvB,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;;;EAGE,sBAAsB;AACxB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap\");\n/* reset styles */\n@import url(\"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap\");\n* {\n  color: inherit;\n  margin: 0;\n}\n\nbody {\n  font-family: Poppins;\n}\n\na {\n  text-decoration: none;\n}\n\nimg {\n  max-width: 100%;\n}\n\n.row {\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.align-center {\n  align-items: center;\n}\n\n@media (min-width: 0) {\n\n  .col-12-xs {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 100%;\n  }\n}\n@media (min-width: 480px) {\n\n  .col-5-sm {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 41.6666666667%;\n  }\n}\n@media (min-width: 1200px) {\n\n  .col-2-xl {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 16.6666666667%;\n  }\n}\n.text-primary {\n  color: #07689f;\n}\n\n.text-white {\n  color: white;\n}\n\n.card {\n  display: block;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);\n}\n.card .card-title {\n  display: flex;\n  align-items: center;\n  font-size: 1.5rem;\n  padding-bottom: 0.75rem;\n  font-weight: bold;\n  border-radius: 0px;\n}\n\n.btn-primary {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #07689f;\n}\n.btn-primary:hover {\n  background-color: #0878b7;\n}\n\n.btn-error {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #b8405e;\n}\n.btn-error:hover {\n  background-color: #c2506c;\n}\n\n.p-1 {\n  padding: 0.75rem;\n}\n\n.p-2 {\n  padding: 1.5rem;\n}\n\n.m-1 {\n  margin: 0.75rem;\n}\n\n.m-2 {\n  margin: 1.5rem;\n}\n\n.mt-2 {\n  margin-top: 1.5rem;\n}\n\n.mb-2 {\n  margin-bottom: 1.5rem;\n}\n\n.fd-c {\n  flex-direction: column;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --background: #f4f9f9;\n  --playerBoard: #bad7df;\n  --AIboard: #ffe2e2;\n  --fleet: #07679f5e;\n  --sunk: #d82148;\n  --hit: #12cc94;\n  --miss: #e23e57;\n  --hover: #c40885d7;\n  --ship: #07689f;\n  --align: #07689f;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n  background-color: var(--background);\n  font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',\n    'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\nimg {\n  max-width: auto;\n  height: 5rem;\n}\n\n.heading {\n  transition: all 150ms ease-in;\n}\n\n.info-container {\n  display: flex;\n}\n\n.board-container {\n  max-width: 100vw;\n}\n\n.reset {\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.game-grid {\n  width: 50vw;\n  height: 50vh;\n  margin: 0 auto;\n}\n\n.grid-p1,\n.grid-pAI {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid-p1:hover,\n.grid-pAI:hover {\n  cursor: crosshair;\n}\n\n.row-p1,\n.row-pAI {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.field-p1,\n.field-pAI {\n  border: dashed 1px black;\n  height: 100%;\n  width: 100%;\n}\n.field-p1 {\n  background-color: var(--playerBoard);\n}\n\n.field-pAI {\n  background-color: var(--AIboard);\n}\n\n.field-p1:hover,\n.field-pAI:hover {\n  filter: brightness(125%);\n}\n\n.p1-ship {\n  background-color: var(--ship);\n}\n\n.placed {\n  background-color: var(--fleet);\n  transition: all 200ms linear;\n  animation: pulse 5s linear infinite;\n}\n\n.sunk {\n  background-color: var(--sunk);\n  transition: all 1000ms linear;\n}\n\n.miss {\n  background-color: var(--miss);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit {\n  background-color: var(--hit);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.info-container {\n  height: 15vh;\n  width: 15vh;\n  margin-left: auto;\n  margin-right: auto;\n  border: solid 1px black;\n  transition: all 150ms ease-in-out;\n}\n\n.alignment-icon-horiz {\n  height: 1rem;\n  width: 100%;\n  background-color: var(--align);\n}\n\n.vert {\n  transition: all 150ms ease-in-out;\n  transform: rotate(90deg);\n}\n\n.hover {\n  background-color: var(--hover);\n}\n\n.fire {\n  transition: all 75ms ease-in-out;\n  transform: scale(125%);\n}\n\n.selected {\n  transform: scale(1.5);\n  transition: all 150ms linear;\n}\n\n.hidden {\n  display: none;\n}\n\n/* .modal-wrapper {\n  padding: 25px 0 0 25px;\n}\n */\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  border: solid 2px black;\n  z-index: 10;\n  background-color: var(--background);\n  width: 500px;\n  max-width: 80%;\n}\n\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal-header {\n  display: flex;\n  padding: 10px 15px;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--fleet);\n}\n\n.modal-header .title {\n  font-size: 1.25rem;\n  font-weight: bold;\n}\n.modal-body {\n  padding: 10px 15px;\n  display: flex;\n  flex-direction: column;\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.692);\n  pointer-events: none;\n  transition: 200ms ease-in-out;\n}\n\n#overlay.active {\n  opacity: 1;\n  pointer-events: all;\n}\n\n@-webkit-keyframes \"pulse\" {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n  50% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    transform: rotate(2deg);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n}\n\n@media only screen and (min-width: 1024px) {\n  .board-set {\n    position: absolute;\n    top: 50%;\n    left: 40%;\n    transform: translate(-50%, -50%);\n    /* transition: all 50ms linear; */\n  }\n  .fleet-set {\n    position: absolute;\n    top: 0rem;\n    right: -20rem;\n    transition: all 50ms linear;\n  }\n\n  .fleet-set > .p1-fleet-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fleet-set > .p1-fleet-container > .fleet {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .heading {\n    font-size: medium;\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\n  --background: #f4f9f9;\n  --playerBoard: #bad7df;\n  --AIboard: #ffe2e2;\n  --fleet: #07679f5e;\n  --sunk: #d82148;\n  --hit: #12cc94;\n  --miss: #e23e57;\n  --hover: #c40885d7;\n  --ship: #07689f;\n  --align: #07689f;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n  background-color: var(--background);\n  font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',\n    'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\nimg {\n  max-width: auto;\n  height: 5rem;\n}\n\n.heading {\n  transition: all 150ms ease-in;\n}\n\n.info-container {\n  display: flex;\n}\n\n.board-container {\n  max-width: 100vw;\n}\n\n.reset {\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.game-grid {\n  width: 50vw;\n  height: 50vh;\n  margin: 0 auto;\n}\n\n.grid-p1,\n.grid-pAI {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid-p1:hover,\n.grid-pAI:hover {\n  cursor: crosshair;\n}\n\n.row-p1,\n.row-pAI {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.field-p1,\n.field-pAI {\n  border: dashed 1px black;\n  height: 100%;\n  width: 100%;\n}\n.field-p1 {\n  background-color: var(--playerBoard);\n}\n\n.field-pAI {\n  background-color: var(--AIboard);\n}\n\n.field-p1:hover,\n.field-pAI:hover {\n  filter: brightness(125%);\n}\n\n.p1-ship {\n  background-color: var(--ship);\n}\n\n.placed {\n  background-color: var(--fleet);\n  transition: all 200ms linear;\n  animation: pulse 5s linear infinite;\n}\n\n.sunk {\n  background-color: var(--sunk);\n  transition: all 1000ms linear;\n}\n\n.miss {\n  background-color: var(--miss);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit {\n  background-color: var(--hit);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.info-container {\n  height: 15vh;\n  width: 15vh;\n  margin-left: auto;\n  margin-right: auto;\n  border: solid 1px black;\n  transition: all 150ms ease-in-out;\n}\n\n.alignment-icon-horiz {\n  height: 1rem;\n  width: 100%;\n  background-color: var(--align);\n}\n\n.vert {\n  transition: all 150ms ease-in-out;\n  transform: rotate(90deg);\n}\n\n.hover {\n  background-color: var(--hover);\n}\n\n.fire {\n  transition: all 75ms ease-in-out;\n  transform: scale(125%);\n}\n\n.selected {\n  transform: scale(1.5);\n  transition: all 150ms linear;\n}\n\n.hidden {\n  display: none;\n}\n\n/* .modal-wrapper {\n  padding: 25px 0 0 25px;\n}\n */\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  border: solid 2px black;\n  z-index: 10;\n  background-color: var(--background);\n  width: 500px;\n  max-width: 80%;\n}\n\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal-header {\n  display: flex;\n  padding: 10px 15px;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--fleet);\n}\n\n.modal-header .title {\n  font-size: 1.25rem;\n  font-weight: bold;\n}\n.modal-body {\n  padding: 10px 15px;\n  display: flex;\n  flex-direction: column;\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.692);\n  pointer-events: none;\n  transition: 200ms ease-in-out;\n}\n\n#overlay.active {\n  opacity: 1;\n  pointer-events: all;\n}\n\n@-webkit-keyframes \"pulse\" {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n  50% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    transform: rotate(2deg);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n}\n\n@media only screen and (min-width: 1024px) {\n  .board-set {\n    position: absolute;\n    top: 50%;\n    left: 40%;\n    transform: translate(-50%, -50%);\n    /* transition: all 50ms linear; */\n  }\n  .fleet-set {\n    position: absolute;\n    top: 0rem;\n    right: -20rem;\n    transition: all 50ms linear;\n  }\n\n  .fleet-set > .p1-fleet-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fleet-set > .p1-fleet-container > .fleet {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .heading {\n    font-size: medium;\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");




(0,_modules_game__WEBPACK_IMPORTED_MODULE_3__.runGame)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTyxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLE1BQU0sVUFBVSxZQUFZLE9BQU8sTUFBTSxZQUFZLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sT0FBTyxLQUFLLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLGdDQUFnQywwQkFBMEIsMkJBQTJC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QUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBRUFoQixzREFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9oZWxwZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcz8zNDJmIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz82MzQ5Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcz9mZjk0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lb3ZlckNoZWNrIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IHJlcG9ydFN1bmtTaGlwIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgdHVybkFJIH0gZnJvbSAnLi9wbGF5ZXInO1xuXG5jb25zdCByZW5kZXJCb2FyZCA9IChwMUJvYXJkLCBwQUlCb2FyZCwgcGxheWVyMSwgcGxheWVyQUkpID0+IHtcbiAgY29uc3QgcDFib2FyZCA9IHAxQm9hcmQ7XG4gIGNvbnN0IHBBSWJvYXJkID0gcEFJQm9hcmQ7XG4gIGNvbnN0IHAxID0gcGxheWVyMTtcbiAgY29uc3QgcEFJID0gcGxheWVyQUk7XG4gIGNvbnN0IHAxR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMUJvYXJkJyk7XG4gIGNvbnN0IHBBSUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncEFJQm9hcmQnKTtcblxuICBjb25zdCBjcmVhdGVHcmlkcyA9IChwMWJvYXJkLCBwQUlib2FyZCkgPT4ge1xuICAgIHAxR3JpZC5pbm5lckhUTUwgPSAnJztcbiAgICBwQUlHcmlkLmlubmVySFRNTCA9ICcnO1xuICAgIC8vIGNyZWF0ZSAxMCByb3dzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3ctcDEnKTtcbiAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoJ2lkJywgYHAxLXJvdyR7aX1gKTtcbiAgICAgIHAxR3JpZC5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgLy8gZmlsbCB0aGUgcm93cyB3aXRoIG9uZSBkaXYgZm9yIGVhY2ggb2JqZWN0IGluIHRoZSBib2FyZFxuICAgICAgcDFib2FyZFtpXS5mb3JFYWNoKChlbGVtZW50LCBqKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2ZpZWxkLXAxJyk7XG4gICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcDEtcm93JHtpfS1maWVsZCR7an1gKTtcbiAgICAgICAgaWYgKGVsZW1lbnQub2NjdXBpZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdwMS1zaGlwJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQuaGl0ID09PSB0cnVlICYmIGVsZW1lbnQub2NjdXBpZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICBmaWVsZC5pbm5lclRleHQgPSAn4pePJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5oaXQgPT09IHRydWUgJiYgZWxlbWVudC5vY2N1cGllZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICAgICAgZmllbGQuaW5uZXJUZXh0ID0gJ+Kclic7XG4gICAgICAgIH1cbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGZpZWxkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3Jvdy1wQUknKTtcbiAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoJ2lkJywgYHBBSS1yb3cke2l9YCk7XG4gICAgICBwQUlHcmlkLmFwcGVuZENoaWxkKHJvdyk7XG5cbiAgICAgIHBBSWJvYXJkW2ldLmZvckVhY2goKGVsZW1lbnQsIGopID0+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZmllbGQtcEFJJyk7XG4gICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcEFJLXJvdyR7aX0tZmllbGQke2p9YCk7XG4gICAgICAgIGlmIChlbGVtZW50Lm9jY3VwaWVkID09PSB0cnVlKSB7XG4gICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgncEFJLXNoaXAnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5oaXQgPT09IHRydWUgJiYgZWxlbWVudC5vY2N1cGllZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgIGZpZWxkLmlubmVyVGV4dCA9ICfil48nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LmhpdCA9PT0gdHJ1ZSAmJiBlbGVtZW50Lm9jY3VwaWVkID09PSBmYWxzZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICBmaWVsZC5pbm5lclRleHQgPSAn4pyWJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZlcnQgPSBlbGVtZW50LnZlcnRpY2FsO1xuICAgICAgICAgIGNvbnN0IGhvcml6ID0gZWxlbWVudC5ob3Jpem9udGFsO1xuICAgICAgICAgIC8vIGF0dGFja1xuICAgICAgICAgIHAxLmF0dGFjayhbdmVydCwgaG9yaXpdKTtcbiAgICAgICAgICAvLyBzZWxlY3QgYSByYW5kb20gc2hpcCBhbmQgZnJvbSB0aGUgaW50ZXJmYWNlIGFuZCBsZXQgaXQgXCJmaXJlXCJcbiAgICAgICAgICBzaGlwRmlyZUVmZmVjdCgpO1xuICAgICAgICAgIHR1cm4oKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHNoaXBGaXJlRWZmZWN0KCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50U2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAnLnAxLWZsZWV0LWNvbnRhaW5lcidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAxICsgTWF0aC5yYW5kb20oKSAqIHBhcmVudFNlbGVjdG9yLmNoaWxkRWxlbWVudENvdW50XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICBgLnAxLWZsZWV0LWNvbnRhaW5lcj5kaXY6bnRoLWNoaWxkKCR7cmFuZG9tfSlgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZpcmUnKTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZSgnZmlyZScpO1xuICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHR1cm4oKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpID09PSBmYWxzZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGdhbWVvdmVyQ2hlY2socEFJQm9hcmQpO1xuICAgICAgICAgICAgICB0dXJuQUkocEFJKTtcbiAgICAgICAgICAgICAgcmVwb3J0U3Vua1NoaXAocDFCb2FyZCk7XG4gICAgICAgICAgICAgIGdhbWVvdmVyQ2hlY2socDFCb2FyZCk7XG4gICAgICAgICAgICAgIHJlbmRlckJvYXJkKHAxQm9hcmQsIHBBSUJvYXJkLCBwMSwgcEFJKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQub2NjdXBpZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGZpZWxkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IHAxLCBwQUkgfTtcbiAgfTtcblxuICBjcmVhdGVHcmlkcyhwMWJvYXJkLCBwQUlib2FyZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJCb2FyZDtcbiIsImltcG9ydCByZW5kZXJCb2FyZCBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBib2FyZHMsIGdhbWVib2FyZEZhY3RvcnkgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBzZXR1cEFJIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7XG4gIGFjdGl2YXRlUGxhY2VtZW50QnV0dG9ucyxcbiAgYWN0aXZhdGVSZXNldEJ1dHRvbixcbiAgZ2FtZU92ZXIsXG59IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IHBsYXllckZhY3RvcnksIHBsYXllcnMgfSBmcm9tICcuL3BsYXllcic7XG5cbmNvbnN0IHJ1bkdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXJGYWN0b3J5KCdkYXZlJywgZmFsc2UpO1xuICBjb25zdCBwbGF5ZXJBSSA9IHBsYXllckZhY3RvcnkoJ2hhbCcsIHRydWUpO1xuICBjb25zdCBwMUJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuICBjb25zdCBwQUlCb2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoKTtcbiAgcDFCb2FyZC5pZCA9ICdQbGF5ZXIxJztcbiAgcEFJQm9hcmQuaWQgPSAnUGxheWVyMic7XG4gIGJvYXJkcy5wdXNoKHAxQm9hcmQpO1xuICBib2FyZHMucHVzaChwQUlCb2FyZCk7XG4gIHBsYXllcnMucHVzaChwbGF5ZXIxKTtcbiAgcGxheWVycy5wdXNoKHBsYXllckFJKTtcblxuICBzZXR1cEFJKHBBSUJvYXJkKTtcblxuICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCwgcGxheWVyMSwgcGxheWVyQUkpO1xuICBhY3RpdmF0ZVBsYWNlbWVudEJ1dHRvbnMocDFCb2FyZCwgcEFJQm9hcmQsIHBsYXllcjEsIHBsYXllckFJKTtcbiAgYWN0aXZhdGVSZXNldEJ1dHRvbigpO1xufTtcblxuY29uc3QgZ2FtZW92ZXJDaGVjayA9IChib2FyZCkgPT4ge1xuICBjb25zdCBhbGxBcmVUcnVlID0gKGJvYXJkKSA9PlxuICAgIGJvYXJkLm15RmxlZXQuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWUpO1xuICBpZiAoYWxsQXJlVHJ1ZShib2FyZCkgPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmxvZyhgJHtib2FyZC5pZH0gd2FzIGRlZmVhdGVkYCk7XG4gICAgZ2FtZU92ZXIoYm9hcmQuaWQpO1xuICB9XG59O1xuXG5leHBvcnQgeyBydW5HYW1lLCBnYW1lb3ZlckNoZWNrIH07XG4iLCJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IGJvYXJkcyA9IFtdO1xuXG5sZXQgZ2FtZWJvYXJkO1xuXG5jb25zdCBnYW1lYm9hcmRGYWN0b3J5ID0gKCkgPT4ge1xuICAvLyBhIHR3byBkaW1lbnNpb25hbCBhcnJheVxuICBnYW1lYm9hcmQgPSB7XG4gICAgaWQ6IHVuZGVmaW5lZCxcbiAgICBteUZsZWV0OiBbXSxcbiAgICBwbGFjZVNoaXAodHlwZSwgbGVuZ3RoLCBjb29yZGluYXRlcykge1xuICAgICAgLy8gZ2V0IHRoZSBzaGlwIGZyb20gdGhlIGZhY3RvcnkgZnVuY3Rpb24gYW5kIGdldCBpdHMgcG9zaXRpb25cbiAgICAgIGNvbnN0IHNoaXAgPSBzaGlwRmFjdG9yeSh0eXBlLCBsZW5ndGgsIGNvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gc2hpcC5jb29yZGluYXRlcztcblxuICAgICAgaWYgKHBvc2l0aW9uWzBdID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gZGVmaW5lIHRoZSBwb3NpdGlvbiB0byBsb29rIGZvclxuICAgICAgcG9zaXRpb24uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJ0ID0gaXRlbVswXTtcbiAgICAgICAgY29uc3QgaG9yaXogPSBpdGVtWzFdO1xuXG4gICAgICAgIGNvbnN0IGZpZWxkID0gdGhpc1t2ZXJ0XS5maW5kKCh7IGhvcml6b250YWwgfSkgPT4gaG9yaXpvbnRhbCA9PT0gaG9yaXopO1xuXG4gICAgICAgIGZpZWxkLm9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm15RmxlZXQucHVzaChzaGlwKTtcbiAgICB9LFxuICAgIHJlY2lldmVBdHRhY2socG9zaXRpb24pIHtcbiAgICAgIC8vIHJlY2lldmUgY29vcmRpbmF0ZXMgb2YgYW4gYXR0YWNoIGFuZCBtYXJrIHRoYXQgZmllbGQgYXMgaGl0XG4gICAgICBjb25zdCB2ZXJ0ID0gcG9zaXRpb25bMF07XG4gICAgICBjb25zdCBob3JpeiA9IHBvc2l0aW9uWzFdO1xuXG4gICAgICBjb25zdCBmaWVsZCA9IHRoaXNbdmVydF0uZmluZCgoeyBob3Jpem9udGFsIH0pID0+IGhvcml6b250YWwgPT09IGhvcml6KTtcblxuICAgICAgaWYgKGZpZWxkLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBoaXQhJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkLmhpdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmllbGQuaGl0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5teUZsZWV0LmZvckVhY2goKG9iamVjdCkgPT4ge1xuICAgICAgICBvYmplY3QuY29vcmRpbmF0ZXMuZm9yRWFjaCgoYXJyYXkpID0+IHtcbiAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYXJyYXkpID09PSBKU09OLnN0cmluZ2lmeShwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIG9iamVjdC5oaXQocG9zaXRpb24pO1xuICAgICAgICAgICAgb2JqZWN0LmlzU3VuaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGdhbWVib2FyZDtcbiAgICB9LFxuICAgIGlsbGVnYWxQb3NpdGlvbnM6IFtdLFxuICB9O1xuXG4gIGNvbnN0IGNvbHMgPSAxMDtcbiAgY29uc3Qgcm93cyA9IDEwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHM7IGkrKykge1xuICAgIGdhbWVib2FyZFtpXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93czsgaisrKSB7XG4gICAgICBnYW1lYm9hcmRbaV0ucHVzaCh7XG4gICAgICAgIHZlcnRpY2FsOiBpLFxuICAgICAgICBob3Jpem9udGFsOiBqLFxuICAgICAgICBvY2N1cGllZDogZmFsc2UsXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZCwgYm9hcmRzLCBnYW1lYm9hcmRGYWN0b3J5IH07XG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IGdldFJhbmRvbUZpZWxkID0gKCkgPT4ge1xuICAvLyBnZXQgYSByYW5kb20gZmllbGQgb24gdGhlIGdhbWVib2FyZFxuICBsZXQgcmFuZG9tSG9yaXRvbnRhbDtcbiAgbGV0IHJhbmRvbVZlcnRpY2FsO1xuICBjb25zdCByYW5kb21Qb3NpdGlvbiA9IFtdO1xuXG4gIGNvbnN0IHJhbmRvbUFycmF5ID0gZ2FtZWJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gIGNvbnN0IHJhbmRvbU9iamVjdCA9IHJhbmRvbUFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gIHJhbmRvbVZlcnRpY2FsID0gcmFuZG9tT2JqZWN0LnZlcnRpY2FsO1xuICByYW5kb21Ib3JpdG9udGFsID0gcmFuZG9tT2JqZWN0Lmhvcml6b250YWw7XG5cbiAgcmFuZG9tUG9zaXRpb24ucHVzaChyYW5kb21WZXJ0aWNhbCk7XG4gIHJhbmRvbVBvc2l0aW9uLnB1c2gocmFuZG9tSG9yaXRvbnRhbCk7XG5cbiAgcmV0dXJuIHJhbmRvbVBvc2l0aW9uO1xufTtcblxuY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSAodHlwZSwgYWxpZ25tZW50LCBwb3NpdGlvbiwgYm9hcmQpID0+IHtcbiAgLy8gcmV0dXJucyB2YWxpZCBjb29yZGluYXRlcyBvZiBhbGwgZmllbGRzIG5lZWRlZCBmb3IgdGhlIHByb3Bvc2VkIHNoaXAgcGxhY2VtZW50XG4gIGNvbnN0IGlsbGVnYWwgPSBib2FyZC5pbGxlZ2FsUG9zaXRpb25zO1xuICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IGZsZWV0ID0gW1xuICAgIHtcbiAgICAgIHR5cGU6ICdjYXJyaWVyJyxcbiAgICAgIGxlbmd0aDogNSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdiYXR0bGVzaGlwJyxcbiAgICAgIGxlbmd0aDogNCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjcnVpc2VyJyxcbiAgICAgIGxlbmd0aDogMyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdzdWJtYXJpbmUnLFxuICAgICAgbGVuZ3RoOiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2Rlc3Ryb3llcicsXG4gICAgICBsZW5ndGg6IDIsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBpbGxlZ2FsUG9zaXRpb25zID0gW1xuICAgIC8vIGJsYWNrbGlzdCBvZiBwb3NpdGlvbnMgd2hlcmUgYSBzaGlwIGNhbiBuZXZlciBuZSBwbGFjZWRcbiAgICB7XG4gICAgICB0eXBlOiAnY2FycmllcicsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA2XSxcbiAgICAgICAgWzAsIDddLFxuICAgICAgICBbMCwgOF0sXG4gICAgICAgIFswLCA5XSxcbiAgICAgICAgWzEsIDZdLFxuICAgICAgICBbMSwgN10sXG4gICAgICAgIFsxLCA4XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgNl0sXG4gICAgICAgIFsyLCA3XSxcbiAgICAgICAgWzIsIDhdLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA2XSxcbiAgICAgICAgWzMsIDddLFxuICAgICAgICBbMywgOF0sXG4gICAgICAgIFszLCA5XSxcbiAgICAgICAgWzQsIDZdLFxuICAgICAgICBbNCwgN10sXG4gICAgICAgIFs0LCA4XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgNl0sXG4gICAgICAgIFs1LCA3XSxcbiAgICAgICAgWzUsIDhdLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA2XSxcbiAgICAgICAgWzYsIDddLFxuICAgICAgICBbNiwgOF0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDZdLFxuICAgICAgICBbNywgN10sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgNl0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY2FycmllcicsXG4gICAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbNiwgMF0sXG4gICAgICAgIFs2LCAxXSxcbiAgICAgICAgWzYsIDJdLFxuICAgICAgICBbNiwgM10sXG4gICAgICAgIFs2LCA0XSxcbiAgICAgICAgWzYsIDVdLFxuICAgICAgICBbNiwgNl0sXG4gICAgICAgIFs2LCA3XSxcbiAgICAgICAgWzYsIDhdLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCAwXSxcbiAgICAgICAgWzcsIDFdLFxuICAgICAgICBbNywgMl0sXG4gICAgICAgIFs3LCAzXSxcbiAgICAgICAgWzcsIDRdLFxuICAgICAgICBbNywgNV0sXG4gICAgICAgIFs3LCA2XSxcbiAgICAgICAgWzcsIDddLFxuICAgICAgICBbNywgOF0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDBdLFxuICAgICAgICBbOCwgMV0sXG4gICAgICAgIFs4LCAyXSxcbiAgICAgICAgWzgsIDNdLFxuICAgICAgICBbOCwgNF0sXG4gICAgICAgIFs4LCA1XSxcbiAgICAgICAgWzgsIDZdLFxuICAgICAgICBbOCwgN10sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgMF0sXG4gICAgICAgIFs5LCAxXSxcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgICAgIFs5LCA0XSxcbiAgICAgICAgWzksIDVdLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbMCwgN10sXG4gICAgICAgIFswLCA4XSxcbiAgICAgICAgWzAsIDldLFxuICAgICAgICBbMSwgN10sXG4gICAgICAgIFsxLCA4XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgN10sXG4gICAgICAgIFsyLCA4XSxcbiAgICAgICAgWzIsIDldLFxuICAgICAgICBbMywgN10sXG4gICAgICAgIFszLCA4XSxcbiAgICAgICAgWzMsIDldLFxuICAgICAgICBbNCwgN10sXG4gICAgICAgIFs0LCA4XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgN10sXG4gICAgICAgIFs1LCA4XSxcbiAgICAgICAgWzUsIDldLFxuICAgICAgICBbNiwgN10sXG4gICAgICAgIFs2LCA4XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgN10sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgN10sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdiYXR0bGVzaGlwJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs3LCAwXSxcbiAgICAgICAgWzcsIDFdLFxuICAgICAgICBbNywgMl0sXG4gICAgICAgIFs3LCAzXSxcbiAgICAgICAgWzcsIDRdLFxuICAgICAgICBbNywgNV0sXG4gICAgICAgIFs3LCA2XSxcbiAgICAgICAgWzcsIDddLFxuICAgICAgICBbNywgOF0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDBdLFxuICAgICAgICBbOCwgMV0sXG4gICAgICAgIFs4LCAyXSxcbiAgICAgICAgWzgsIDNdLFxuICAgICAgICBbOCwgNF0sXG4gICAgICAgIFs4LCA1XSxcbiAgICAgICAgWzgsIDZdLFxuICAgICAgICBbOCwgN10sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgMF0sXG4gICAgICAgIFs5LCAxXSxcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgICAgIFs5LCA0XSxcbiAgICAgICAgWzksIDVdLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NydWlzZXInLFxuICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbMCwgOF0sXG4gICAgICAgIFswLCA5XSxcbiAgICAgICAgWzEsIDhdLFxuICAgICAgICBbMSwgOV0sXG4gICAgICAgIFsyLCA4XSxcbiAgICAgICAgWzIsIDldLFxuICAgICAgICBbMywgOF0sXG4gICAgICAgIFszLCA5XSxcbiAgICAgICAgWzQsIDhdLFxuICAgICAgICBbNCwgOV0sXG4gICAgICAgIFs1LCA4XSxcbiAgICAgICAgWzUsIDldLFxuICAgICAgICBbNiwgOF0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY3J1aXNlcicsXG4gICAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbOCwgMF0sXG4gICAgICAgIFs4LCAxXSxcbiAgICAgICAgWzgsIDJdLFxuICAgICAgICBbOCwgM10sXG4gICAgICAgIFs4LCA0XSxcbiAgICAgICAgWzgsIDVdLFxuICAgICAgICBbOCwgNl0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCAwXSxcbiAgICAgICAgWzksIDFdLFxuICAgICAgICBbOSwgMl0sXG4gICAgICAgIFs5LCAzXSxcbiAgICAgICAgWzksIDRdLFxuICAgICAgICBbOSwgNV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnc3VibWFyaW5lJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzAsIDhdLFxuICAgICAgICBbMCwgOV0sXG4gICAgICAgIFsxLCA4XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgOF0sXG4gICAgICAgIFsyLCA5XSxcbiAgICAgICAgWzMsIDhdLFxuICAgICAgICBbMywgOV0sXG4gICAgICAgIFs0LCA4XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgOF0sXG4gICAgICAgIFs1LCA5XSxcbiAgICAgICAgWzYsIDhdLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3N1Ym1hcmluZScsXG4gICAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbOCwgMF0sXG4gICAgICAgIFs4LCAxXSxcbiAgICAgICAgWzgsIDJdLFxuICAgICAgICBbOCwgM10sXG4gICAgICAgIFs4LCA0XSxcbiAgICAgICAgWzgsIDVdLFxuICAgICAgICBbOCwgNl0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCAwXSxcbiAgICAgICAgWzksIDFdLFxuICAgICAgICBbOSwgMl0sXG4gICAgICAgIFs5LCAzXSxcbiAgICAgICAgWzksIDRdLFxuICAgICAgICBbOSwgNV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnZGVzdHJveWVyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzAsIDldLFxuICAgICAgICBbMSwgOV0sXG4gICAgICAgIFsyLCA5XSxcbiAgICAgICAgWzMsIDldLFxuICAgICAgICBbNCwgOV0sXG4gICAgICAgIFs1LCA5XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdkZXN0cm95ZXInLFxuICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzksIDBdLFxuICAgICAgICBbOSwgMV0sXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgICAgICBbOSwgNF0sXG4gICAgICAgIFs5LCA1XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdvY2N1cGllZCcsXG4gICAgICBwb3NpdGlvbnM6IFtdLFxuICAgIH0sXG4gIF07XG5cbiAgaWxsZWdhbFBvc2l0aW9uc1sxMF0ucG9zaXRpb25zLnB1c2goaWxsZWdhbCk7XG5cbiAgY29uc3Qgc2hpcCA9IHR5cGU7XG4gIGNvbnN0IGFsaWduID0gYWxpZ25tZW50O1xuXG4gIGNvbnN0IGNoZWNrUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgLy8gY2hlY2sgaWYgc2VsZWN0ZWQgZmllbGQgaXMgaW5zaWRlIHRoZSBnYW1lIGdyaWRcbiAgICBjb25zdCBzZWxlY3RlZEZpZWxkID0gcG9zaXRpb247XG5cbiAgICAvLyByZWplY3QgZmllbGQgaWYgaXQgaXMgYmxhY2tsaXN0ZWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlsbGVnYWxQb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgaWxsZWdhbFBvc2l0aW9uc1tpXS50eXBlID09PSBzaGlwICYmXG4gICAgICAgIGlsbGVnYWxQb3NpdGlvbnNbaV0ub3JpZW50YXRpb24gPT09IGFsaWduICYmXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGlsbGVnYWxQb3NpdGlvbnNbaV0ucG9zaXRpb25zKS5pbmNsdWRlcyhzZWxlY3RlZEZpZWxkKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbGxlZ2FsJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpbGxlZ2FsUG9zaXRpb25zWzEwXS5wb3NpdGlvbnMucHVzaChzZWxlY3RlZEZpZWxkKTtcbiAgICByZXR1cm4gc2VsZWN0ZWRGaWVsZDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQb3NpdGlvbiA9ICgpID0+IHtcbiAgICBsZXQgbGVuZ3RoO1xuXG4gICAgZmxlZXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gc2hpcCkge1xuICAgICAgICBsZW5ndGggPSBpdGVtLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNyZWF0ZUNvb3JkaW5hdGVzID0gKCgpID0+IHtcbiAgICAgIC8vIGNyZWF0ZXMgdGhlIGNvb3JkaW5hdGVzIG9mIGFsbCBuZWVkZWQgZmllbGRzIGZvciBzZWxlY3RlZCBzaGlwIG9uIHNlbGVjdGVkIGZpZWxkXG5cbiAgICAgIC8vIHJldHVybiBpcyBubyB2YWxpZCBwb3NpdGlvbiBpcyByZXR1cm5lZCBmcm9tIGNoZWNrUG9zaXRpb25cbiAgICAgIGlmICh2YWxpZENvb3JkaW5hdGVzWzBdID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBvcyA9IFsuLi52YWxpZENvb3JkaW5hdGVzWzBdXTtcbiAgICAgIGNvbnN0IGFkZGl0aW9uYWxDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICAvLyBnZXQgdGhlIG51bWJlciBjb3JyZXNwb25kaW5nIHRvIHRoZSBcImhvcml6b250YWxcIiBheGlzIGluIHRoZSBnYW1lYm9hcmQtYXJyYXlcbiAgICAgIC8vIHJlcGVhdCBcImxlbmd0aFwiLXRpbWVzXG4gICAgICBpZiAoYWxpZ25tZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIGFkZCAxIHRvIHRoYXQgbnVtYmVyIGFuZCBwdXNoIG5ldyBjb29yZGluYXRlcyB0byBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMtYXJyYXlcbiAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc1sxXSArIDE7XG4gICAgICAgICAgY29uc3QgYXJyID0gcG9zLnNwbGljZSgxLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgYWRkaXRpb25hbENvb3JkaW5hdGVzLnB1c2goW3Bvc1swXSwgYXJyWzBdXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWxpZ25tZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc1swXSArIDE7XG4gICAgICAgICAgY29uc3QgYXJyID0gcG9zLnNwbGljZSgwLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgYWRkaXRpb25hbENvb3JkaW5hdGVzLnB1c2goW2FyclswXSwgcG9zWzFdXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSBmaXJzdCBpdGVtIHRvIHByZXZlbnQgZHVwbGljYXRlIGNvb3JkaW5hdGVzXG4gICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMuc2hpZnQoKTtcblxuICAgICAgYWRkaXRpb25hbENvb3JkaW5hdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFsaWRDb29yZGluYXRlcy5wdXNoKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lsbGVnYWxQb3NpdGlvbnMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIG5lZWRlZCBmaWVsZHMgaXMgaW5zaWRlIHRoZSBibGFja2xpc3RcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYm9hcmQuaWxsZWdhbFBvc2l0aW9ucykuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBbbnVsbF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gYWRkIGFsbCBuZWVkZWQgZmllbGRzIHRvIGJsYWNrbGlzdFxuICAgIGlmIChjb29yZGluYXRlcyAhPT0gbnVsbCkge1xuICAgICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBib2FyZC5pbGxlZ2FsUG9zaXRpb25zLnB1c2goaXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgcmV0dXJuO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9O1xuICB2YWxpZENvb3JkaW5hdGVzLnB1c2goY2hlY2tQb3NpdGlvbigpKTtcbiAgY3JlYXRlUG9zaXRpb24oKTtcbiAgLy8gcmV0dXJuIHRoZSBpZiB0aGV5IHBhc3NlZCBhbGwgY2hlY2tzXG4gIHJldHVybiBjaGVja0lsbGVnYWxQb3NpdGlvbnModmFsaWRDb29yZGluYXRlcyk7XG59O1xuXG5jb25zdCBzZXR1cEFJID0gKHBBSUJvYXJkKSA9PiB7XG4gIGNvbnN0IGFsaWduID0gWyd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJ107XG4gIGNvbnN0IHJhbmRvbSA9ICgpID0+IGFsaWduW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFsaWduLmxlbmd0aCldO1xuXG4gIGNvbnN0IHBsYWNlQ2FycmllciA9ICgpID0+IHtcbiAgICBwQUlCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAnY2FycmllcicsXG4gICAgICA1LFxuICAgICAgZ2V0Q29vcmRpbmF0ZXMoJ2NhcnJpZXInLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ2NhcnJpZXInKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHBsYWNlQ2FycmllcigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGFjZUJhdHRsZXNoaXAgPSAoKSA9PiB7XG4gICAgcEFJQm9hcmQucGxhY2VTaGlwKFxuICAgICAgJ2JhdHRsZXNoaXAnLFxuICAgICAgNCxcbiAgICAgIGdldENvb3JkaW5hdGVzKCdiYXR0bGVzaGlwJywgcmFuZG9tKCksIGdldFJhbmRvbUZpZWxkKCksIHBBSUJvYXJkKVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgcEFJQm9hcmQubXlGbGVldC5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50LnR5cGUgPT09ICdiYXR0bGVzaGlwJykgPT09XG4gICAgICBmYWxzZVxuICAgICkge1xuICAgICAgcGxhY2VCYXR0bGVzaGlwKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlQ3J1aXNlciA9ICgpID0+IHtcbiAgICBwQUlCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAnY3J1aXNlcicsXG4gICAgICAzLFxuICAgICAgZ2V0Q29vcmRpbmF0ZXMoJ2NydWlzZXInLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ2NydWlzZXInKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGFjZVN1Ym1hcmluZSA9ICgpID0+IHtcbiAgICBwQUlCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAnc3VibWFyaW5lJyxcbiAgICAgIDMsXG4gICAgICBnZXRDb29yZGluYXRlcygnc3VibWFyaW5lJywgcmFuZG9tKCksIGdldFJhbmRvbUZpZWxkKCksIHBBSUJvYXJkKVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgcEFJQm9hcmQubXlGbGVldC5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50LnR5cGUgPT09ICdzdWJtYXJpbmUnKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHBsYWNlU3VibWFyaW5lKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlRGVzdHJveWVyID0gKCkgPT4ge1xuICAgIHBBSUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICdkZXN0cm95ZXInLFxuICAgICAgMixcbiAgICAgIGdldENvb3JkaW5hdGVzKCdkZXN0cm95ZXInLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ2Rlc3Ryb3llcicpID09PSBmYWxzZVxuICAgICkge1xuICAgICAgcGxhY2VEZXN0cm95ZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgcGxhY2VDYXJyaWVyKCk7XG4gIHBsYWNlQmF0dGxlc2hpcCgpO1xuICBwbGFjZUNydWlzZXIoKTtcbiAgcGxhY2VTdWJtYXJpbmUoKTtcbiAgcGxhY2VEZXN0cm95ZXIoKTtcbn07XG5cbmV4cG9ydCB7IGdldENvb3JkaW5hdGVzLCBnZXRSYW5kb21GaWVsZCwgc2V0dXBBSSB9O1xuIiwiaW1wb3J0IHJlbmRlckJvYXJkIGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGdldENvb3JkaW5hdGVzIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgYWN0aXZhdGVQbGFjZW1lbnRCdXR0b25zID0gKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSkgPT4ge1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1jb250YWluZXInKTtcbiAgY29uc3QgcDFpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxaW5mbycpO1xuICBjb25zdCBmbGVldEhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxlZXQtaGVhZGluZycpO1xuICBjb25zdCBwQUlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucEFJLWNvbnRhaW5lcicpO1xuICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm9Db250YWluZXInKTtcbiAgY29uc3QgYWxpZ25tZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsaWdubWVudCcpO1xuICBjb25zdCBwMUZsZWV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAxLWZsZWV0LXdyYXBwZXInKTtcbiAgY29uc3QgY2FycmllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJyaWVyQnV0dG9uJyk7XG4gIGNvbnN0IGJhdHRsZXNoaXBCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGxlc2hpcEJ1dHRvbicpO1xuICBjb25zdCBjcnVpc2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NydWlzZXJCdXR0b24nKTtcbiAgY29uc3Qgc3VibWFyaW5lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1hcmluZUJ1dHRvbicpO1xuICBjb25zdCBkZXN0cm95ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyQnV0dG9uJyk7XG5cbiAgaW5mb0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAoYWxpZ25tZW50QnRuLmlubmVyVGV4dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBhbGlnbm1lbnRCdG4uaW5uZXJUZXh0ID0gJ3ZlcnRpY2FsJztcbiAgICAgIGluZm9Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgndmVydCcpO1xuICAgIH0gZWxzZSBpZiAoYWxpZ25tZW50QnRuLmlubmVyVGV4dCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgYWxpZ25tZW50QnRuLmlubmVyVGV4dCA9ICdob3Jpem9udGFsJztcbiAgICAgIGluZm9Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgndmVydCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2FycmllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhjYXJyaWVyQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSwgNSwgY2FycmllckJ0bik7XG4gIH0pO1xuXG4gIGJhdHRsZXNoaXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVuZGVyQm9hcmQocDFCb2FyZCwgcEFJQm9hcmQpO1xuICAgIHBsYWNlUGxheWVyU2hpcHMoXG4gICAgICBiYXR0bGVzaGlwQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSxcbiAgICAgIDQsXG4gICAgICBiYXR0bGVzaGlwQnRuXG4gICAgKTtcbiAgfSk7XG5cbiAgY3J1aXNlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhjcnVpc2VyQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSwgMywgY3J1aXNlckJ0bik7XG4gIH0pO1xuXG4gIHN1Ym1hcmluZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhzdWJtYXJpbmVCdG4ucGFyZW50Tm9kZS5pZC50b0xvd2VyQ2FzZSgpLCAzLCBzdWJtYXJpbmVCdG4pO1xuICB9KTtcblxuICBkZXN0cm95ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVuZGVyQm9hcmQocDFCb2FyZCwgcEFJQm9hcmQpO1xuICAgIHBsYWNlUGxheWVyU2hpcHMoZGVzdHJveWVyQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSwgMiwgZGVzdHJveWVyQnRuKTtcbiAgfSk7XG5cbiAgY29uc3QgcGxhY2VQbGF5ZXJTaGlwcyA9IChzaGlwbmFtZSwgbGVuZ3RoLCBidG4pID0+IHtcbiAgICBwMWluZm8uaW5uZXJUZXh0ID0gYFBsYWNlIHlvdXIgJHtzaGlwbmFtZX1gO1xuICAgIHAxaW5mby5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIGNvbnN0IGZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWVsZC1wMScpO1xuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgdmVydCA9IHBhcnNlSW50KGZpZWxkLmlkWzZdKTtcbiAgICAgIGNvbnN0IGhvcml6ID0gcGFyc2VJbnQoZmllbGQuaWRbZmllbGQuaWQubGVuZ3RoIC0gMV0pO1xuICAgICAgY29uc3QgcG9zID0gW3ZlcnQsIGhvcml6XTtcbiAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGlnbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGlnbm1lbnQnKS50ZXh0Q29udGVudDtcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgc2hpcG5hbWUsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIGdldENvb3JkaW5hdGVzKHNoaXBuYW1lLCBhbGlnbiwgcG9zLCBwMUJvYXJkKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwMUJvYXJkLm15RmxlZXQuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC50eXBlID09PSBzaGlwbmFtZSkpIHtcbiAgICAgICAgICBwMWluZm8uaW5uZXJUZXh0ID0gJ0RlcGxveSB0aGUgcmVzdCBvZiB5b3VyIGZsZWV0ISc7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzaGlwbmFtZX1gKTtcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpO1xuICAgICAgICAgIHAxaW5mby5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCd1bmFibGUgdG8gcGxhY2UgaGVyZS4gdHJ5IGFnYWluIScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwMUJvYXJkLm15RmxlZXQubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgcDFpbmZvLmlubmVyVGV4dCA9ICdZb3VyIGZsZWV0JztcbiAgICAgICAgICBpbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgIHBBSUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICBwMUZsZWV0LmNsYXNzTGlzdC5hZGQoJ2ZsZWV0LXNldCcpO1xuICAgICAgICAgIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLXNldCcpO1xuICAgICAgICAgIGZsZWV0SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlckJvYXJkKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSk7XG4gICAgICB9KTtcblxuICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBob3ZlckVmZmVjdChwb3MpO1xuICAgICAgfSk7XG4gICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaG92ZXJFZmZlY3QocG9zKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBob3ZlckVmZmVjdChwb3MpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCBmaWVsZHMgY292ZXJlZCBieSBjdXJyZW50bHkgc2VsZWN0ZWQgc2hpcCBpbiByZWFsIHRpbWVcbiAgICAgICAgY29uc3QgYWxpZ24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxpZ25tZW50JykuaW5uZXJUZXh0O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFsuLi5wb3NdO1xuICAgICAgICBjb25zdCBjbGFpbWVkID0gW107XG5cbiAgICAgICAgaWYgKGFsaWduID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc2l0aW9uWzFdICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IHBvc2l0aW9uLnNwbGljZSgxLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgICBjbGFpbWVkLnB1c2goW3Bvc2l0aW9uWzBdLCBhcnJbMF1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYWxpZ24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc2l0aW9uWzBdICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IHBvc2l0aW9uLnNwbGljZSgwLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgICBjbGFpbWVkLnB1c2goW2FyclswXSwgcG9zaXRpb25bMV1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xhaW1lZC5sZW5ndGggPSBsZW5ndGg7XG5cbiAgICAgICAgY2xhaW1lZC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmVydGljYWwgPSBpdGVtWzBdO1xuICAgICAgICAgIGNvbnN0IGhvcml6b250YWwgPSBpdGVtWzFdO1xuICAgICAgICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQtcDEnKTtcbiAgICAgICAgICBjb25zdCByb3cgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGAjcDEtcm93JHt2ZXJ0aWNhbH1gKTtcbiAgICAgICAgICBpZiAodmVydGljYWwgPD0gOSAmJiBob3Jpem9udGFsIDw9IDkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByb3cucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgYCNwMS1yb3cke3ZlcnRpY2FsfS1maWVsZCR7aG9yaXpvbnRhbH1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdob3ZlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5jb25zdCBhY3RpdmF0ZVJlc2V0QnV0dG9uID0gKCkgPT4ge1xuICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpO1xuXG4gIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlcG9ydFN1bmtTaGlwID0gKGJvYXJkKSA9PiB7XG4gIGJvYXJkLm15RmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGlmIChzaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwLnR5cGUpLmNsYXNzTGlzdC5hZGQoJ3N1bmsnKTtcbiAgICAgIC8vIGdldCB0aGUgY2xvc2VzdCAuZmxlZXQtZWxlbWVudCB0byBwcmVmZW50IGl0IGZyb20gYmVpbmcgdHJhbnNmb3JtZWQgd2hlbiBzaGlwIGlzIHN1bmtcbiAgICAgIGNvbnN0IGNsb3Nlc3RFbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgLmdldEVsZW1lbnRCeUlkKHNoaXAudHlwZSlcbiAgICAgICAgLmNsb3Nlc3QoJy5mbGVldCcpO1xuICAgICAgY2xvc2VzdEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBnYW1lT3ZlciA9IChsb3NlcklEKSA9PiB7XG4gIGlmIChsb3NlcklEID09PSAnUGxheWVyMScpIHtcbiAgICBsb3NlcklEID0gJ1lvdSB3ZXJlJztcbiAgfVxuICBpZiAobG9zZXJJRCA9PT0gJ1BsYXllcjInKSB7XG4gICAgbG9zZXJJRCA9ICdBSSB3YXMnO1xuICB9XG5cbiAgY29uc3QgbW9kYWxCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG5cbiAgZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XG4gICAgaWYgKG1vZGFsID09IG51bGwpIHJldHVybjtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICB9XG4gIG9wZW5Nb2RhbChtb2RhbCk7XG4gIG1vZGFsQm9keS50ZXh0Q29udGVudCA9IGAke2xvc2VySUR9IGRlZmVhdGVkLiBcbiAgVGhlcmUgYXJlIG5vIHdpbm5lcnMgaW4gd2FyISBgO1xuICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldEJ0bk1vZGFsJyk7XG5cbiAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHtcbiAgYWN0aXZhdGVQbGFjZW1lbnRCdXR0b25zLFxuICBhY3RpdmF0ZVJlc2V0QnV0dG9uLFxuICByZXBvcnRTdW5rU2hpcCxcbiAgZ2FtZU92ZXIsXG59O1xuIiwiaW1wb3J0IHsgYm9hcmRzIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5jb25zdCBwbGF5ZXJzID0gW107XG5cbmNvbnN0IHBsYXllckZhY3RvcnkgPSAobmFtZSwgaXNBSSkgPT4ge1xuICBpZiAoaXNBSSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ1BsYXllcjInLFxuICAgICAgbmFtZSxcbiAgICAgIGlzQUksXG4gICAgICBpc0FjdGl2ZTogZmFsc2UsXG5cbiAgICAgIGdldFJhbmRvbVBvc2l0aW9uKCkge1xuICAgICAgICBsZXQgcmFuZG9tSG9yaXRvbnRhbDtcbiAgICAgICAgbGV0IHJhbmRvbVZlcnRpY2FsO1xuICAgICAgICBjb25zdCByYW5kb21Qb3NpdGlvbiA9IFtdO1xuXG4gICAgICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlkICE9PSBib2FyZC5pZCkge1xuICAgICAgICAgICAgY29uc3QgcmFuZG9tQXJyYXkgPSBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xuICAgICAgICAgICAgY29uc3QgcmFuZG9tT2JqZWN0ID0gcmFuZG9tQXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcbiAgICAgICAgICAgIHJhbmRvbVZlcnRpY2FsID0gcmFuZG9tT2JqZWN0LnZlcnRpY2FsO1xuICAgICAgICAgICAgcmFuZG9tSG9yaXRvbnRhbCA9IHJhbmRvbU9iamVjdC5ob3Jpem9udGFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJhbmRvbVBvc2l0aW9uLnB1c2gocmFuZG9tVmVydGljYWwpO1xuICAgICAgICByYW5kb21Qb3NpdGlvbi5wdXNoKHJhbmRvbUhvcml0b250YWwpO1xuXG4gICAgICAgIHJldHVybiByYW5kb21Qb3NpdGlvbjtcbiAgICAgIH0sXG5cbiAgICAgIHZhbGlkYXRlUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgY2hlY2tlZCA9IHBvc2l0aW9uO1xuICAgICAgICBjb25zdCB2ZXJ0ID0gcG9zaXRpb25bMF07XG4gICAgICAgIGNvbnN0IGhvcml6ID0gcG9zaXRpb25bMV07XG4gICAgICAgIC8vIGNoZWNrIGlmIHBvc2l0dGlvbiAgd2FzIGFscmVkeSBoaXRcbiAgICAgICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaWQgIT09IGJvYXJkLmlkKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IGJvYXJkW3ZlcnRdLmZpbmQoXG4gICAgICAgICAgICAgICh7IGhvcml6b250YWwgfSkgPT4gaG9yaXpvbnRhbCA9PT0gaG9yaXpcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZmllbGQuaGl0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB0aGlzLmF0dGFjayhjaGVja2VkKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpZWxkLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUG9zaXRpb24odGhpcy5nZXRSYW5kb21Qb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgYXR0YWNrKHBvc2l0aW9uKSB7XG4gICAgICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlkICE9PSBib2FyZC5pZCkge1xuICAgICAgICAgICAgYm9hcmQucmVjaWV2ZUF0dGFjayhwb3NpdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gc3dpdGNoIGFjdGl2ZSBwbGF5ZXJcbiAgICAgICAgcGxheWVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgICAgIGl0ZW0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWQgIT09IGl0ZW0uaWQpIHtcbiAgICAgICAgICAgIGl0ZW0uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpZDogJ1BsYXllcjEnLFxuICAgIG5hbWUsXG4gICAgaXNBY3RpdmU6IHRydWUsXG4gICAgYXR0YWNrKHBvc2l0aW9uKSB7XG4gICAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaWQgIT09IGJvYXJkLmlkKSB7XG4gICAgICAgICAgYm9hcmQucmVjaWV2ZUF0dGFjayhwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gc3dpdGNoIGFjdGl2ZSBwbGF5ZXJcbiAgICAgIHBsYXllcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICAgIGl0ZW0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlkICE9PSBpdGVtLmlkKSB7XG4gICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCB0dXJuQUkgPSAocEFJKSA9PiB7XG4gIGNvbnN0IGF0dGFjayA9IHBBSS52YWxpZGF0ZVBvc2l0aW9uKHBBSS5nZXRSYW5kb21Qb3NpdGlvbigpKTtcblxuICByZXR1cm4gcEFJO1xufTtcblxuZXhwb3J0IHsgcGxheWVyRmFjdG9yeSwgcGxheWVycywgdHVybkFJIH07XG4iLCJjb25zdCBzaGlwRmFjdG9yeSA9ICh0eXBlLCBsZW5ndGgsIGNvb3JkaW5hdGVzKSA9PiAoe1xuICB0eXBlLFxuICBsZW5ndGgsXG4gIGNvb3JkaW5hdGVzLFxuICBoaXRib3g6IFtdLFxuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodGhpcy5jb29yZGluYXRlcykuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmhpdGJveC5wdXNoKHBvc2l0aW9uKTtcbiAgICB9XG4gIH0sXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gISEoXG4gICAgICB0aGlzLmhpdGJveC5sZW5ndGggPj0gMCAmJiB0aGlzLmhpdGJveC5sZW5ndGggPj0gdGhpcy5jb29yZGluYXRlcy5sZW5ndGhcbiAgICApO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IHNoaXBGYWN0b3J5IH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLyoqXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxuICovXFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcblxcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnByZSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uLFxcbnNlbGVjdCB7IC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3Nc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O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGFBQWE7QUFDZjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGFBQWE7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLyoqXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxuICovXFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcblxcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnByZSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uLFxcbnNlbGVjdCB7IC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6aXRhbCx3Z2h0QDAsMTAwOzAsMjAwOzAsMzAwOzAsNDAwOzAsNTAwOzAsNjAwOzAsNzAwOzAsODAwOzAsOTAwOzEsMTAwOzEsMjAwOzEsMzAwOzEsNDAwOzEsNTAwOzEsNjAwOzEsNzAwOzEsODAwOzEsOTAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9wZW4rU2FucyZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiByZXNldCBzdHlsZXMgKi9cXG4qIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG59XFxuXFxuLmp1c3RpZnktY2VudGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYWxpZ24tY2VudGVyIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAwKSB7XFxuXFxuICAuY29sLTEyLXhzIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XFxuXFxuICAuY29sLTUtc20ge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcblxcbiAgLmNvbC0yLXhsIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxufVxcbi50ZXh0LXByaW1hcnkge1xcbiAgY29sb3I6ICMwNzY4OWY7XFxufVxcblxcbi50ZXh0LXdoaXRlIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmNhcmQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAwLjc1cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJveC1zaGFkb3c6IDFweCAzcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuLmNhcmQgLmNhcmQtdGl0bGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjc1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxufVxcblxcbi5idG4tcHJpbWFyeSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNzY4OWY7XFxufVxcbi5idG4tcHJpbWFyeTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg3OGI3O1xcbn1cXG5cXG4uYnRuLWVycm9yIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I4NDA1ZTtcXG59XFxuLmJ0bi1lcnJvcjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzI1MDZjO1xcbn1cXG5cXG4ucC0xIHtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxufVxcblxcbi5wLTIge1xcbiAgcGFkZGluZzogMS41cmVtO1xcbn1cXG5cXG4ubS0xIHtcXG4gIG1hcmdpbjogMC43NXJlbTtcXG59XFxuXFxuLm0tMiB7XFxuICBtYXJnaW46IDEuNXJlbTtcXG59XFxuXFxuLm10LTIge1xcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xcbn1cXG5cXG4ubWItMiB7XFxuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XFxufVxcblxcbi5mZC1jIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUNBLGlCQUFpQjtBQUVqQjtFQUNFLGNBQWM7RUFDZCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRTtJQUNFLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osV0FBVztFQUNiO0FBQ0Y7QUFDQTs7RUFFRTtJQUNFLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1oscUJBQXFCO0VBQ3ZCO0FBQ0Y7QUFDQTs7RUFFRTtJQUNFLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1oscUJBQXFCO0VBQ3ZCO0FBQ0Y7QUFDQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0QiwwQ0FBMEM7QUFDNUM7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsU0FBUztFQUNULHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTs7O0VBR0Usc0JBQXNCO0FBQ3hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6aXRhbCx3Z2h0QDAsMTAwOzAsMjAwOzAsMzAwOzAsNDAwOzAsNTAwOzAsNjAwOzAsNzAwOzAsODAwOzAsOTAwOzEsMTAwOzEsMjAwOzEsMzAwOzEsNDAwOzEsNTAwOzEsNjAwOzEsNzAwOzEsODAwOzEsOTAwJmRpc3BsYXk9c3dhcFxcXCIpO1xcbi8qIHJlc2V0IHN0eWxlcyAqL1xcbkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9wZW4rU2FucyZkaXNwbGF5PXN3YXBcXFwiKTtcXG4qIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG59XFxuXFxuLmp1c3RpZnktY2VudGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYWxpZ24tY2VudGVyIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAwKSB7XFxuXFxuICAuY29sLTEyLXhzIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XFxuXFxuICAuY29sLTUtc20ge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcblxcbiAgLmNvbC0yLXhsIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxufVxcbi50ZXh0LXByaW1hcnkge1xcbiAgY29sb3I6ICMwNzY4OWY7XFxufVxcblxcbi50ZXh0LXdoaXRlIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmNhcmQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAwLjc1cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJveC1zaGFkb3c6IDFweCAzcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuLmNhcmQgLmNhcmQtdGl0bGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjc1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxufVxcblxcbi5idG4tcHJpbWFyeSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNzY4OWY7XFxufVxcbi5idG4tcHJpbWFyeTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg3OGI3O1xcbn1cXG5cXG4uYnRuLWVycm9yIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I4NDA1ZTtcXG59XFxuLmJ0bi1lcnJvcjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzI1MDZjO1xcbn1cXG5cXG4ucC0xIHtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxufVxcblxcbi5wLTIge1xcbiAgcGFkZGluZzogMS41cmVtO1xcbn1cXG5cXG4ubS0xIHtcXG4gIG1hcmdpbjogMC43NXJlbTtcXG59XFxuXFxuLm0tMiB7XFxuICBtYXJnaW46IDEuNXJlbTtcXG59XFxuXFxuLm10LTIge1xcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xcbn1cXG5cXG4ubWItMiB7XFxuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XFxufVxcblxcbi5mZC1jIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tYmFja2dyb3VuZDogI2Y0ZjlmOTtcXG4gIC0tcGxheWVyQm9hcmQ6ICNiYWQ3ZGY7XFxuICAtLUFJYm9hcmQ6ICNmZmUyZTI7XFxuICAtLWZsZWV0OiAjMDc2NzlmNWU7XFxuICAtLXN1bms6ICNkODIxNDg7XFxuICAtLWhpdDogIzEyY2M5NDtcXG4gIC0tbWlzczogI2UyM2U1NztcXG4gIC0taG92ZXI6ICNjNDA4ODVkNztcXG4gIC0tc2hpcDogIzA3Njg5ZjtcXG4gIC0tYWxpZ246ICMwNzY4OWY7XFxufVxcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsXFxuICAgICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJyxcXG4gICAgJ1NlZ29lIFVJIEVtb2ppJywgJ1NlZ29lIFVJIFN5bWJvbCc7XFxufVxcblxcbmltZyB7XFxuICBtYXgtd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IDVyZW07XFxufVxcblxcbi5oZWFkaW5nIHtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluO1xcbn1cXG5cXG4uaW5mby1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ucmVzZXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG5cXG4uZ2FtZS1ncmlkIHtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbi5ncmlkLXAxLFxcbi5ncmlkLXBBSSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZC1wMTpob3ZlcixcXG4uZ3JpZC1wQUk6aG92ZXIge1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5yb3ctcDEsXFxuLnJvdy1wQUkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZmllbGQtcDEsXFxuLmZpZWxkLXBBSSB7XFxuICBib3JkZXI6IGRhc2hlZCAxcHggYmxhY2s7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmZpZWxkLXAxIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllckJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXBBSSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1BSWJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXAxOmhvdmVyLFxcbi5maWVsZC1wQUk6aG92ZXIge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDEyNSUpO1xcbn1cXG5cXG4ucDEtc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwKTtcXG59XFxuXFxuLnBsYWNlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mbGVldCk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyO1xcbiAgYW5pbWF0aW9uOiBwdWxzZSA1cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1bmspO1xcbiAgdHJhbnNpdGlvbjogYWxsIDEwMDBtcyBsaW5lYXI7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1pc3MpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaXQpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGhlaWdodDogMTV2aDtcXG4gIHdpZHRoOiAxNXZoO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmFsaWdubWVudC1pY29uLWhvcml6IHtcXG4gIGhlaWdodDogMXJlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWxpZ24pO1xcbn1cXG5cXG4udmVydCB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTUwbXMgZWFzZS1pbi1vdXQ7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcblxcbi5ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlcik7XFxufVxcblxcbi5maXJlIHtcXG4gIHRyYW5zaXRpb246IGFsbCA3NW1zIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxMjUlKTtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBsaW5lYXI7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyogLm1vZGFsLXdyYXBwZXIge1xcbiAgcGFkZGluZzogMjVweCAwIDAgMjVweDtcXG59XFxuICovXFxuLm1vZGFsIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCk7XFxuICBib3JkZXI6IHNvbGlkIDJweCBibGFjaztcXG4gIHotaW5kZXg6IDEwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7XFxuICB3aWR0aDogNTAwcHg7XFxuICBtYXgtd2lkdGg6IDgwJTtcXG59XFxuXFxuLm1vZGFsLmFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcXG59XFxuXFxuLm1vZGFsLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZsZWV0KTtcXG59XFxuXFxuLm1vZGFsLWhlYWRlciAudGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5tb2RhbC1ib2R5IHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jb3ZlcmxheSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBvcGFjaXR5OiAwO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjY5Mik7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRyYW5zaXRpb246IDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jb3ZlcmxheS5hY3RpdmUge1xcbiAgb3BhY2l0eTogMTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBcXFwicHVsc2VcXFwiIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7XFxuICB9XFxuICA1MCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDI0cHgpIHtcXG4gIC5ib2FyZC1zZXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA0MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAvKiB0cmFuc2l0aW9uOiBhbGwgNTBtcyBsaW5lYXI7ICovXFxuICB9XFxuICAuZmxlZXQtc2V0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDByZW07XFxuICAgIHJpZ2h0OiAtMjByZW07XFxuICAgIHRyYW5zaXRpb246IGFsbCA1MG1zIGxpbmVhcjtcXG4gIH1cXG5cXG4gIC5mbGVldC1zZXQgPiAucDEtZmxlZXQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG5cXG4gIC5mbGVldC1zZXQgPiAucDEtZmxlZXQtY29udGFpbmVyID4gLmZsZWV0IHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcXG4gIC5oZWFkaW5nIHtcXG4gICAgZm9udC1zaXplOiBtZWRpdW07XFxuICAgIG1hcmdpbi10b3A6IDFyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBOzs7RUFHRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULG1DQUFtQztFQUNuQzs7dUNBRXFDO0FBQ3ZDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0FBQ2hCOztBQUVBOztFQUVFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7O0VBRUUsaUJBQWlCO0FBQ25COztBQUVBOztFQUVFLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7O0VBRUUsd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixXQUFXO0FBQ2I7QUFDQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTs7RUFFRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsNEJBQTRCO0VBQzVCLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3Qiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw0QkFBNEI7RUFDNUIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBOzs7RUFHRTtBQUNGO0VBQ0UsZUFBZTtFQUNmLFFBQVE7RUFDUixTQUFTO0VBQ1QseUNBQXlDO0VBQ3pDLHVCQUF1QjtFQUN2QixXQUFXO0VBQ1gsbUNBQW1DO0VBQ25DLFlBQVk7RUFDWixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFVBQVU7RUFDVixNQUFNO0VBQ04sUUFBUTtFQUNSLFNBQVM7RUFDVCxPQUFPO0VBQ1Asc0NBQXNDO0VBQ3RDLG9CQUFvQjtFQUNwQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0U7SUFDRSwyQkFBMkI7SUFDM0IsbUJBQW1CO0lBQ25CLHdCQUF3QjtFQUMxQjtFQUNBO0lBQ0UsNkJBQTZCO0lBQzdCLHFCQUFxQjtJQUNyQix1QkFBdUI7RUFDekI7RUFDQTtJQUNFLDJCQUEyQjtJQUMzQixtQkFBbUI7SUFDbkIsd0JBQXdCO0VBQzFCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGdDQUFnQztJQUNoQyxpQ0FBaUM7RUFDbkM7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsYUFBYTtJQUNiLDJCQUEyQjtFQUM3Qjs7RUFFQTtJQUNFLGFBQWE7SUFDYixzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixtQkFBbUI7RUFDckI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLWJhY2tncm91bmQ6ICNmNGY5Zjk7XFxuICAtLXBsYXllckJvYXJkOiAjYmFkN2RmO1xcbiAgLS1BSWJvYXJkOiAjZmZlMmUyO1xcbiAgLS1mbGVldDogIzA3Njc5ZjVlO1xcbiAgLS1zdW5rOiAjZDgyMTQ4O1xcbiAgLS1oaXQ6ICMxMmNjOTQ7XFxuICAtLW1pc3M6ICNlMjNlNTc7XFxuICAtLWhvdmVyOiAjYzQwODg1ZDc7XFxuICAtLXNoaXA6ICMwNzY4OWY7XFxuICAtLWFsaWduOiAjMDc2ODlmO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kKTtcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZiwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LFxcbiAgICAnU2Vnb2UgVUknLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsICdBcHBsZSBDb2xvciBFbW9qaScsXFxuICAgICdTZWdvZSBVSSBFbW9qaScsICdTZWdvZSBVSSBTeW1ib2wnO1xcbn1cXG5cXG5pbWcge1xcbiAgbWF4LXdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiA1cmVtO1xcbn1cXG5cXG4uaGVhZGluZyB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTUwbXMgZWFzZS1pbjtcXG59XFxuXFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuXFxuLnJlc2V0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59XFxuXFxuLmdhbWUtZ3JpZCB7XFxuICB3aWR0aDogNTB2dztcXG4gIGhlaWdodDogNTB2aDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbn1cXG5cXG4uZ3JpZC1wMSxcXG4uZ3JpZC1wQUkge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdyaWQtcDE6aG92ZXIsXFxuLmdyaWQtcEFJOmhvdmVyIHtcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcbn1cXG5cXG4ucm93LXAxLFxcbi5yb3ctcEFJIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmZpZWxkLXAxLFxcbi5maWVsZC1wQUkge1xcbiAgYm9yZGVyOiBkYXNoZWQgMXB4IGJsYWNrO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5maWVsZC1wMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wbGF5ZXJCb2FyZCk7XFxufVxcblxcbi5maWVsZC1wQUkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tQUlib2FyZCk7XFxufVxcblxcbi5maWVsZC1wMTpob3ZlcixcXG4uZmllbGQtcEFJOmhvdmVyIHtcXG4gIGZpbHRlcjogYnJpZ2h0bmVzcygxMjUlKTtcXG59XFxuXFxuLnAxLXNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcCk7XFxufVxcblxcbi5wbGFjZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZmxlZXQpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGxpbmVhcjtcXG4gIGFuaW1hdGlvbjogcHVsc2UgNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uc3VuayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zdW5rKTtcXG4gIHRyYW5zaXRpb246IGFsbCAxMDAwbXMgbGluZWFyO1xcbn1cXG5cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1taXNzKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGl0KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5pbmZvLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDE1dmg7XFxuICB3aWR0aDogMTV2aDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTUwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5hbGlnbm1lbnQtaWNvbi1ob3JpeiB7XFxuICBoZWlnaHQ6IDFyZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFsaWduKTtcXG59XFxuXFxuLnZlcnQge1xcbiAgdHJhbnNpdGlvbjogYWxsIDE1MG1zIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbn1cXG5cXG4uaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXIpO1xcbn1cXG5cXG4uZmlyZSB7XFxuICB0cmFuc2l0aW9uOiBhbGwgNzVtcyBlYXNlLWluLW91dDtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMTI1JSk7XFxufVxcblxcbi5zZWxlY3RlZCB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTUwbXMgbGluZWFyO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qIC5tb2RhbC13cmFwcGVyIHtcXG4gIHBhZGRpbmc6IDI1cHggMCAwIDI1cHg7XFxufVxcbiAqL1xcbi5tb2RhbCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xcbiAgYm9yZGVyOiBzb2xpZCAycHggYmxhY2s7XFxuICB6LWluZGV4OiAxMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxufVxcblxcbi5tb2RhbC5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxufVxcblxcbi5tb2RhbC1oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mbGVldCk7XFxufVxcblxcbi5tb2RhbC1oZWFkZXIgLnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4ubW9kYWwtYm9keSB7XFxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI292ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42OTIpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiAyMDBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuI292ZXJsYXkuYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgXFxcInB1bHNlXFxcIiB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMmRlZyk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7XFxuICB9XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAyNHB4KSB7XFxuICAuYm9hcmQtc2V0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNDAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgLyogdHJhbnNpdGlvbjogYWxsIDUwbXMgbGluZWFyOyAqL1xcbiAgfVxcbiAgLmZsZWV0LXNldCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwcmVtO1xcbiAgICByaWdodDogLTIwcmVtO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgNTBtcyBsaW5lYXI7XFxuICB9XFxuXFxuICAuZmxlZXQtc2V0ID4gLnAxLWZsZWV0LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAuZmxlZXQtc2V0ID4gLnAxLWZsZWV0LWNvbnRhaW5lciA+IC5mbGVldCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XFxuICAuaGVhZGluZyB7XFxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcyc7XG5pbXBvcnQgJ25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0IHsgcnVuR2FtZSB9IGZyb20gJy4vbW9kdWxlcy9nYW1lJztcblxucnVuR2FtZSgpO1xuIl0sIm5hbWVzIjpbImdhbWVvdmVyQ2hlY2siLCJyZXBvcnRTdW5rU2hpcCIsInR1cm5BSSIsInJlbmRlckJvYXJkIiwicDFCb2FyZCIsInBBSUJvYXJkIiwicGxheWVyMSIsInBsYXllckFJIiwicDFib2FyZCIsInBBSWJvYXJkIiwicDEiLCJwQUkiLCJwMUdyaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicEFJR3JpZCIsImNyZWF0ZUdyaWRzIiwiaW5uZXJIVE1MIiwiaSIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImZvckVhY2giLCJlbGVtZW50IiwiaiIsImZpZWxkIiwib2NjdXBpZWQiLCJoaXQiLCJpbm5lclRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwidmVydCIsInZlcnRpY2FsIiwiaG9yaXoiLCJob3Jpem9udGFsIiwiYXR0YWNrIiwic2hpcEZpcmVFZmZlY3QiLCJ0dXJuIiwicGFyZW50U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwiY2hpbGRFbGVtZW50Q291bnQiLCJjaGlsZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjb250YWlucyIsImJvYXJkcyIsImdhbWVib2FyZEZhY3RvcnkiLCJzZXR1cEFJIiwiYWN0aXZhdGVQbGFjZW1lbnRCdXR0b25zIiwiYWN0aXZhdGVSZXNldEJ1dHRvbiIsImdhbWVPdmVyIiwicGxheWVyRmFjdG9yeSIsInBsYXllcnMiLCJydW5HYW1lIiwiaWQiLCJwdXNoIiwiYm9hcmQiLCJhbGxBcmVUcnVlIiwibXlGbGVldCIsImV2ZXJ5Iiwic2hpcCIsImlzU3VuayIsImNvbnNvbGUiLCJsb2ciLCJzaGlwRmFjdG9yeSIsImdhbWVib2FyZCIsInVuZGVmaW5lZCIsInBsYWNlU2hpcCIsInR5cGUiLCJsZW5ndGgiLCJjb29yZGluYXRlcyIsInBvc2l0aW9uIiwiaXRlbSIsImZpbmQiLCJyZWNpZXZlQXR0YWNrIiwib2JqZWN0IiwiYXJyYXkiLCJKU09OIiwic3RyaW5naWZ5IiwiaWxsZWdhbFBvc2l0aW9ucyIsImNvbHMiLCJyb3dzIiwiZ2V0UmFuZG9tRmllbGQiLCJyYW5kb21Ib3JpdG9udGFsIiwicmFuZG9tVmVydGljYWwiLCJyYW5kb21Qb3NpdGlvbiIsInJhbmRvbUFycmF5IiwicmFuZG9tT2JqZWN0IiwiZ2V0Q29vcmRpbmF0ZXMiLCJhbGlnbm1lbnQiLCJpbGxlZ2FsIiwidmFsaWRDb29yZGluYXRlcyIsImZsZWV0Iiwib3JpZW50YXRpb24iLCJwb3NpdGlvbnMiLCJhbGlnbiIsImNoZWNrUG9zaXRpb24iLCJzZWxlY3RlZEZpZWxkIiwiaW5jbHVkZXMiLCJjcmVhdGVQb3NpdGlvbiIsImNyZWF0ZUNvb3JkaW5hdGVzIiwicG9zIiwiYWRkaXRpb25hbENvb3JkaW5hdGVzIiwiYWRkaXRpb24iLCJhcnIiLCJzcGxpY2UiLCJzaGlmdCIsImNoZWNrSWxsZWdhbFBvc2l0aW9ucyIsInBsYWNlQ2FycmllciIsInNvbWUiLCJwbGFjZUJhdHRsZXNoaXAiLCJwbGFjZUNydWlzZXIiLCJwbGFjZVN1Ym1hcmluZSIsInBsYWNlRGVzdHJveWVyIiwiYm9hcmRDb250YWluZXIiLCJwMWluZm8iLCJmbGVldEhlYWRpbmciLCJwQUlDb250YWluZXIiLCJpbmZvQ29udGFpbmVyIiwiYWxpZ25tZW50QnRuIiwicDFGbGVldCIsImNhcnJpZXJCdG4iLCJiYXR0bGVzaGlwQnRuIiwiY3J1aXNlckJ0biIsInN1Ym1hcmluZUJ0biIsImRlc3Ryb3llckJ0biIsInRvZ2dsZSIsInBsYWNlUGxheWVyU2hpcHMiLCJwYXJlbnROb2RlIiwidG9Mb3dlckNhc2UiLCJzaGlwbmFtZSIsImJ0biIsImZpZWxkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJzZUludCIsInRleHRDb250ZW50IiwiYWxlcnQiLCJob3ZlckVmZmVjdCIsImNsYWltZWQiLCJyZXNldEJ0biIsImxvY2F0aW9uIiwicmVsb2FkIiwiY2xvc2VzdEVsZW1lbnQiLCJjbG9zZXN0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJsb3NlcklEIiwibW9kYWxCb2R5Iiwib3ZlcmxheSIsIm9wZW5Nb2RhbCIsIm1vZGFsIiwibmFtZSIsImlzQUkiLCJpc0FjdGl2ZSIsImdldFJhbmRvbVBvc2l0aW9uIiwidmFsaWRhdGVQb3NpdGlvbiIsImNoZWNrZWQiLCJoaXRib3giXSwic291cmNlUm9vdCI6IiJ9