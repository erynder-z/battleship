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
            var closestElement = child.firstElementChild;
            child.classList.add('fire');
            setTimeout(function () {
              child.classList.remove('fire');
            }, 100);

            if (closestElement.classList.contains('sunk') === true) {
              shipFireEffect();
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --background: #f4f9f9;\n  --playerBoard: #bad7df;\n  --AIboard: #ffe2e2;\n  --fleet: #07679f5e;\n  --sunk: #d82148;\n  --hit: #12cc94;\n  --miss: #e23e57;\n  --hover: #c40885d7;\n  --ship: #07689f;\n  --align: #07689f;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n  background-color: var(--background);\n  font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',\n    'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\nimg {\n  max-width: auto;\n  height: 5rem;\n}\n\n.heading {\n  transition: all 150ms ease-in;\n}\n\n.info-container {\n  display: flex;\n}\n\n.board-container {\n  max-width: 100vw;\n}\n\n.reset {\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.game-grid {\n  width: 50vw;\n  height: 50vh;\n  margin: 0 auto;\n}\n\n.grid-p1,\n.grid-pAI {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid-p1:hover,\n.grid-pAI:hover {\n  cursor: crosshair;\n}\n\n.row-p1,\n.row-pAI {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.field-p1,\n.field-pAI {\n  border: dashed 1px black;\n  height: 100%;\n  width: 100%;\n}\n.field-p1 {\n  background-color: var(--playerBoard);\n}\n\n.field-pAI {\n  background-color: var(--AIboard);\n}\n\n.field-p1:hover,\n.field-pAI:hover {\n  filter: brightness(125%);\n}\n\n.p1-ship {\n  background-color: var(--ship);\n}\n\n.placed {\n  background-color: var(--fleet);\n  transition: all 200ms linear;\n  animation: pulse 5s linear infinite;\n}\n\n.sunk {\n  background-color: var(--sunk);\n  transition: all 1000ms linear;\n}\n\n.miss {\n  background-color: var(--miss);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit {\n  background-color: var(--hit);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.info-container {\n  height: 15vh;\n  width: 15vh;\n  margin-left: auto;\n  margin-right: auto;\n  border: solid 1px black;\n  transition: all 150ms ease-in-out;\n}\n\n.alignment-icon-horiz {\n  height: 1rem;\n  width: 100%;\n  background-color: var(--align);\n}\n\n.vert {\n  transition: all 150ms ease-in-out;\n  transform: rotate(90deg);\n}\n\n.hover {\n  background-color: var(--hover);\n}\n\n.fire {\n  transition: all 75ms ease-in-out;\n  transform: scale(125%);\n}\n\n.selected {\n  transform: scale(1.5);\n  transition: all 150ms linear;\n}\n\n.hidden {\n  display: none;\n}\n\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  border: solid 2px black;\n  z-index: 10;\n  background-color: var(--background);\n  width: 500px;\n  max-width: 80%;\n}\n\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal-header {\n  display: flex;\n  padding: 10px 15px;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--fleet);\n}\n\n.modal-header .title {\n  font-size: 1.25rem;\n  font-weight: bold;\n}\n.modal-body {\n  padding: 10px 15px;\n  display: flex;\n  flex-direction: column;\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.692);\n  pointer-events: none;\n  transition: 200ms ease-in-out;\n}\n\n#overlay.active {\n  opacity: 1;\n  pointer-events: all;\n}\n\n@-webkit-keyframes \"pulse\" {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n  50% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    transform: rotate(2deg);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n}\n\n@media only screen and (min-width: 1024px) {\n  .board-set {\n    position: absolute;\n    top: 50%;\n    left: 40%;\n    transform: translate(-50%, -50%);\n  }\n  .fleet-set {\n    position: absolute;\n    top: 0rem;\n    right: -20rem;\n    transition: all 50ms linear;\n  }\n\n  .fleet-set > .p1-fleet-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fleet-set > .p1-fleet-container > .fleet {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .heading {\n    font-size: medium;\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB;;AAEA;;;EAGE,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,SAAS;EACT,mCAAmC;EACnC;;uCAEqC;AACvC;;AAEA;EACE,eAAe;EACf,YAAY;AACd;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,2BAA2B;AAC7B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,cAAc;AAChB;;AAEA;;EAEE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,mCAAmC;AACrC;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;;EAEE,aAAa;EACb,sCAAsC;AACxC;;AAEA;;EAEE,wBAAwB;EACxB,YAAY;EACZ,WAAW;AACb;AACA;EACE,oCAAoC;AACtC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,wBAAwB;AAC1B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;EAC9B,4BAA4B;EAC5B,mCAAmC;AACrC;;AAEA;EACE,6BAA6B;EAC7B,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;EAC5B,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;EACvB,iCAAiC;AACnC;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,8BAA8B;AAChC;;AAEA;EACE,iCAAiC;EACjC,wBAAwB;AAC1B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,gCAAgC;EAChC,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,QAAQ;EACR,SAAS;EACT,yCAAyC;EACzC,uBAAuB;EACvB,WAAW;EACX,mCAAmC;EACnC,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,8BAA8B;EAC9B,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,UAAU;EACV,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,sCAAsC;EACtC,oBAAoB;EACpB,6BAA6B;AAC/B;;AAEA;EACE,UAAU;EACV,mBAAmB;AACrB;;AAEA;EACE;IACE,2BAA2B;IAC3B,mBAAmB;IACnB,wBAAwB;EAC1B;EACA;IACE,6BAA6B;IAC7B,qBAAqB;IACrB,uBAAuB;EACzB;EACA;IACE,2BAA2B;IAC3B,mBAAmB;IACnB,wBAAwB;EAC1B;AACF;;AAEA;EACE;IACE,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,gCAAgC;EAClC;EACA;IACE,kBAAkB;IAClB,SAAS;IACT,aAAa;IACb,2BAA2B;EAC7B;;EAEA;IACE,aAAa;IACb,sBAAsB;EACxB;;EAEA;IACE,WAAW;EACb;AACF;;AAEA;EACE;IACE,iBAAiB;IACjB,gBAAgB;IAChB,mBAAmB;EACrB;AACF","sourcesContent":[":root {\n  --background: #f4f9f9;\n  --playerBoard: #bad7df;\n  --AIboard: #ffe2e2;\n  --fleet: #07679f5e;\n  --sunk: #d82148;\n  --hit: #12cc94;\n  --miss: #e23e57;\n  --hover: #c40885d7;\n  --ship: #07689f;\n  --align: #07689f;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n  background-color: var(--background);\n  font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',\n    'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\nimg {\n  max-width: auto;\n  height: 5rem;\n}\n\n.heading {\n  transition: all 150ms ease-in;\n}\n\n.info-container {\n  display: flex;\n}\n\n.board-container {\n  max-width: 100vw;\n}\n\n.reset {\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.game-grid {\n  width: 50vw;\n  height: 50vh;\n  margin: 0 auto;\n}\n\n.grid-p1,\n.grid-pAI {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid-p1:hover,\n.grid-pAI:hover {\n  cursor: crosshair;\n}\n\n.row-p1,\n.row-pAI {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.field-p1,\n.field-pAI {\n  border: dashed 1px black;\n  height: 100%;\n  width: 100%;\n}\n.field-p1 {\n  background-color: var(--playerBoard);\n}\n\n.field-pAI {\n  background-color: var(--AIboard);\n}\n\n.field-p1:hover,\n.field-pAI:hover {\n  filter: brightness(125%);\n}\n\n.p1-ship {\n  background-color: var(--ship);\n}\n\n.placed {\n  background-color: var(--fleet);\n  transition: all 200ms linear;\n  animation: pulse 5s linear infinite;\n}\n\n.sunk {\n  background-color: var(--sunk);\n  transition: all 1000ms linear;\n}\n\n.miss {\n  background-color: var(--miss);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit {\n  background-color: var(--hit);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.info-container {\n  height: 15vh;\n  width: 15vh;\n  margin-left: auto;\n  margin-right: auto;\n  border: solid 1px black;\n  transition: all 150ms ease-in-out;\n}\n\n.alignment-icon-horiz {\n  height: 1rem;\n  width: 100%;\n  background-color: var(--align);\n}\n\n.vert {\n  transition: all 150ms ease-in-out;\n  transform: rotate(90deg);\n}\n\n.hover {\n  background-color: var(--hover);\n}\n\n.fire {\n  transition: all 75ms ease-in-out;\n  transform: scale(125%);\n}\n\n.selected {\n  transform: scale(1.5);\n  transition: all 150ms linear;\n}\n\n.hidden {\n  display: none;\n}\n\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  border: solid 2px black;\n  z-index: 10;\n  background-color: var(--background);\n  width: 500px;\n  max-width: 80%;\n}\n\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal-header {\n  display: flex;\n  padding: 10px 15px;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--fleet);\n}\n\n.modal-header .title {\n  font-size: 1.25rem;\n  font-weight: bold;\n}\n.modal-body {\n  padding: 10px 15px;\n  display: flex;\n  flex-direction: column;\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.692);\n  pointer-events: none;\n  transition: 200ms ease-in-out;\n}\n\n#overlay.active {\n  opacity: 1;\n  pointer-events: all;\n}\n\n@-webkit-keyframes \"pulse\" {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n  50% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    transform: rotate(2deg);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n}\n\n@media only screen and (min-width: 1024px) {\n  .board-set {\n    position: absolute;\n    top: 50%;\n    left: 40%;\n    transform: translate(-50%, -50%);\n  }\n  .fleet-set {\n    position: absolute;\n    top: 0rem;\n    right: -20rem;\n    transition: all 50ms linear;\n  }\n\n  .fleet-set > .p1-fleet-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fleet-set > .p1-fleet-container > .fleet {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .heading {\n    font-size: medium;\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTSxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxNQUFNLFlBQVksT0FBTyxNQUFNLFVBQVUsWUFBWSxPQUFPLE1BQU0sWUFBWSxXQUFXLFVBQVUsS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8s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RUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFFQWhCLHNEQUFPLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzPzM0MmYiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzYzNDkiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzP2ZmOTQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVvdmVyQ2hlY2sgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcmVwb3J0U3Vua1NoaXAgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyB0dXJuQUkgfSBmcm9tICcuL3BsYXllcic7XG5cbmNvbnN0IHJlbmRlckJvYXJkID0gKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSkgPT4ge1xuICBjb25zdCBwMWJvYXJkID0gcDFCb2FyZDtcbiAgY29uc3QgcEFJYm9hcmQgPSBwQUlCb2FyZDtcbiAgY29uc3QgcDEgPSBwbGF5ZXIxO1xuICBjb25zdCBwQUkgPSBwbGF5ZXJBSTtcbiAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcbiAgY29uc3QgcEFJR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwQUlCb2FyZCcpO1xuXG4gIGNvbnN0IGNyZWF0ZUdyaWRzID0gKHAxYm9hcmQsIHBBSWJvYXJkKSA9PiB7XG4gICAgcDFHcmlkLmlubmVySFRNTCA9ICcnO1xuICAgIHBBSUdyaWQuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gY3JlYXRlIDEwIHJvd3NcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3Jvdy1wMScpO1xuICAgICAgcm93LnNldEF0dHJpYnV0ZSgnaWQnLCBgcDEtcm93JHtpfWApO1xuICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAvLyBmaWxsIHRoZSByb3dzIHdpdGggb25lIGRpdiBmb3IgZWFjaCBvYmplY3QgaW4gdGhlIGJvYXJkXG4gICAgICBwMWJvYXJkW2ldLmZvckVhY2goKGVsZW1lbnQsIGopID0+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZmllbGQtcDEnKTtcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdpZCcsIGBwMS1yb3cke2l9LWZpZWxkJHtqfWApO1xuICAgICAgICBpZiAoZWxlbWVudC5vY2N1cGllZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ3AxLXNoaXAnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5oaXQgPT09IHRydWUgJiYgZWxlbWVudC5vY2N1cGllZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgIGZpZWxkLmlubmVyVGV4dCA9ICfil48nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LmhpdCA9PT0gdHJ1ZSAmJiBlbGVtZW50Lm9jY3VwaWVkID09PSBmYWxzZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICBmaWVsZC5pbm5lclRleHQgPSAn4pyWJztcbiAgICAgICAgfVxuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZmllbGQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93LXBBSScpO1xuICAgICAgcm93LnNldEF0dHJpYnV0ZSgnaWQnLCBgcEFJLXJvdyR7aX1gKTtcbiAgICAgIHBBSUdyaWQuYXBwZW5kQ2hpbGQocm93KTtcblxuICAgICAgcEFJYm9hcmRbaV0uZm9yRWFjaCgoZWxlbWVudCwgaikgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdmaWVsZC1wQUknKTtcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdpZCcsIGBwQUktcm93JHtpfS1maWVsZCR7an1gKTtcbiAgICAgICAgaWYgKGVsZW1lbnQub2NjdXBpZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdwQUktc2hpcCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LmhpdCA9PT0gdHJ1ZSAmJiBlbGVtZW50Lm9jY3VwaWVkID09PSB0cnVlKSB7XG4gICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgICAgZmllbGQuaW5uZXJUZXh0ID0gJ+KXjyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQuaGl0ID09PSB0cnVlICYmIGVsZW1lbnQub2NjdXBpZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICAgIGZpZWxkLmlubmVyVGV4dCA9ICfinJYnO1xuICAgICAgICB9XG5cbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmVydCA9IGVsZW1lbnQudmVydGljYWw7XG4gICAgICAgICAgY29uc3QgaG9yaXogPSBlbGVtZW50Lmhvcml6b250YWw7XG4gICAgICAgICAgLy8gYXR0YWNrXG4gICAgICAgICAgcDEuYXR0YWNrKFt2ZXJ0LCBob3Jpel0pO1xuICAgICAgICAgIC8vIHNlbGVjdCBhIHJhbmRvbSBzaGlwIGFuZCBmcm9tIHRoZSBpbnRlcmZhY2UgYW5kIGxldCBpdCBcImZpcmVcIlxuICAgICAgICAgIHNoaXBGaXJlRWZmZWN0KCk7XG4gICAgICAgICAgdHVybigpO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2hpcEZpcmVFZmZlY3QoKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICcucDEtZmxlZXQtY29udGFpbmVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgIDEgKyBNYXRoLnJhbmRvbSgpICogcGFyZW50U2VsZWN0b3IuY2hpbGRFbGVtZW50Q291bnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGAucDEtZmxlZXQtY29udGFpbmVyPmRpdjpudGgtY2hpbGQoJHtyYW5kb219KWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjbG9zZXN0RWxlbWVudCA9IGNoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKCdmaXJlJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZSgnZmlyZScpO1xuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgaWYgKGNsb3Nlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc3VuaycpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNoaXBGaXJlRWZmZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gdHVybigpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnaGl0JykgPT09IGZhbHNlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgZ2FtZW92ZXJDaGVjayhwQUlCb2FyZCk7XG4gICAgICAgICAgICAgIHR1cm5BSShwQUkpO1xuICAgICAgICAgICAgICByZXBvcnRTdW5rU2hpcChwMUJvYXJkKTtcbiAgICAgICAgICAgICAgZ2FtZW92ZXJDaGVjayhwMUJvYXJkKTtcbiAgICAgICAgICAgICAgcmVuZGVyQm9hcmQocDFCb2FyZCwgcEFJQm9hcmQsIHAxLCBwQUkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5vY2N1cGllZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZmllbGQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcDEsIHBBSSB9O1xuICB9O1xuXG4gIGNyZWF0ZUdyaWRzKHAxYm9hcmQsIHBBSWJvYXJkKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlckJvYXJkO1xuIiwiaW1wb3J0IHJlbmRlckJvYXJkIGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGJvYXJkcywgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHNldHVwQUkgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHtcbiAgYWN0aXZhdGVQbGFjZW1lbnRCdXR0b25zLFxuICBhY3RpdmF0ZVJlc2V0QnV0dG9uLFxuICBnYW1lT3Zlcixcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgcGxheWVyRmFjdG9yeSwgcGxheWVycyB9IGZyb20gJy4vcGxheWVyJztcblxuY29uc3QgcnVuR2FtZSA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyMSA9IHBsYXllckZhY3RvcnkoJ2RhdmUnLCBmYWxzZSk7XG4gIGNvbnN0IHBsYXllckFJID0gcGxheWVyRmFjdG9yeSgnaGFsJywgdHJ1ZSk7XG4gIGNvbnN0IHAxQm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG4gIGNvbnN0IHBBSUJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuICBwMUJvYXJkLmlkID0gJ1BsYXllcjEnO1xuICBwQUlCb2FyZC5pZCA9ICdQbGF5ZXIyJztcbiAgYm9hcmRzLnB1c2gocDFCb2FyZCk7XG4gIGJvYXJkcy5wdXNoKHBBSUJvYXJkKTtcbiAgcGxheWVycy5wdXNoKHBsYXllcjEpO1xuICBwbGF5ZXJzLnB1c2gocGxheWVyQUkpO1xuXG4gIHNldHVwQUkocEFJQm9hcmQpO1xuXG4gIHJlbmRlckJvYXJkKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSk7XG4gIGFjdGl2YXRlUGxhY2VtZW50QnV0dG9ucyhwMUJvYXJkLCBwQUlCb2FyZCwgcGxheWVyMSwgcGxheWVyQUkpO1xuICBhY3RpdmF0ZVJlc2V0QnV0dG9uKCk7XG59O1xuXG5jb25zdCBnYW1lb3ZlckNoZWNrID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGFsbEFyZVRydWUgPSAoYm9hcmQpID0+XG4gICAgYm9hcmQubXlGbGVldC5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZSk7XG4gIGlmIChhbGxBcmVUcnVlKGJvYXJkKSA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUubG9nKGAke2JvYXJkLmlkfSB3YXMgZGVmZWF0ZWRgKTtcbiAgICBnYW1lT3Zlcihib2FyZC5pZCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IHJ1bkdhbWUsIGdhbWVvdmVyQ2hlY2sgfTtcbiIsImltcG9ydCB7IHNoaXBGYWN0b3J5IH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgYm9hcmRzID0gW107XG5cbmxldCBnYW1lYm9hcmQ7XG5cbmNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIC8vIGEgdHdvIGRpbWVuc2lvbmFsIGFycmF5XG4gIGdhbWVib2FyZCA9IHtcbiAgICBpZDogdW5kZWZpbmVkLFxuICAgIG15RmxlZXQ6IFtdLFxuICAgIHBsYWNlU2hpcCh0eXBlLCBsZW5ndGgsIGNvb3JkaW5hdGVzKSB7XG4gICAgICAvLyBnZXQgdGhlIHNoaXAgZnJvbSB0aGUgZmFjdG9yeSBmdW5jdGlvbiBhbmQgZ2V0IGl0cyBwb3NpdGlvblxuICAgICAgY29uc3Qgc2hpcCA9IHNoaXBGYWN0b3J5KHR5cGUsIGxlbmd0aCwgY29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBzaGlwLmNvb3JkaW5hdGVzO1xuXG4gICAgICBpZiAocG9zaXRpb25bMF0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWZpbmUgdGhlIHBvc2l0aW9uIHRvIGxvb2sgZm9yXG4gICAgICBwb3NpdGlvbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHZlcnQgPSBpdGVtWzBdO1xuICAgICAgICBjb25zdCBob3JpeiA9IGl0ZW1bMV07XG5cbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzW3ZlcnRdLmZpbmQoKHsgaG9yaXpvbnRhbCB9KSA9PiBob3Jpem9udGFsID09PSBob3Jpeik7XG5cbiAgICAgICAgZmllbGQub2NjdXBpZWQgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubXlGbGVldC5wdXNoKHNoaXApO1xuICAgIH0sXG4gICAgcmVjaWV2ZUF0dGFjayhwb3NpdGlvbikge1xuICAgICAgLy8gcmVjaWV2ZSBjb29yZGluYXRlcyBvZiBhbiBhdHRhY2ggYW5kIG1hcmsgdGhhdCBmaWVsZCBhcyBoaXRcbiAgICAgIGNvbnN0IHZlcnQgPSBwb3NpdGlvblswXTtcbiAgICAgIGNvbnN0IGhvcml6ID0gcG9zaXRpb25bMV07XG5cbiAgICAgIGNvbnN0IGZpZWxkID0gdGhpc1t2ZXJ0XS5maW5kKCh7IGhvcml6b250YWwgfSkgPT4gaG9yaXpvbnRhbCA9PT0gaG9yaXopO1xuXG4gICAgICBpZiAoZmllbGQuaGl0ID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IGhpdCEnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGQuaGl0ID09PSBmYWxzZSkge1xuICAgICAgICBmaWVsZC5oaXQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm15RmxlZXQuZm9yRWFjaCgob2JqZWN0KSA9PiB7XG4gICAgICAgIG9iamVjdC5jb29yZGluYXRlcy5mb3JFYWNoKChhcnJheSkgPT4ge1xuICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShhcnJheSkgPT09IEpTT04uc3RyaW5naWZ5KHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgb2JqZWN0LmhpdChwb3NpdGlvbik7XG4gICAgICAgICAgICBvYmplY3QuaXNTdW5rKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZ2FtZWJvYXJkO1xuICAgIH0sXG4gICAgaWxsZWdhbFBvc2l0aW9uczogW10sXG4gIH07XG5cbiAgY29uc3QgY29scyA9IDEwO1xuICBjb25zdCByb3dzID0gMTA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sczsgaSsrKSB7XG4gICAgZ2FtZWJvYXJkW2ldID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzOyBqKyspIHtcbiAgICAgIGdhbWVib2FyZFtpXS5wdXNoKHtcbiAgICAgICAgdmVydGljYWw6IGksXG4gICAgICAgIGhvcml6b250YWw6IGosXG4gICAgICAgIG9jY3VwaWVkOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZ2FtZWJvYXJkO1xufTtcblxuZXhwb3J0IHsgZ2FtZWJvYXJkLCBib2FyZHMsIGdhbWVib2FyZEZhY3RvcnkgfTtcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcblxuY29uc3QgZ2V0UmFuZG9tRmllbGQgPSAoKSA9PiB7XG4gIC8vIGdldCBhIHJhbmRvbSBmaWVsZCBvbiB0aGUgZ2FtZWJvYXJkXG4gIGxldCByYW5kb21Ib3JpdG9udGFsO1xuICBsZXQgcmFuZG9tVmVydGljYWw7XG4gIGNvbnN0IHJhbmRvbVBvc2l0aW9uID0gW107XG5cbiAgY29uc3QgcmFuZG9tQXJyYXkgPSBnYW1lYm9hcmRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcbiAgY29uc3QgcmFuZG9tT2JqZWN0ID0gcmFuZG9tQXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcbiAgcmFuZG9tVmVydGljYWwgPSByYW5kb21PYmplY3QudmVydGljYWw7XG4gIHJhbmRvbUhvcml0b250YWwgPSByYW5kb21PYmplY3QuaG9yaXpvbnRhbDtcblxuICByYW5kb21Qb3NpdGlvbi5wdXNoKHJhbmRvbVZlcnRpY2FsKTtcbiAgcmFuZG9tUG9zaXRpb24ucHVzaChyYW5kb21Ib3JpdG9udGFsKTtcblxuICByZXR1cm4gcmFuZG9tUG9zaXRpb247XG59O1xuXG5jb25zdCBnZXRDb29yZGluYXRlcyA9ICh0eXBlLCBhbGlnbm1lbnQsIHBvc2l0aW9uLCBib2FyZCkgPT4ge1xuICAvLyByZXR1cm5zIHZhbGlkIGNvb3JkaW5hdGVzIG9mIGFsbCBmaWVsZHMgbmVlZGVkIGZvciB0aGUgcHJvcG9zZWQgc2hpcCBwbGFjZW1lbnRcbiAgY29uc3QgaWxsZWdhbCA9IGJvYXJkLmlsbGVnYWxQb3NpdGlvbnM7XG4gIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgY29uc3QgZmxlZXQgPSBbXG4gICAge1xuICAgICAgdHlwZTogJ2NhcnJpZXInLFxuICAgICAgbGVuZ3RoOiA1LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgbGVuZ3RoOiA0LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NydWlzZXInLFxuICAgICAgbGVuZ3RoOiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3N1Ym1hcmluZScsXG4gICAgICBsZW5ndGg6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnZGVzdHJveWVyJyxcbiAgICAgIGxlbmd0aDogMixcbiAgICB9LFxuICBdO1xuXG4gIGNvbnN0IGlsbGVnYWxQb3NpdGlvbnMgPSBbXG4gICAgLy8gYmxhY2tsaXN0IG9mIHBvc2l0aW9ucyB3aGVyZSBhIHNoaXAgY2FuIG5ldmVyIG5lIHBsYWNlZFxuICAgIHtcbiAgICAgIHR5cGU6ICdjYXJyaWVyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzAsIDZdLFxuICAgICAgICBbMCwgN10sXG4gICAgICAgIFswLCA4XSxcbiAgICAgICAgWzAsIDldLFxuICAgICAgICBbMSwgNl0sXG4gICAgICAgIFsxLCA3XSxcbiAgICAgICAgWzEsIDhdLFxuICAgICAgICBbMSwgOV0sXG4gICAgICAgIFsyLCA2XSxcbiAgICAgICAgWzIsIDddLFxuICAgICAgICBbMiwgOF0sXG4gICAgICAgIFsyLCA5XSxcbiAgICAgICAgWzMsIDZdLFxuICAgICAgICBbMywgN10sXG4gICAgICAgIFszLCA4XSxcbiAgICAgICAgWzMsIDldLFxuICAgICAgICBbNCwgNl0sXG4gICAgICAgIFs0LCA3XSxcbiAgICAgICAgWzQsIDhdLFxuICAgICAgICBbNCwgOV0sXG4gICAgICAgIFs1LCA2XSxcbiAgICAgICAgWzUsIDddLFxuICAgICAgICBbNSwgOF0sXG4gICAgICAgIFs1LCA5XSxcbiAgICAgICAgWzYsIDZdLFxuICAgICAgICBbNiwgN10sXG4gICAgICAgIFs2LCA4XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgNl0sXG4gICAgICAgIFs3LCA3XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCA2XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjYXJyaWVyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs2LCAwXSxcbiAgICAgICAgWzYsIDFdLFxuICAgICAgICBbNiwgMl0sXG4gICAgICAgIFs2LCAzXSxcbiAgICAgICAgWzYsIDRdLFxuICAgICAgICBbNiwgNV0sXG4gICAgICAgIFs2LCA2XSxcbiAgICAgICAgWzYsIDddLFxuICAgICAgICBbNiwgOF0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDBdLFxuICAgICAgICBbNywgMV0sXG4gICAgICAgIFs3LCAyXSxcbiAgICAgICAgWzcsIDNdLFxuICAgICAgICBbNywgNF0sXG4gICAgICAgIFs3LCA1XSxcbiAgICAgICAgWzcsIDZdLFxuICAgICAgICBbNywgN10sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgMF0sXG4gICAgICAgIFs4LCAxXSxcbiAgICAgICAgWzgsIDJdLFxuICAgICAgICBbOCwgM10sXG4gICAgICAgIFs4LCA0XSxcbiAgICAgICAgWzgsIDVdLFxuICAgICAgICBbOCwgNl0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCAwXSxcbiAgICAgICAgWzksIDFdLFxuICAgICAgICBbOSwgMl0sXG4gICAgICAgIFs5LCAzXSxcbiAgICAgICAgWzksIDRdLFxuICAgICAgICBbOSwgNV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnYmF0dGxlc2hpcCcsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA3XSxcbiAgICAgICAgWzAsIDhdLFxuICAgICAgICBbMCwgOV0sXG4gICAgICAgIFsxLCA3XSxcbiAgICAgICAgWzEsIDhdLFxuICAgICAgICBbMSwgOV0sXG4gICAgICAgIFsyLCA3XSxcbiAgICAgICAgWzIsIDhdLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA3XSxcbiAgICAgICAgWzMsIDhdLFxuICAgICAgICBbMywgOV0sXG4gICAgICAgIFs0LCA3XSxcbiAgICAgICAgWzQsIDhdLFxuICAgICAgICBbNCwgOV0sXG4gICAgICAgIFs1LCA3XSxcbiAgICAgICAgWzUsIDhdLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA3XSxcbiAgICAgICAgWzYsIDhdLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCA3XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzcsIDBdLFxuICAgICAgICBbNywgMV0sXG4gICAgICAgIFs3LCAyXSxcbiAgICAgICAgWzcsIDNdLFxuICAgICAgICBbNywgNF0sXG4gICAgICAgIFs3LCA1XSxcbiAgICAgICAgWzcsIDZdLFxuICAgICAgICBbNywgN10sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgMF0sXG4gICAgICAgIFs4LCAxXSxcbiAgICAgICAgWzgsIDJdLFxuICAgICAgICBbOCwgM10sXG4gICAgICAgIFs4LCA0XSxcbiAgICAgICAgWzgsIDVdLFxuICAgICAgICBbOCwgNl0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCAwXSxcbiAgICAgICAgWzksIDFdLFxuICAgICAgICBbOSwgMl0sXG4gICAgICAgIFs5LCAzXSxcbiAgICAgICAgWzksIDRdLFxuICAgICAgICBbOSwgNV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY3J1aXNlcicsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA4XSxcbiAgICAgICAgWzAsIDldLFxuICAgICAgICBbMSwgOF0sXG4gICAgICAgIFsxLCA5XSxcbiAgICAgICAgWzIsIDhdLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA4XSxcbiAgICAgICAgWzMsIDldLFxuICAgICAgICBbNCwgOF0sXG4gICAgICAgIFs0LCA5XSxcbiAgICAgICAgWzUsIDhdLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA4XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgOF0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjcnVpc2VyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs4LCAwXSxcbiAgICAgICAgWzgsIDFdLFxuICAgICAgICBbOCwgMl0sXG4gICAgICAgIFs4LCAzXSxcbiAgICAgICAgWzgsIDRdLFxuICAgICAgICBbOCwgNV0sXG4gICAgICAgIFs4LCA2XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDBdLFxuICAgICAgICBbOSwgMV0sXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgICAgICBbOSwgNF0sXG4gICAgICAgIFs5LCA1XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdzdWJtYXJpbmUnLFxuICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbMCwgOF0sXG4gICAgICAgIFswLCA5XSxcbiAgICAgICAgWzEsIDhdLFxuICAgICAgICBbMSwgOV0sXG4gICAgICAgIFsyLCA4XSxcbiAgICAgICAgWzIsIDldLFxuICAgICAgICBbMywgOF0sXG4gICAgICAgIFszLCA5XSxcbiAgICAgICAgWzQsIDhdLFxuICAgICAgICBbNCwgOV0sXG4gICAgICAgIFs1LCA4XSxcbiAgICAgICAgWzUsIDldLFxuICAgICAgICBbNiwgOF0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnc3VibWFyaW5lJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs4LCAwXSxcbiAgICAgICAgWzgsIDFdLFxuICAgICAgICBbOCwgMl0sXG4gICAgICAgIFs4LCAzXSxcbiAgICAgICAgWzgsIDRdLFxuICAgICAgICBbOCwgNV0sXG4gICAgICAgIFs4LCA2XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDBdLFxuICAgICAgICBbOSwgMV0sXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgICAgICBbOSwgNF0sXG4gICAgICAgIFs5LCA1XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdkZXN0cm95ZXInLFxuICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbMCwgOV0sXG4gICAgICAgIFsxLCA5XSxcbiAgICAgICAgWzIsIDldLFxuICAgICAgICBbMywgOV0sXG4gICAgICAgIFs0LCA5XSxcbiAgICAgICAgWzUsIDldLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2Rlc3Ryb3llcicsXG4gICAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbOSwgMF0sXG4gICAgICAgIFs5LCAxXSxcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgICAgIFs5LCA0XSxcbiAgICAgICAgWzksIDVdLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ29jY3VwaWVkJyxcbiAgICAgIHBvc2l0aW9uczogW10sXG4gICAgfSxcbiAgXTtcblxuICBpbGxlZ2FsUG9zaXRpb25zWzEwXS5wb3NpdGlvbnMucHVzaChpbGxlZ2FsKTtcblxuICBjb25zdCBzaGlwID0gdHlwZTtcbiAgY29uc3QgYWxpZ24gPSBhbGlnbm1lbnQ7XG5cbiAgY29uc3QgY2hlY2tQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAvLyBjaGVjayBpZiBzZWxlY3RlZCBmaWVsZCBpcyBpbnNpZGUgdGhlIGdhbWUgZ3JpZFxuICAgIGNvbnN0IHNlbGVjdGVkRmllbGQgPSBwb3NpdGlvbjtcblxuICAgIC8vIHJlamVjdCBmaWVsZCBpZiBpdCBpcyBibGFja2xpc3RlZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWxsZWdhbFBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBpbGxlZ2FsUG9zaXRpb25zW2ldLnR5cGUgPT09IHNoaXAgJiZcbiAgICAgICAgaWxsZWdhbFBvc2l0aW9uc1tpXS5vcmllbnRhdGlvbiA9PT0gYWxpZ24gJiZcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoaWxsZWdhbFBvc2l0aW9uc1tpXS5wb3NpdGlvbnMpLmluY2x1ZGVzKHNlbGVjdGVkRmllbGQpXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2lsbGVnYWwnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlsbGVnYWxQb3NpdGlvbnNbMTBdLnBvc2l0aW9ucy5wdXNoKHNlbGVjdGVkRmllbGQpO1xuICAgIHJldHVybiBzZWxlY3RlZEZpZWxkO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBvc2l0aW9uID0gKCkgPT4ge1xuICAgIGxldCBsZW5ndGg7XG5cbiAgICBmbGVldC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS50eXBlID09PSBzaGlwKSB7XG4gICAgICAgIGxlbmd0aCA9IGl0ZW0ubGVuZ3RoO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlQ29vcmRpbmF0ZXMgPSAoKCkgPT4ge1xuICAgICAgLy8gY3JlYXRlcyB0aGUgY29vcmRpbmF0ZXMgb2YgYWxsIG5lZWRlZCBmaWVsZHMgZm9yIHNlbGVjdGVkIHNoaXAgb24gc2VsZWN0ZWQgZmllbGRcblxuICAgICAgLy8gcmV0dXJuIGlzIG5vIHZhbGlkIHBvc2l0aW9uIGlzIHJldHVybmVkIGZyb20gY2hlY2tQb3NpdGlvblxuICAgICAgaWYgKHZhbGlkQ29vcmRpbmF0ZXNbMF0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcG9zID0gWy4uLnZhbGlkQ29vcmRpbmF0ZXNbMF1dO1xuICAgICAgY29uc3QgYWRkaXRpb25hbENvb3JkaW5hdGVzID0gW107XG5cbiAgICAgIC8vIGdldCB0aGUgbnVtYmVyIGNvcnJlc3BvbmRpbmcgdG8gdGhlIFwiaG9yaXpvbnRhbFwiIGF4aXMgaW4gdGhlIGdhbWVib2FyZC1hcnJheVxuICAgICAgLy8gcmVwZWF0IFwibGVuZ3RoXCItdGltZXNcbiAgICAgIGlmIChhbGlnbm1lbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gYWRkIDEgdG8gdGhhdCBudW1iZXIgYW5kIHB1c2ggbmV3IGNvb3JkaW5hdGVzIHRvIGFkZGl0aW9uYWxDb29yZGluYXRlcy1hcnJheVxuICAgICAgICAgIGNvbnN0IGFkZGl0aW9uID0gcG9zWzFdICsgMTtcbiAgICAgICAgICBjb25zdCBhcnIgPSBwb3Muc3BsaWNlKDEsIDEsIGFkZGl0aW9uKTtcbiAgICAgICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMucHVzaChbcG9zWzBdLCBhcnJbMF1dKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhbGlnbm1lbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGFkZGl0aW9uID0gcG9zWzBdICsgMTtcbiAgICAgICAgICBjb25zdCBhcnIgPSBwb3Muc3BsaWNlKDAsIDEsIGFkZGl0aW9uKTtcbiAgICAgICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMucHVzaChbYXJyWzBdLCBwb3NbMV1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIGZpcnN0IGl0ZW0gdG8gcHJldmVudCBkdXBsaWNhdGUgY29vcmRpbmF0ZXNcbiAgICAgIGFkZGl0aW9uYWxDb29yZGluYXRlcy5zaGlmdCgpO1xuXG4gICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YWxpZENvb3JkaW5hdGVzLnB1c2goaXRlbSk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSWxsZWdhbFBvc2l0aW9ucyA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgbmVlZGVkIGZpZWxkcyBpcyBpbnNpZGUgdGhlIGJsYWNrbGlzdFxuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChKU09OLnN0cmluZ2lmeShib2FyZC5pbGxlZ2FsUG9zaXRpb25zKS5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtudWxsXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBhZGQgYWxsIG5lZWRlZCBmaWVsZHMgdG8gYmxhY2tsaXN0XG4gICAgaWYgKGNvb3JkaW5hdGVzICE9PSBudWxsKSB7XG4gICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGJvYXJkLmlsbGVnYWxQb3NpdGlvbnMucHVzaChpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSByZXR1cm47XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH07XG4gIHZhbGlkQ29vcmRpbmF0ZXMucHVzaChjaGVja1Bvc2l0aW9uKCkpO1xuICBjcmVhdGVQb3NpdGlvbigpO1xuICAvLyByZXR1cm4gdGhlIGlmIHRoZXkgcGFzc2VkIGFsbCBjaGVja3NcbiAgcmV0dXJuIGNoZWNrSWxsZWdhbFBvc2l0aW9ucyh2YWxpZENvb3JkaW5hdGVzKTtcbn07XG5cbmNvbnN0IHNldHVwQUkgPSAocEFJQm9hcmQpID0+IHtcbiAgY29uc3QgYWxpZ24gPSBbJ3ZlcnRpY2FsJywgJ2hvcml6b250YWwnXTtcbiAgY29uc3QgcmFuZG9tID0gKCkgPT4gYWxpZ25bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxpZ24ubGVuZ3RoKV07XG5cbiAgY29uc3QgcGxhY2VDYXJyaWVyID0gKCkgPT4ge1xuICAgIHBBSUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICdjYXJyaWVyJyxcbiAgICAgIDUsXG4gICAgICBnZXRDb29yZGluYXRlcygnY2FycmllcicsIHJhbmRvbSgpLCBnZXRSYW5kb21GaWVsZCgpLCBwQUlCb2FyZClcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHBBSUJvYXJkLm15RmxlZXQuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC50eXBlID09PSAnY2FycmllcicpID09PSBmYWxzZVxuICAgICkge1xuICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlQmF0dGxlc2hpcCA9ICgpID0+IHtcbiAgICBwQUlCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAnYmF0dGxlc2hpcCcsXG4gICAgICA0LFxuICAgICAgZ2V0Q29vcmRpbmF0ZXMoJ2JhdHRsZXNoaXAnLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ2JhdHRsZXNoaXAnKSA9PT1cbiAgICAgIGZhbHNlXG4gICAgKSB7XG4gICAgICBwbGFjZUJhdHRsZXNoaXAoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VDcnVpc2VyID0gKCkgPT4ge1xuICAgIHBBSUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICdjcnVpc2VyJyxcbiAgICAgIDMsXG4gICAgICBnZXRDb29yZGluYXRlcygnY3J1aXNlcicsIHJhbmRvbSgpLCBnZXRSYW5kb21GaWVsZCgpLCBwQUlCb2FyZClcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHBBSUJvYXJkLm15RmxlZXQuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC50eXBlID09PSAnY3J1aXNlcicpID09PSBmYWxzZVxuICAgICkge1xuICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlU3VibWFyaW5lID0gKCkgPT4ge1xuICAgIHBBSUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICdzdWJtYXJpbmUnLFxuICAgICAgMyxcbiAgICAgIGdldENvb3JkaW5hdGVzKCdzdWJtYXJpbmUnLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ3N1Ym1hcmluZScpID09PSBmYWxzZVxuICAgICkge1xuICAgICAgcGxhY2VTdWJtYXJpbmUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VEZXN0cm95ZXIgPSAoKSA9PiB7XG4gICAgcEFJQm9hcmQucGxhY2VTaGlwKFxuICAgICAgJ2Rlc3Ryb3llcicsXG4gICAgICAyLFxuICAgICAgZ2V0Q29vcmRpbmF0ZXMoJ2Rlc3Ryb3llcicsIHJhbmRvbSgpLCBnZXRSYW5kb21GaWVsZCgpLCBwQUlCb2FyZClcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHBBSUJvYXJkLm15RmxlZXQuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC50eXBlID09PSAnZGVzdHJveWVyJykgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICBwbGFjZURlc3Ryb3llcigpO1xuICAgIH1cbiAgfTtcblxuICBwbGFjZUNhcnJpZXIoKTtcbiAgcGxhY2VCYXR0bGVzaGlwKCk7XG4gIHBsYWNlQ3J1aXNlcigpO1xuICBwbGFjZVN1Ym1hcmluZSgpO1xuICBwbGFjZURlc3Ryb3llcigpO1xufTtcblxuZXhwb3J0IHsgZ2V0Q29vcmRpbmF0ZXMsIGdldFJhbmRvbUZpZWxkLCBzZXR1cEFJIH07XG4iLCJpbXBvcnQgcmVuZGVyQm9hcmQgZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgZ2V0Q29vcmRpbmF0ZXMgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBhY3RpdmF0ZVBsYWNlbWVudEJ1dHRvbnMgPSAocDFCb2FyZCwgcEFJQm9hcmQsIHBsYXllcjEsIHBsYXllckFJKSA9PiB7XG4gIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLWNvbnRhaW5lcicpO1xuICBjb25zdCBwMWluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDFpbmZvJyk7XG4gIGNvbnN0IGZsZWV0SGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGVldC1oZWFkaW5nJyk7XG4gIGNvbnN0IHBBSUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wQUktY29udGFpbmVyJyk7XG4gIGNvbnN0IGluZm9Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mb0NvbnRhaW5lcicpO1xuICBjb25zdCBhbGlnbm1lbnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxpZ25tZW50Jyk7XG4gIGNvbnN0IHAxRmxlZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucDEtZmxlZXQtd3JhcHBlcicpO1xuICBjb25zdCBjYXJyaWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnJpZXJCdXR0b24nKTtcbiAgY29uc3QgYmF0dGxlc2hpcEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXR0bGVzaGlwQnV0dG9uJyk7XG4gIGNvbnN0IGNydWlzZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3J1aXNlckJ1dHRvbicpO1xuICBjb25zdCBzdWJtYXJpbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWFyaW5lQnV0dG9uJyk7XG4gIGNvbnN0IGRlc3Ryb3llckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXN0cm95ZXJCdXR0b24nKTtcblxuICBpbmZvQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChhbGlnbm1lbnRCdG4uaW5uZXJUZXh0ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGFsaWdubWVudEJ0bi5pbm5lclRleHQgPSAndmVydGljYWwnO1xuICAgICAgaW5mb0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCd2ZXJ0Jyk7XG4gICAgfSBlbHNlIGlmIChhbGlnbm1lbnRCdG4uaW5uZXJUZXh0ID09PSAndmVydGljYWwnKSB7XG4gICAgICBhbGlnbm1lbnRCdG4uaW5uZXJUZXh0ID0gJ2hvcml6b250YWwnO1xuICAgICAgaW5mb0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCd2ZXJ0Jyk7XG4gICAgfVxuICB9KTtcblxuICBjYXJyaWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHJlbmRlckJvYXJkKHAxQm9hcmQsIHBBSUJvYXJkKTtcbiAgICBwbGFjZVBsYXllclNoaXBzKGNhcnJpZXJCdG4ucGFyZW50Tm9kZS5pZC50b0xvd2VyQ2FzZSgpLCA1LCBjYXJyaWVyQnRuKTtcbiAgfSk7XG5cbiAgYmF0dGxlc2hpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhcbiAgICAgIGJhdHRsZXNoaXBCdG4ucGFyZW50Tm9kZS5pZC50b0xvd2VyQ2FzZSgpLFxuICAgICAgNCxcbiAgICAgIGJhdHRsZXNoaXBCdG5cbiAgICApO1xuICB9KTtcblxuICBjcnVpc2VyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHJlbmRlckJvYXJkKHAxQm9hcmQsIHBBSUJvYXJkKTtcbiAgICBwbGFjZVBsYXllclNoaXBzKGNydWlzZXJCdG4ucGFyZW50Tm9kZS5pZC50b0xvd2VyQ2FzZSgpLCAzLCBjcnVpc2VyQnRuKTtcbiAgfSk7XG5cbiAgc3VibWFyaW5lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHJlbmRlckJvYXJkKHAxQm9hcmQsIHBBSUJvYXJkKTtcbiAgICBwbGFjZVBsYXllclNoaXBzKHN1Ym1hcmluZUJ0bi5wYXJlbnROb2RlLmlkLnRvTG93ZXJDYXNlKCksIDMsIHN1Ym1hcmluZUJ0bik7XG4gIH0pO1xuXG4gIGRlc3Ryb3llckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhkZXN0cm95ZXJCdG4ucGFyZW50Tm9kZS5pZC50b0xvd2VyQ2FzZSgpLCAyLCBkZXN0cm95ZXJCdG4pO1xuICB9KTtcblxuICBjb25zdCBwbGFjZVBsYXllclNoaXBzID0gKHNoaXBuYW1lLCBsZW5ndGgsIGJ0bikgPT4ge1xuICAgIHAxaW5mby5pbm5lclRleHQgPSBgUGxhY2UgeW91ciAke3NoaXBuYW1lfWA7XG4gICAgcDFpbmZvLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgY29uc3QgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpZWxkLXAxJyk7XG4gICAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICBjb25zdCB2ZXJ0ID0gcGFyc2VJbnQoZmllbGQuaWRbNl0pO1xuICAgICAgY29uc3QgaG9yaXogPSBwYXJzZUludChmaWVsZC5pZFtmaWVsZC5pZC5sZW5ndGggLSAxXSk7XG4gICAgICBjb25zdCBwb3MgPSBbdmVydCwgaG9yaXpdO1xuICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsaWduID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsaWdubWVudCcpLnRleHRDb250ZW50O1xuICAgICAgICBwMUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICBzaGlwbmFtZSxcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgZ2V0Q29vcmRpbmF0ZXMoc2hpcG5hbWUsIGFsaWduLCBwb3MsIHAxQm9hcmQpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHAxQm9hcmQubXlGbGVldC5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50LnR5cGUgPT09IHNoaXBuYW1lKSkge1xuICAgICAgICAgIHAxaW5mby5pbm5lclRleHQgPSAnRGVwbG95IHRoZSByZXN0IG9mIHlvdXIgZmxlZXQhJztcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NoaXBuYW1lfWApO1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGxhY2VkJyk7XG4gICAgICAgICAgcDFpbmZvLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ3VuYWJsZSB0byBwbGFjZSBoZXJlLiB0cnkgYWdhaW4hJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAxQm9hcmQubXlGbGVldC5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgICBwMWluZm8uaW5uZXJUZXh0ID0gJ1lvdXIgZmxlZXQnO1xuICAgICAgICAgIGluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgcEFJQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgIHAxRmxlZXQuY2xhc3NMaXN0LmFkZCgnZmxlZXQtc2V0Jyk7XG4gICAgICAgICAgYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmQtc2V0Jyk7XG4gICAgICAgICAgZmxlZXRIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyQm9hcmQocDFCb2FyZCwgcEFJQm9hcmQsIHBsYXllcjEsIHBsYXllckFJKTtcbiAgICAgIH0pO1xuXG4gICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIGhvdmVyRWZmZWN0KHBvcyk7XG4gICAgICB9KTtcbiAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBob3ZlckVmZmVjdChwb3MpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGhvdmVyRWZmZWN0KHBvcykge1xuICAgICAgICAvLyBnZXQgYWxsIGZpZWxkcyBjb3ZlcmVkIGJ5IGN1cnJlbnRseSBzZWxlY3RlZCBzaGlwIGluIHJlYWwgdGltZVxuICAgICAgICBjb25zdCBhbGlnbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGlnbm1lbnQnKS5pbm5lclRleHQ7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gWy4uLnBvc107XG4gICAgICAgIGNvbnN0IGNsYWltZWQgPSBbXTtcblxuICAgICAgICBpZiAoYWxpZ24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uID0gcG9zaXRpb25bMV0gKyAxO1xuICAgICAgICAgICAgY29uc3QgYXJyID0gcG9zaXRpb24uc3BsaWNlKDEsIDEsIGFkZGl0aW9uKTtcbiAgICAgICAgICAgIGNsYWltZWQucHVzaChbcG9zaXRpb25bMF0sIGFyclswXV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhbGlnbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uID0gcG9zaXRpb25bMF0gKyAxO1xuICAgICAgICAgICAgY29uc3QgYXJyID0gcG9zaXRpb24uc3BsaWNlKDAsIDEsIGFkZGl0aW9uKTtcbiAgICAgICAgICAgIGNsYWltZWQucHVzaChbYXJyWzBdLCBwb3NpdGlvblsxXV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbGFpbWVkLmxlbmd0aCA9IGxlbmd0aDtcblxuICAgICAgICBjbGFpbWVkLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCB2ZXJ0aWNhbCA9IGl0ZW1bMF07XG4gICAgICAgICAgY29uc3QgaG9yaXpvbnRhbCA9IGl0ZW1bMV07XG4gICAgICAgICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC1wMScpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3IoYCNwMS1yb3cke3ZlcnRpY2FsfWApO1xuICAgICAgICAgIGlmICh2ZXJ0aWNhbCA8PSA5ICYmIGhvcml6b250YWwgPD0gOSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHJvdy5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICBgI3AxLXJvdyR7dmVydGljYWx9LWZpZWxkJHtob3Jpem9udGFsfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2hvdmVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn07XG5cbmNvbnN0IGFjdGl2YXRlUmVzZXRCdXR0b24gPSAoKSA9PiB7XG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XG5cbiAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVwb3J0U3Vua1NoaXAgPSAoYm9hcmQpID0+IHtcbiAgYm9hcmQubXlGbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXAudHlwZSkuY2xhc3NMaXN0LmFkZCgnc3VuaycpO1xuICAgICAgLy8gZ2V0IHRoZSBjbG9zZXN0IC5mbGVldC1lbGVtZW50IHRvIHByZWZlbnQgaXQgZnJvbSBiZWluZyB0cmFuc2Zvcm1lZCB3aGVuIHNoaXAgaXMgc3Vua1xuICAgICAgY29uc3QgY2xvc2VzdEVsZW1lbnQgPSBkb2N1bWVudFxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoc2hpcC50eXBlKVxuICAgICAgICAuY2xvc2VzdCgnLmZsZWV0Jyk7XG4gICAgICBjbG9zZXN0RWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGdhbWVPdmVyID0gKGxvc2VySUQpID0+IHtcbiAgaWYgKGxvc2VySUQgPT09ICdQbGF5ZXIxJykge1xuICAgIGxvc2VySUQgPSAnWW91IHdlcmUnO1xuICB9XG4gIGlmIChsb3NlcklEID09PSAnUGxheWVyMicpIHtcbiAgICBsb3NlcklEID0gJ0FJIHdhcyc7XG4gIH1cblxuICBjb25zdCBtb2RhbEJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcblxuICBmdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgICBpZiAobW9kYWwgPT0gbnVsbCkgcmV0dXJuO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH1cbiAgb3Blbk1vZGFsKG1vZGFsKTtcbiAgbW9kYWxCb2R5LnRleHRDb250ZW50ID0gYCR7bG9zZXJJRH0gZGVmZWF0ZWQuIFxuICBUaGVyZSBhcmUgbm8gd2lubmVycyBpbiB3YXIhIGA7XG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0QnRuTW9kYWwnKTtcblxuICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQge1xuICBhY3RpdmF0ZVBsYWNlbWVudEJ1dHRvbnMsXG4gIGFjdGl2YXRlUmVzZXRCdXR0b24sXG4gIHJlcG9ydFN1bmtTaGlwLFxuICBnYW1lT3Zlcixcbn07XG4iLCJpbXBvcnQgeyBib2FyZHMgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IHBsYXllcnMgPSBbXTtcblxuY29uc3QgcGxheWVyRmFjdG9yeSA9IChuYW1lLCBpc0FJKSA9PiB7XG4gIGlmIChpc0FJID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnUGxheWVyMicsXG4gICAgICBuYW1lLFxuICAgICAgaXNBSSxcbiAgICAgIGlzQWN0aXZlOiBmYWxzZSxcblxuICAgICAgZ2V0UmFuZG9tUG9zaXRpb24oKSB7XG4gICAgICAgIGxldCByYW5kb21Ib3JpdG9udGFsO1xuICAgICAgICBsZXQgcmFuZG9tVmVydGljYWw7XG4gICAgICAgIGNvbnN0IHJhbmRvbVBvc2l0aW9uID0gW107XG5cbiAgICAgICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaWQgIT09IGJvYXJkLmlkKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21BcnJheSA9IGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gICAgICAgICAgICBjb25zdCByYW5kb21PYmplY3QgPSByYW5kb21BcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xuICAgICAgICAgICAgcmFuZG9tVmVydGljYWwgPSByYW5kb21PYmplY3QudmVydGljYWw7XG4gICAgICAgICAgICByYW5kb21Ib3JpdG9udGFsID0gcmFuZG9tT2JqZWN0Lmhvcml6b250YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmFuZG9tUG9zaXRpb24ucHVzaChyYW5kb21WZXJ0aWNhbCk7XG4gICAgICAgIHJhbmRvbVBvc2l0aW9uLnB1c2gocmFuZG9tSG9yaXRvbnRhbCk7XG5cbiAgICAgICAgcmV0dXJuIHJhbmRvbVBvc2l0aW9uO1xuICAgICAgfSxcblxuICAgICAgdmFsaWRhdGVQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBjaGVja2VkID0gcG9zaXRpb247XG4gICAgICAgIGNvbnN0IHZlcnQgPSBwb3NpdGlvblswXTtcbiAgICAgICAgY29uc3QgaG9yaXogPSBwb3NpdGlvblsxXTtcbiAgICAgICAgLy8gY2hlY2sgaWYgcG9zaXR0aW9uICB3YXMgYWxyZWR5IGhpdFxuICAgICAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pZCAhPT0gYm9hcmQuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gYm9hcmRbdmVydF0uZmluZChcbiAgICAgICAgICAgICAgKHsgaG9yaXpvbnRhbCB9KSA9PiBob3Jpem9udGFsID09PSBob3JpelxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChmaWVsZC5oaXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGNoZWNrZWQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmllbGQuaGl0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQb3NpdGlvbih0aGlzLmdldFJhbmRvbVBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBhdHRhY2socG9zaXRpb24pIHtcbiAgICAgICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaWQgIT09IGJvYXJkLmlkKSB7XG4gICAgICAgICAgICBib2FyZC5yZWNpZXZlQXR0YWNrKHBvc2l0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzd2l0Y2ggYWN0aXZlIHBsYXllclxuICAgICAgICBwbGF5ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pZCAhPT0gaXRlbS5pZCkge1xuICAgICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGlkOiAnUGxheWVyMScsXG4gICAgbmFtZSxcbiAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICBhdHRhY2socG9zaXRpb24pIHtcbiAgICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pZCAhPT0gYm9hcmQuaWQpIHtcbiAgICAgICAgICBib2FyZC5yZWNpZXZlQXR0YWNrKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBzd2l0Y2ggYWN0aXZlIHBsYXllclxuICAgICAgcGxheWVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgICAgaXRlbS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWQgIT09IGl0ZW0uaWQpIHtcbiAgICAgICAgICBpdGVtLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IHR1cm5BSSA9IChwQUkpID0+IHtcbiAgY29uc3QgYXR0YWNrID0gcEFJLnZhbGlkYXRlUG9zaXRpb24ocEFJLmdldFJhbmRvbVBvc2l0aW9uKCkpO1xuXG4gIHJldHVybiBwQUk7XG59O1xuXG5leHBvcnQgeyBwbGF5ZXJGYWN0b3J5LCBwbGF5ZXJzLCB0dXJuQUkgfTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKHR5cGUsIGxlbmd0aCwgY29vcmRpbmF0ZXMpID0+ICh7XG4gIHR5cGUsXG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMsXG4gIGhpdGJveDogW10sXG4gIGhpdChwb3NpdGlvbikge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLmNvb3JkaW5hdGVzKS5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgIHRoaXMuaGl0Ym94LnB1c2gocG9zaXRpb24pO1xuICAgIH1cbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiAhIShcbiAgICAgIHRoaXMuaGl0Ym94Lmxlbmd0aCA+PSAwICYmIHRoaXMuaGl0Ym94Lmxlbmd0aCA+PSB0aGlzLmNvb3JkaW5hdGVzLmxlbmd0aFxuICAgICk7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgc2hpcEZhY3RvcnkgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFFLE1BQU07QUFDM0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxpQ0FBaUMsRUFBRSxNQUFNO0FBQzNDOztBQUVBOztFQUVFOztBQUVGOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0U7O0FBRUY7OztFQUdFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7Ozs7O0VBS0Usb0JBQW9CLEVBQUUsTUFBTTtFQUM1QixlQUFlLEVBQUUsTUFBTTtFQUN2QixpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLFNBQVMsRUFBRSxNQUFNO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjtRQUNRLE1BQU07RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1NBQ1MsTUFBTTtFQUNiLG9CQUFvQjtBQUN0Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDBCQUEwQjtBQUM1Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSw4QkFBOEI7QUFDaEM7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7Ozs7O0VBS0U7O0FBRUY7RUFDRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLG1CQUFtQixFQUFFLE1BQU07QUFDN0I7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLFVBQVUsRUFBRSxNQUFNO0FBQ3BCOztBQUVBOztFQUVFOztBQUVGOztFQUVFLFlBQVk7QUFDZDs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSw2QkFBNkIsRUFBRSxNQUFNO0VBQ3JDLG9CQUFvQixFQUFFLE1BQU07QUFDOUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxhQUFhLEVBQUUsTUFBTTtBQUN2Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCwxMDA7MCwyMDA7MCwzMDA7MCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MCw4MDA7MCw5MDA7MSwxMDA7MSwyMDA7MSwzMDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDA7MSw4MDA7MSw5MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3BlbitTYW5zJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIHJlc2V0IHN0eWxlcyAqL1xcbioge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnM7XFxufVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5pbWcge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ucm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbn1cXG5cXG4uanVzdGlmeS1jZW50ZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5hbGlnbi1jZW50ZXIge1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDApIHtcXG5cXG4gIC5jb2wtMTIteHMge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcXG5cXG4gIC5jb2wtNS1zbSB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGZsZXgtZ3JvdzogMDtcXG4gICAgd2lkdGg6IDQxLjY2NjY2NjY2NjclO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuXFxuICAuY29sLTIteGwge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiAxNi42NjY2NjY2NjY3JTtcXG4gIH1cXG59XFxuLnRleHQtcHJpbWFyeSB7XFxuICBjb2xvcjogIzA3Njg5ZjtcXG59XFxuXFxuLnRleHQtd2hpdGUge1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uY2FyZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm94LXNoYWRvdzogMXB4IDNweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbn1cXG4uY2FyZCAuY2FyZC10aXRsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuNzVyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGJvcmRlci1yYWRpdXM6IDBweDtcXG59XFxuXFxuLmJ0bi1wcmltYXJ5IHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA3Njg5ZjtcXG59XFxuLmJ0bi1wcmltYXJ5OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwODc4Yjc7XFxufVxcblxcbi5idG4tZXJyb3Ige1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyOiAwO1xcbiAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjg0MDVlO1xcbn1cXG4uYnRuLWVycm9yOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjMjUwNmM7XFxufVxcblxcbi5wLTEge1xcbiAgcGFkZGluZzogMC43NXJlbTtcXG59XFxuXFxuLnAtMiB7XFxuICBwYWRkaW5nOiAxLjVyZW07XFxufVxcblxcbi5tLTEge1xcbiAgbWFyZ2luOiAwLjc1cmVtO1xcbn1cXG5cXG4ubS0yIHtcXG4gIG1hcmdpbjogMS41cmVtO1xcbn1cXG5cXG4ubXQtMiB7XFxuICBtYXJnaW4tdG9wOiAxLjVyZW07XFxufVxcblxcbi5tYi0yIHtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcXG59XFxuXFxuLmZkLWMge1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQ0EsaUJBQWlCO0FBRWpCO0VBQ0UsY0FBYztFQUNkLFNBQVM7QUFDWDs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFO0lBQ0Usc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixXQUFXO0VBQ2I7QUFDRjtBQUNBOztFQUVFO0lBQ0Usc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixxQkFBcUI7RUFDdkI7QUFDRjtBQUNBOztFQUVFO0lBQ0Usc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixxQkFBcUI7RUFDdkI7QUFDRjtBQUNBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLDBDQUEwQztBQUM1QztBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YscUJBQXFCO0VBQ3JCLFNBQVM7RUFDVCx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBOzs7RUFHRSxzQkFBc0I7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGluczppdGFsLHdnaHRAMCwxMDA7MCwyMDA7MCwzMDA7MCw0MDA7MCw1MDA7MCw2MDA7MCw3MDA7MCw4MDA7MCw5MDA7MSwxMDA7MSwyMDA7MSwzMDA7MSw0MDA7MSw1MDA7MSw2MDA7MSw3MDA7MSw4MDA7MSw5MDAmZGlzcGxheT1zd2FwXFxcIik7XFxuLyogcmVzZXQgc3R5bGVzICovXFxuQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3BlbitTYW5zJmRpc3BsYXk9c3dhcFxcXCIpO1xcbioge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnM7XFxufVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5pbWcge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ucm93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbn1cXG5cXG4uanVzdGlmeS1jZW50ZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5hbGlnbi1jZW50ZXIge1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDApIHtcXG5cXG4gIC5jb2wtMTIteHMge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcXG5cXG4gIC5jb2wtNS1zbSB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGZsZXgtZ3JvdzogMDtcXG4gICAgd2lkdGg6IDQxLjY2NjY2NjY2NjclO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuXFxuICAuY29sLTIteGwge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiAxNi42NjY2NjY2NjY3JTtcXG4gIH1cXG59XFxuLnRleHQtcHJpbWFyeSB7XFxuICBjb2xvcjogIzA3Njg5ZjtcXG59XFxuXFxuLnRleHQtd2hpdGUge1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uY2FyZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm94LXNoYWRvdzogMXB4IDNweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbn1cXG4uY2FyZCAuY2FyZC10aXRsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuNzVyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGJvcmRlci1yYWRpdXM6IDBweDtcXG59XFxuXFxuLmJ0bi1wcmltYXJ5IHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA3Njg5ZjtcXG59XFxuLmJ0bi1wcmltYXJ5OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwODc4Yjc7XFxufVxcblxcbi5idG4tZXJyb3Ige1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyOiAwO1xcbiAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjg0MDVlO1xcbn1cXG4uYnRuLWVycm9yOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjMjUwNmM7XFxufVxcblxcbi5wLTEge1xcbiAgcGFkZGluZzogMC43NXJlbTtcXG59XFxuXFxuLnAtMiB7XFxuICBwYWRkaW5nOiAxLjVyZW07XFxufVxcblxcbi5tLTEge1xcbiAgbWFyZ2luOiAwLjc1cmVtO1xcbn1cXG5cXG4ubS0yIHtcXG4gIG1hcmdpbjogMS41cmVtO1xcbn1cXG5cXG4ubXQtMiB7XFxuICBtYXJnaW4tdG9wOiAxLjVyZW07XFxufVxcblxcbi5tYi0yIHtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcXG59XFxuXFxuLmZkLWMge1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjZjRmOWY5O1xcbiAgLS1wbGF5ZXJCb2FyZDogI2JhZDdkZjtcXG4gIC0tQUlib2FyZDogI2ZmZTJlMjtcXG4gIC0tZmxlZXQ6ICMwNzY3OWY1ZTtcXG4gIC0tc3VuazogI2Q4MjE0ODtcXG4gIC0taGl0OiAjMTJjYzk0O1xcbiAgLS1taXNzOiAjZTIzZTU3O1xcbiAgLS1ob3ZlcjogI2M0MDg4NWQ3O1xcbiAgLS1zaGlwOiAjMDc2ODlmO1xcbiAgLS1hbGlnbjogIzA3Njg5ZjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWYsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCxcXG4gICAgJ1NlZ29lIFVJJywgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCAnQXBwbGUgQ29sb3IgRW1vamknLFxcbiAgICAnU2Vnb2UgVUkgRW1vamknLCAnU2Vnb2UgVUkgU3ltYm9sJztcXG59XFxuXFxuaW1nIHtcXG4gIG1heC13aWR0aDogYXV0bztcXG4gIGhlaWdodDogNXJlbTtcXG59XFxuXFxuLmhlYWRpbmcge1xcbiAgdHJhbnNpdGlvbjogYWxsIDE1MG1zIGVhc2UtaW47XFxufVxcblxcbi5pbmZvLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIG1heC13aWR0aDogMTAwdnc7XFxufVxcblxcbi5yZXNldCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufVxcblxcbi5nYW1lLWdyaWQge1xcbiAgd2lkdGg6IDUwdnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuXFxuLmdyaWQtcDEsXFxuLmdyaWQtcEFJIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGhlaWdodDogMzAwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5ncmlkLXAxOmhvdmVyLFxcbi5ncmlkLXBBSTpob3ZlciB7XFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXG59XFxuXFxuLnJvdy1wMSxcXG4ucm93LXBBSSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5maWVsZC1wMSxcXG4uZmllbGQtcEFJIHtcXG4gIGJvcmRlcjogZGFzaGVkIDFweCBibGFjaztcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4uZmllbGQtcDEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGxheWVyQm9hcmQpO1xcbn1cXG5cXG4uZmllbGQtcEFJIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLUFJYm9hcmQpO1xcbn1cXG5cXG4uZmllbGQtcDE6aG92ZXIsXFxuLmZpZWxkLXBBSTpob3ZlciB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3MoMTI1JSk7XFxufVxcblxcbi5wMS1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXApO1xcbn1cXG5cXG4ucGxhY2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZsZWV0KTtcXG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcyBsaW5lYXI7XFxuICBhbmltYXRpb246IHB1bHNlIDVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLnN1bmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3Vuayk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTAwMG1zIGxpbmVhcjtcXG59XFxuXFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWlzcyk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpdCk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uaW5mby1jb250YWluZXIge1xcbiAgaGVpZ2h0OiAxNXZoO1xcbiAgd2lkdGg6IDE1dmg7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIGJvcmRlcjogc29saWQgMXB4IGJsYWNrO1xcbiAgdHJhbnNpdGlvbjogYWxsIDE1MG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uYWxpZ25tZW50LWljb24taG9yaXoge1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hbGlnbik7XFxufVxcblxcbi52ZXJ0IHtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluLW91dDtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuXFxuLmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyKTtcXG59XFxuXFxuLmZpcmUge1xcbiAgdHJhbnNpdGlvbjogYWxsIDc1bXMgZWFzZS1pbi1vdXQ7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEyNSUpO1xcbn1cXG5cXG4uc2VsZWN0ZWQge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDE1MG1zIGxpbmVhcjtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKTtcXG4gIGJvcmRlcjogc29saWQgMnB4IGJsYWNrO1xcbiAgei1pbmRleDogMTA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kKTtcXG4gIHdpZHRoOiA1MDBweDtcXG4gIG1heC13aWR0aDogODAlO1xcbn1cXG5cXG4ubW9kYWwuYWN0aXZlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpO1xcbn1cXG5cXG4ubW9kYWwtaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZmxlZXQpO1xcbn1cXG5cXG4ubW9kYWwtaGVhZGVyIC50aXRsZSB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLm1vZGFsLWJvZHkge1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiNvdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIG9wYWNpdHk6IDA7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNjkyKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbiNvdmVybGF5LmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIFxcXCJwdWxzZVxcXCIge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDJkZWcpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xcbiAgLmJvYXJkLXNldCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDQwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICB9XFxuICAuZmxlZXQtc2V0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDByZW07XFxuICAgIHJpZ2h0OiAtMjByZW07XFxuICAgIHRyYW5zaXRpb246IGFsbCA1MG1zIGxpbmVhcjtcXG4gIH1cXG5cXG4gIC5mbGVldC1zZXQgPiAucDEtZmxlZXQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG5cXG4gIC5mbGVldC1zZXQgPiAucDEtZmxlZXQtY29udGFpbmVyID4gLmZsZWV0IHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcXG4gIC5oZWFkaW5nIHtcXG4gICAgZm9udC1zaXplOiBtZWRpdW07XFxuICAgIG1hcmdpbi10b3A6IDFyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBOzs7RUFHRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULG1DQUFtQztFQUNuQzs7dUNBRXFDO0FBQ3ZDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7QUFD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I2Y0ZjlmOTtcXG4gIC0tcGxheWVyQm9hcmQ6ICNiYWQ3ZGY7XFxuICAtLUFJYm9hcmQ6ICNmZmUyZTI7XFxuICAtLWZsZWV0OiAjMDc2NzlmNWU7XFxuICAtLXN1bms6ICNkODIxNDg7XFxuICAtLWhpdDogIzEyY2M5NDtcXG4gIC0tbWlzczogI2UyM2U1NztcXG4gIC0taG92ZXI6ICNjNDA4ODVkNztcXG4gIC0tc2hpcDogIzA3Njg5ZjtcXG4gIC0tYWxpZ246ICMwNzY4OWY7XFxufVxcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsXFxuICAgICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJyxcXG4gICAgJ1NlZ29lIFVJIEVtb2ppJywgJ1NlZ29lIFVJIFN5bWJvbCc7XFxufVxcblxcbmltZyB7XFxuICBtYXgtd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IDVyZW07XFxufVxcblxcbi5oZWFkaW5nIHtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluO1xcbn1cXG5cXG4uaW5mby1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ucmVzZXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG5cXG4uZ2FtZS1ncmlkIHtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbi5ncmlkLXAxLFxcbi5ncmlkLXBBSSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZC1wMTpob3ZlcixcXG4uZ3JpZC1wQUk6aG92ZXIge1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5yb3ctcDEsXFxuLnJvdy1wQUkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZmllbGQtcDEsXFxuLmZpZWxkLXBBSSB7XFxuICBib3JkZXI6IGRhc2hlZCAxcHggYmxhY2s7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmZpZWxkLXAxIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllckJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXBBSSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1BSWJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXAxOmhvdmVyLFxcbi5maWVsZC1wQUk6aG92ZXIge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDEyNSUpO1xcbn1cXG5cXG4ucDEtc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwKTtcXG59XFxuXFxuLnBsYWNlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mbGVldCk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyO1xcbiAgYW5pbWF0aW9uOiBwdWxzZSA1cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1bmspO1xcbiAgdHJhbnNpdGlvbjogYWxsIDEwMDBtcyBsaW5lYXI7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1pc3MpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaXQpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGhlaWdodDogMTV2aDtcXG4gIHdpZHRoOiAxNXZoO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmFsaWdubWVudC1pY29uLWhvcml6IHtcXG4gIGhlaWdodDogMXJlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWxpZ24pO1xcbn1cXG5cXG4udmVydCB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTUwbXMgZWFzZS1pbi1vdXQ7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcblxcbi5ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlcik7XFxufVxcblxcbi5maXJlIHtcXG4gIHRyYW5zaXRpb246IGFsbCA3NW1zIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxMjUlKTtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBsaW5lYXI7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLm1vZGFsIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCk7XFxuICBib3JkZXI6IHNvbGlkIDJweCBibGFjaztcXG4gIHotaW5kZXg6IDEwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7XFxuICB3aWR0aDogNTAwcHg7XFxuICBtYXgtd2lkdGg6IDgwJTtcXG59XFxuXFxuLm1vZGFsLmFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcXG59XFxuXFxuLm1vZGFsLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZsZWV0KTtcXG59XFxuXFxuLm1vZGFsLWhlYWRlciAudGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5tb2RhbC1ib2R5IHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jb3ZlcmxheSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBvcGFjaXR5OiAwO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjY5Mik7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRyYW5zaXRpb246IDIwMG1zIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4jb3ZlcmxheS5hY3RpdmUge1xcbiAgb3BhY2l0eTogMTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBcXFwicHVsc2VcXFwiIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZyk7XFxuICB9XFxuICA1MCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyZGVnKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDI0cHgpIHtcXG4gIC5ib2FyZC1zZXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA0MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgfVxcbiAgLmZsZWV0LXNldCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwcmVtO1xcbiAgICByaWdodDogLTIwcmVtO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgNTBtcyBsaW5lYXI7XFxuICB9XFxuXFxuICAuZmxlZXQtc2V0ID4gLnAxLWZsZWV0LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAuZmxlZXQtc2V0ID4gLnAxLWZsZWV0LWNvbnRhaW5lciA+IC5mbGVldCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XFxuICAuaGVhZGluZyB7XFxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcyc7XG5pbXBvcnQgJ25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0IHsgcnVuR2FtZSB9IGZyb20gJy4vbW9kdWxlcy9nYW1lJztcblxucnVuR2FtZSgpO1xuIl0sIm5hbWVzIjpbImdhbWVvdmVyQ2hlY2siLCJyZXBvcnRTdW5rU2hpcCIsInR1cm5BSSIsInJlbmRlckJvYXJkIiwicDFCb2FyZCIsInBBSUJvYXJkIiwicGxheWVyMSIsInBsYXllckFJIiwicDFib2FyZCIsInBBSWJvYXJkIiwicDEiLCJwQUkiLCJwMUdyaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicEFJR3JpZCIsImNyZWF0ZUdyaWRzIiwiaW5uZXJIVE1MIiwiaSIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImZvckVhY2giLCJlbGVtZW50IiwiaiIsImZpZWxkIiwib2NjdXBpZWQiLCJoaXQiLCJpbm5lclRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwidmVydCIsInZlcnRpY2FsIiwiaG9yaXoiLCJob3Jpem9udGFsIiwiYXR0YWNrIiwic2hpcEZpcmVFZmZlY3QiLCJ0dXJuIiwicGFyZW50U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwiY2hpbGRFbGVtZW50Q291bnQiLCJjaGlsZCIsImNsb3Nlc3RFbGVtZW50IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiY29udGFpbnMiLCJib2FyZHMiLCJnYW1lYm9hcmRGYWN0b3J5Iiwic2V0dXBBSSIsImFjdGl2YXRlUGxhY2VtZW50QnV0dG9ucyIsImFjdGl2YXRlUmVzZXRCdXR0b24iLCJnYW1lT3ZlciIsInBsYXllckZhY3RvcnkiLCJwbGF5ZXJzIiwicnVuR2FtZSIsImlkIiwicHVzaCIsImJvYXJkIiwiYWxsQXJlVHJ1ZSIsIm15RmxlZXQiLCJldmVyeSIsInNoaXAiLCJpc1N1bmsiLCJjb25zb2xlIiwibG9nIiwic2hpcEZhY3RvcnkiLCJnYW1lYm9hcmQiLCJ1bmRlZmluZWQiLCJwbGFjZVNoaXAiLCJ0eXBlIiwibGVuZ3RoIiwiY29vcmRpbmF0ZXMiLCJwb3NpdGlvbiIsIml0ZW0iLCJmaW5kIiwicmVjaWV2ZUF0dGFjayIsIm9iamVjdCIsImFycmF5IiwiSlNPTiIsInN0cmluZ2lmeSIsImlsbGVnYWxQb3NpdGlvbnMiLCJjb2xzIiwicm93cyIsImdldFJhbmRvbUZpZWxkIiwicmFuZG9tSG9yaXRvbnRhbCIsInJhbmRvbVZlcnRpY2FsIiwicmFuZG9tUG9zaXRpb24iLCJyYW5kb21BcnJheSIsInJhbmRvbU9iamVjdCIsImdldENvb3JkaW5hdGVzIiwiYWxpZ25tZW50IiwiaWxsZWdhbCIsInZhbGlkQ29vcmRpbmF0ZXMiLCJmbGVldCIsIm9yaWVudGF0aW9uIiwicG9zaXRpb25zIiwiYWxpZ24iLCJjaGVja1Bvc2l0aW9uIiwic2VsZWN0ZWRGaWVsZCIsImluY2x1ZGVzIiwiY3JlYXRlUG9zaXRpb24iLCJjcmVhdGVDb29yZGluYXRlcyIsInBvcyIsImFkZGl0aW9uYWxDb29yZGluYXRlcyIsImFkZGl0aW9uIiwiYXJyIiwic3BsaWNlIiwic2hpZnQiLCJjaGVja0lsbGVnYWxQb3NpdGlvbnMiLCJwbGFjZUNhcnJpZXIiLCJzb21lIiwicGxhY2VCYXR0bGVzaGlwIiwicGxhY2VDcnVpc2VyIiwicGxhY2VTdWJtYXJpbmUiLCJwbGFjZURlc3Ryb3llciIsImJvYXJkQ29udGFpbmVyIiwicDFpbmZvIiwiZmxlZXRIZWFkaW5nIiwicEFJQ29udGFpbmVyIiwiaW5mb0NvbnRhaW5lciIsImFsaWdubWVudEJ0biIsInAxRmxlZXQiLCJjYXJyaWVyQnRuIiwiYmF0dGxlc2hpcEJ0biIsImNydWlzZXJCdG4iLCJzdWJtYXJpbmVCdG4iLCJkZXN0cm95ZXJCdG4iLCJ0b2dnbGUiLCJwbGFjZVBsYXllclNoaXBzIiwicGFyZW50Tm9kZSIsInRvTG93ZXJDYXNlIiwic2hpcG5hbWUiLCJidG4iLCJmaWVsZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFyc2VJbnQiLCJ0ZXh0Q29udGVudCIsImFsZXJ0IiwiaG92ZXJFZmZlY3QiLCJjbGFpbWVkIiwicmVzZXRCdG4iLCJsb2NhdGlvbiIsInJlbG9hZCIsImNsb3Nlc3QiLCJzdHlsZSIsInRyYW5zZm9ybSIsImxvc2VySUQiLCJtb2RhbEJvZHkiLCJvdmVybGF5Iiwib3Blbk1vZGFsIiwibW9kYWwiLCJuYW1lIiwiaXNBSSIsImlzQWN0aXZlIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ2YWxpZGF0ZVBvc2l0aW9uIiwiY2hlY2tlZCIsImhpdGJveCJdLCJzb3VyY2VSb290IjoiIn0=