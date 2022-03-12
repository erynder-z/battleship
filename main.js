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

          var parentSelector = document.querySelector('.p1-fleet-container');
          var random = Math.floor(1 + Math.random() * parentSelector.childElementCount);
          var child = document.querySelector(".p1-fleet-container>div:nth-child(".concat(random, ")"));

          if (child) {
            child.classList.add('fire');
            setTimeout(function () {
              child.classList.remove('fire');
            }, 100);
          }

          if (field.classList.contains('miss') === false && field.classList.contains('hit') === false) {
            (0,_game__WEBPACK_IMPORTED_MODULE_0__.gameoverCheck)(p1Board);
            (0,_player__WEBPACK_IMPORTED_MODULE_2__.turnAI)(pAI);
            (0,_interface__WEBPACK_IMPORTED_MODULE_1__.reportSunkShip)(p1Board);
            (0,_game__WEBPACK_IMPORTED_MODULE_0__.gameoverCheck)(pAIBoard);
            renderBoard(p1Board, pAIBoard, p1, pAI);
          }

          if (element.occupied === true) {
            field.classList.add('hit');
          } else {
            field.classList.add('miss');
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
  var gameover = false;
  p1Board.id = 'player1';
  pAIBoard.id = 'player2';
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.boards.push(p1Board);
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.boards.push(pAIBoard);
  _player__WEBPACK_IMPORTED_MODULE_4__.players.push(player1);
  _player__WEBPACK_IMPORTED_MODULE_4__.players.push(playerAI);
  (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.setupAI)(pAIBoard);
  /* console.log(player1);
  console.log(playerAI);
  console.log(p1Board);
  console.log(pAIBoard); */

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
  var illegalPositions = [{
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
  var align = alignment; // horizotal or vertical

  var checkPosition = function checkPosition() {
    var selectedField = position; // [0, 1]
    // check of selected field is inside the game grid

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
    coordinates.forEach(function (item) {
      if (JSON.stringify(board.illegalPositions).includes(item)) {
        coordinates = [null];
      }
    });

    if (coordinates !== null) {
      coordinates.forEach(function (item) {
        board.illegalPositions.push(item);
      });
    } else return;

    return coordinates;
  };

  validCoordinates.push(checkPosition());
  createPosition();
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
/* harmony export */   "reportSunkShip": () => (/* binding */ reportSunkShip)
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
    /* placePlayerShips(destroyerBtn.innerText.toLowerCase(), 2, destroyerBtn); */

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
      id: 'player2',
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

        // attack enemy gameboard
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
    id: 'player1',
    name: name,
    isActive: true,
    attack: function attack(position) {
      var _this4 = this;

      // attack enemy gameboard
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
___CSS_LOADER_EXPORT___.push([module.id, "/* reset styles */\n* {\n  color: inherit;\n  margin: 0;\n}\n\nbody {\n  font-family: Poppins;\n}\n\nimg {\n  max-width: 100%;\n}\n\n.row {\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.align-center {\n  align-items: center;\n}\n\n@media (min-width: 0) {\n\n  .col-12-xs {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 100%;\n  }\n}\n@media (min-width: 480px) {\n\n  .col-5-sm {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 41.6666666667%;\n  }\n}\n@media (min-width: 1200px) {\n\n  .col-2-xl {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 16.6666666667%;\n  }\n}\n\n.text-white {\n  color: white;\n}\n\n.card {\n  display: block;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);\n}\n.card .card-title {\n  display: flex;\n  align-items: center;\n  font-size: 1.5rem;\n  padding-bottom: 0.75rem;\n  font-weight: bold;\n  border-radius: 0px;\n}\n\n.btn-primary {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #07689f;\n}\n.btn-primary:hover {\n  background-color: #0878b7;\n}\n\n.btn-error {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #b8405e;\n}\n.btn-error:hover {\n  background-color: #c2506c;\n}\n\n.p-1 {\n  padding: 0.75rem;\n}\n\n.m-1 {\n  margin: 0.75rem;\n}\n\n.m-2 {\n  margin: 1.5rem;\n}\n\n.mt-2 {\n  margin-top: 1.5rem;\n}\n\n.mb-2 {\n  margin-bottom: 1.5rem;\n}\n\n.fd-c {\n  flex-direction: column;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"AACA,iBAAiB;AAEjB;EACE,cAAc;EACd,SAAS;AACX;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;;EAEE;IACE,sBAAsB;IACtB,YAAY;IACZ,WAAW;EACb;AACF;AACA;;EAEE;IACE,sBAAsB;IACtB,YAAY;IACZ,qBAAqB;EACvB;AACF;AACA;;EAEE;IACE,sBAAsB;IACtB,YAAY;IACZ,qBAAqB;EACvB;AACF;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,sBAAsB;EACtB,0CAA0C;AAC5C;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,qBAAqB;EACrB,SAAS;EACT,uBAAuB;EACvB,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,qBAAqB;EACrB,SAAS;EACT,uBAAuB;EACvB,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;;;EAGE,sBAAsB;AACxB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap\");\n/* reset styles */\n@import url(\"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap\");\n* {\n  color: inherit;\n  margin: 0;\n}\n\nbody {\n  font-family: Poppins;\n}\n\nimg {\n  max-width: 100%;\n}\n\n.row {\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.align-center {\n  align-items: center;\n}\n\n@media (min-width: 0) {\n\n  .col-12-xs {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 100%;\n  }\n}\n@media (min-width: 480px) {\n\n  .col-5-sm {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 41.6666666667%;\n  }\n}\n@media (min-width: 1200px) {\n\n  .col-2-xl {\n    box-sizing: border-box;\n    flex-grow: 0;\n    width: 16.6666666667%;\n  }\n}\n\n.text-white {\n  color: white;\n}\n\n.card {\n  display: block;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);\n}\n.card .card-title {\n  display: flex;\n  align-items: center;\n  font-size: 1.5rem;\n  padding-bottom: 0.75rem;\n  font-weight: bold;\n  border-radius: 0px;\n}\n\n.btn-primary {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #07689f;\n}\n.btn-primary:hover {\n  background-color: #0878b7;\n}\n\n.btn-error {\n  text-decoration: none;\n  cursor: pointer;\n  display: inline-block;\n  border: 0;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0px;\n  background-color: #b8405e;\n}\n.btn-error:hover {\n  background-color: #c2506c;\n}\n\n.p-1 {\n  padding: 0.75rem;\n}\n\n.m-1 {\n  margin: 0.75rem;\n}\n\n.m-2 {\n  margin: 1.5rem;\n}\n\n.mt-2 {\n  margin-top: 1.5rem;\n}\n\n.mb-2 {\n  margin-bottom: 1.5rem;\n}\n\n.fd-c {\n  flex-direction: column;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --background: #f4f9f9;\n  --playerBoard: #bad7df;\n  --AIboard: #ffe2e2;\n  --fleet: #07679f5e;\n  --sunk: #d82148;\n  --hit: #12cc94;\n  --miss: #e23e57;\n  --hover: #c40885d7;\n  --ship: #07689f;\n  --align: #07689f;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n  /* height: 100vh; */\n  background-color: var(--background);\n  font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',\n    'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\nimg {\n  max-width: auto;\n  height: 5rem;\n}\n\n.heading {\n  transition: all 150ms ease-in;\n}\n\n.info-container {\n  display: flex;\n}\n\n.board-container {\n  /*   height: 100vh; */\n  max-width: 100vw;\n}\n\n.reset {\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.game-grid {\n  width: 50vw;\n  height: 50vh;\n  margin: 0 auto;\n}\n\n.grid-p1,\n.grid-pAI {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid-p1:hover,\n.grid-pAI:hover {\n  cursor: crosshair;\n}\n\n.row-p1,\n.row-pAI {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.field-p1,\n.field-pAI {\n  border: dashed 1px black;\n  height: 100%;\n  width: 100%;\n}\n.field-p1 {\n  background-color: var(--playerBoard);\n}\n\n.field-pAI {\n  background-color: var(--AIboard);\n}\n\n.field-p1:hover,\n.field-pAI:hover {\n  filter: brightness(125%);\n}\n\n.p1-ship {\n  background-color: var(--ship);\n}\n\n.placed {\n  background-color: var(--fleet);\n  transition: all 200ms linear;\n  animation: pulse 5s linear infinite;\n}\n\n.sunk {\n  background-color: var(--sunk);\n  transition: all 1000ms linear;\n}\n\n.miss {\n  background-color: var(--miss);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit {\n  background-color: var(--hit);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.info-container {\n  height: 15vh;\n  width: 15vh;\n  margin-left: auto;\n  margin-right: auto;\n  border: solid 1px black;\n  transition: all 150ms ease-in-out;\n}\n\n.alignment-icon-horiz {\n  height: 1rem;\n  width: 100%;\n  background-color: var(--align);\n}\n\n.vert {\n  transition: all 150ms ease-in-out;\n  transform: rotate(90deg);\n}\n\n.hover {\n  background-color: var(--hover);\n}\n\n.fire {\n  transition: all 75ms ease-in-out;\n  transform: scale(125%);\n}\n\n.selected {\n  transform: scale(1.5);\n  transition: all 150ms linear;\n}\n\n.hidden {\n  display: none;\n}\n\n@-webkit-keyframes \"pulse\" {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n  50% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    transform: rotate(2deg);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n}\n\n@media only screen and (min-width: 1024px) {\n  .board-set {\n    position: absolute;\n    top: 50%;\n    left: 40%;\n    transform: translate(-50%, -50%);\n    /* transition: all 50ms linear; */\n  }\n  .fleet-set {\n    position: absolute;\n    top: 0rem;\n    right: -20rem;\n    transition: all 50ms linear;\n  }\n\n  .fleet-set > .p1-fleet-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fleet-set > .p1-fleet-container > .fleet {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .heading {\n    font-size: medium;\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB;;AAEA;;;EAGE,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,SAAS;EACT,mBAAmB;EACnB,mCAAmC;EACnC;;uCAEqC;AACvC;;AAEA;EACE,eAAe;EACf,YAAY;AACd;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,2BAA2B;AAC7B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,cAAc;AAChB;;AAEA;;EAEE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,mCAAmC;AACrC;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;;EAEE,aAAa;EACb,sCAAsC;AACxC;;AAEA;;EAEE,wBAAwB;EACxB,YAAY;EACZ,WAAW;AACb;AACA;EACE,oCAAoC;AACtC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,wBAAwB;AAC1B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;EAC9B,4BAA4B;EAC5B,mCAAmC;AACrC;;AAEA;EACE,6BAA6B;EAC7B,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;EAC5B,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,uBAAuB;EACvB,iCAAiC;AACnC;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,8BAA8B;AAChC;;AAEA;EACE,iCAAiC;EACjC,wBAAwB;AAC1B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,gCAAgC;EAChC,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE;IACE,2BAA2B;IAC3B,mBAAmB;IACnB,wBAAwB;EAC1B;EACA;IACE,6BAA6B;IAC7B,qBAAqB;IACrB,uBAAuB;EACzB;EACA;IACE,2BAA2B;IAC3B,mBAAmB;IACnB,wBAAwB;EAC1B;AACF;;AAEA;EACE;IACE,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,gCAAgC;IAChC,iCAAiC;EACnC;EACA;IACE,kBAAkB;IAClB,SAAS;IACT,aAAa;IACb,2BAA2B;EAC7B;;EAEA;IACE,aAAa;IACb,sBAAsB;EACxB;;EAEA;IACE,WAAW;EACb;AACF;;AAEA;EACE;IACE,iBAAiB;IACjB,gBAAgB;IAChB,mBAAmB;EACrB;AACF","sourcesContent":[":root {\n  --background: #f4f9f9;\n  --playerBoard: #bad7df;\n  --AIboard: #ffe2e2;\n  --fleet: #07679f5e;\n  --sunk: #d82148;\n  --hit: #12cc94;\n  --miss: #e23e57;\n  --hover: #c40885d7;\n  --ship: #07689f;\n  --align: #07689f;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n  /* height: 100vh; */\n  background-color: var(--background);\n  font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',\n    'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\nimg {\n  max-width: auto;\n  height: 5rem;\n}\n\n.heading {\n  transition: all 150ms ease-in;\n}\n\n.info-container {\n  display: flex;\n}\n\n.board-container {\n  /*   height: 100vh; */\n  max-width: 100vw;\n}\n\n.reset {\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.game-grid {\n  width: 50vw;\n  height: 50vh;\n  margin: 0 auto;\n}\n\n.grid-p1,\n.grid-pAI {\n  position: relative;\n  width: 300px;\n  height: 300px;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.grid-p1:hover,\n.grid-pAI:hover {\n  cursor: crosshair;\n}\n\n.row-p1,\n.row-pAI {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.field-p1,\n.field-pAI {\n  border: dashed 1px black;\n  height: 100%;\n  width: 100%;\n}\n.field-p1 {\n  background-color: var(--playerBoard);\n}\n\n.field-pAI {\n  background-color: var(--AIboard);\n}\n\n.field-p1:hover,\n.field-pAI:hover {\n  filter: brightness(125%);\n}\n\n.p1-ship {\n  background-color: var(--ship);\n}\n\n.placed {\n  background-color: var(--fleet);\n  transition: all 200ms linear;\n  animation: pulse 5s linear infinite;\n}\n\n.sunk {\n  background-color: var(--sunk);\n  transition: all 1000ms linear;\n}\n\n.miss {\n  background-color: var(--miss);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.hit {\n  background-color: var(--hit);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.info-container {\n  height: 15vh;\n  width: 15vh;\n  margin-left: auto;\n  margin-right: auto;\n  border: solid 1px black;\n  transition: all 150ms ease-in-out;\n}\n\n.alignment-icon-horiz {\n  height: 1rem;\n  width: 100%;\n  background-color: var(--align);\n}\n\n.vert {\n  transition: all 150ms ease-in-out;\n  transform: rotate(90deg);\n}\n\n.hover {\n  background-color: var(--hover);\n}\n\n.fire {\n  transition: all 75ms ease-in-out;\n  transform: scale(125%);\n}\n\n.selected {\n  transform: scale(1.5);\n  transition: all 150ms linear;\n}\n\n.hidden {\n  display: none;\n}\n\n@-webkit-keyframes \"pulse\" {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n  50% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n    transform: rotate(2deg);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    transform: rotate(-2deg);\n  }\n}\n\n@media only screen and (min-width: 1024px) {\n  .board-set {\n    position: absolute;\n    top: 50%;\n    left: 40%;\n    transform: translate(-50%, -50%);\n    /* transition: all 50ms linear; */\n  }\n  .fleet-set {\n    position: absolute;\n    top: 0rem;\n    right: -20rem;\n    transition: all 50ms linear;\n  }\n\n  .fleet-set > .p1-fleet-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fleet-set > .p1-fleet-container > .fleet {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 480px) {\n  .heading {\n    font-size: medium;\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFFQWpCLHNEQUFPLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzPzM0MmYiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzYzNDkiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzP2ZmOTQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVvdmVyQ2hlY2sgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcmVwb3J0U3Vua1NoaXAgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyB0dXJuQUkgfSBmcm9tICcuL3BsYXllcic7XG5cbmNvbnN0IHJlbmRlckJvYXJkID0gKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSkgPT4ge1xuICBjb25zdCBwMWJvYXJkID0gcDFCb2FyZDtcbiAgY29uc3QgcEFJYm9hcmQgPSBwQUlCb2FyZDtcbiAgY29uc3QgcDEgPSBwbGF5ZXIxO1xuICBjb25zdCBwQUkgPSBwbGF5ZXJBSTtcbiAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcbiAgY29uc3QgcEFJR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwQUlCb2FyZCcpO1xuXG4gIGNvbnN0IGNyZWF0ZUdyaWRzID0gKHAxYm9hcmQsIHBBSWJvYXJkKSA9PiB7XG4gICAgcDFHcmlkLmlubmVySFRNTCA9ICcnO1xuICAgIHBBSUdyaWQuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gY3JlYXRlIDEwIHJvd3NcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3Jvdy1wMScpO1xuICAgICAgcm93LnNldEF0dHJpYnV0ZSgnaWQnLCBgcDEtcm93JHtpfWApO1xuICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAvLyBmaWxsIHRoZSByb3dzIHdpdGggb25lIGRpdiBmb3IgZWFjaCBvYmplY3QgaW4gdGhlIGJvYXJkXG4gICAgICBwMWJvYXJkW2ldLmZvckVhY2goKGVsZW1lbnQsIGopID0+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZmllbGQtcDEnKTtcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdpZCcsIGBwMS1yb3cke2l9LWZpZWxkJHtqfWApO1xuICAgICAgICBpZiAoZWxlbWVudC5vY2N1cGllZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ3AxLXNoaXAnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5oaXQgPT09IHRydWUgJiYgZWxlbWVudC5vY2N1cGllZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgIGZpZWxkLmlubmVyVGV4dCA9ICfil48nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LmhpdCA9PT0gdHJ1ZSAmJiBlbGVtZW50Lm9jY3VwaWVkID09PSBmYWxzZSkge1xuICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICBmaWVsZC5pbm5lclRleHQgPSAn4pyWJztcbiAgICAgICAgfVxuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZmllbGQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93LXBBSScpO1xuICAgICAgcm93LnNldEF0dHJpYnV0ZSgnaWQnLCBgcEFJLXJvdyR7aX1gKTtcbiAgICAgIHBBSUdyaWQuYXBwZW5kQ2hpbGQocm93KTtcblxuICAgICAgcEFJYm9hcmRbaV0uZm9yRWFjaCgoZWxlbWVudCwgaikgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdmaWVsZC1wQUknKTtcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdpZCcsIGBwQUktcm93JHtpfS1maWVsZCR7an1gKTtcbiAgICAgICAgaWYgKGVsZW1lbnQub2NjdXBpZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdwQUktc2hpcCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LmhpdCA9PT0gdHJ1ZSAmJiBlbGVtZW50Lm9jY3VwaWVkID09PSB0cnVlKSB7XG4gICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgICAgZmllbGQuaW5uZXJUZXh0ID0gJ+KXjyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQuaGl0ID09PSB0cnVlICYmIGVsZW1lbnQub2NjdXBpZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICAgIGZpZWxkLmlubmVyVGV4dCA9ICfinJYnO1xuICAgICAgICB9XG5cbiAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmVydCA9IGVsZW1lbnQudmVydGljYWw7XG4gICAgICAgICAgY29uc3QgaG9yaXogPSBlbGVtZW50Lmhvcml6b250YWw7XG4gICAgICAgICAgLy8gYXR0YWNrXG4gICAgICAgICAgcDEuYXR0YWNrKFt2ZXJ0LCBob3Jpel0pO1xuICAgICAgICAgIC8vIHNlbGVjdCBhIHJhbmRvbSBzaGlwIGFuZCBmcm9tIHRoZSBpbnRlcmZhY2UgYW5kIGxldCBpdCBcImZpcmVcIlxuICAgICAgICAgIGNvbnN0IHBhcmVudFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAxLWZsZWV0LWNvbnRhaW5lcicpO1xuICAgICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAxICsgTWF0aC5yYW5kb20oKSAqIHBhcmVudFNlbGVjdG9yLmNoaWxkRWxlbWVudENvdW50XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgLnAxLWZsZWV0LWNvbnRhaW5lcj5kaXY6bnRoLWNoaWxkKCR7cmFuZG9tfSlgXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5hZGQoJ2ZpcmUnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdmaXJlJyk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSA9PT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGdhbWVvdmVyQ2hlY2socDFCb2FyZCk7XG4gICAgICAgICAgICB0dXJuQUkocEFJKTtcbiAgICAgICAgICAgIHJlcG9ydFN1bmtTaGlwKHAxQm9hcmQpO1xuICAgICAgICAgICAgZ2FtZW92ZXJDaGVjayhwQUlCb2FyZCk7XG4gICAgICAgICAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCwgcDEsIHBBSSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGVsZW1lbnQub2NjdXBpZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGZpZWxkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IHAxLCBwQUkgfTtcbiAgfTtcblxuICBjcmVhdGVHcmlkcyhwMWJvYXJkLCBwQUlib2FyZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJCb2FyZDtcbiIsImltcG9ydCByZW5kZXJCb2FyZCBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBib2FyZHMsIGdhbWVib2FyZEZhY3RvcnkgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBzZXR1cEFJLCBzZXR1cFBsYXllciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBhY3RpdmF0ZVBsYWNlbWVudEJ1dHRvbnMsIGFjdGl2YXRlUmVzZXRCdXR0b24gfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBwbGF5ZXJGYWN0b3J5LCBwbGF5ZXJzIH0gZnJvbSAnLi9wbGF5ZXInO1xuXG5jb25zdCBydW5HYW1lID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIxID0gcGxheWVyRmFjdG9yeSgnZGF2ZScsIGZhbHNlKTtcbiAgY29uc3QgcGxheWVyQUkgPSBwbGF5ZXJGYWN0b3J5KCdoYWwnLCB0cnVlKTtcbiAgY29uc3QgcDFCb2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoKTtcbiAgY29uc3QgcEFJQm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG4gIGNvbnN0IGdhbWVvdmVyID0gZmFsc2U7XG4gIHAxQm9hcmQuaWQgPSAncGxheWVyMSc7XG4gIHBBSUJvYXJkLmlkID0gJ3BsYXllcjInO1xuICBib2FyZHMucHVzaChwMUJvYXJkKTtcbiAgYm9hcmRzLnB1c2gocEFJQm9hcmQpO1xuICBwbGF5ZXJzLnB1c2gocGxheWVyMSk7XG4gIHBsYXllcnMucHVzaChwbGF5ZXJBSSk7XG5cbiAgc2V0dXBBSShwQUlCb2FyZCk7XG5cbiAgLyogY29uc29sZS5sb2cocGxheWVyMSk7XG4gIGNvbnNvbGUubG9nKHBsYXllckFJKTtcbiAgY29uc29sZS5sb2cocDFCb2FyZCk7XG4gIGNvbnNvbGUubG9nKHBBSUJvYXJkKTsgKi9cbiAgcmVuZGVyQm9hcmQocDFCb2FyZCwgcEFJQm9hcmQsIHBsYXllcjEsIHBsYXllckFJKTtcbiAgYWN0aXZhdGVQbGFjZW1lbnRCdXR0b25zKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSk7XG4gIGFjdGl2YXRlUmVzZXRCdXR0b24oKTtcbn07XG5cbmNvbnN0IGdhbWVvdmVyQ2hlY2sgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgYWxsQXJlVHJ1ZSA9IChib2FyZCkgPT5cbiAgICBib2FyZC5teUZsZWV0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09PSB0cnVlKTtcbiAgaWYgKGFsbEFyZVRydWUoYm9hcmQpID09PSB0cnVlKSB7XG4gICAgY29uc29sZS5sb2coYCR7Ym9hcmQuaWR9IHdhcyBkZWZlYXRlZGApO1xuICB9XG59O1xuXG5leHBvcnQgeyBydW5HYW1lLCBnYW1lb3ZlckNoZWNrIH07XG4iLCJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IGJvYXJkcyA9IFtdO1xuXG5sZXQgZ2FtZWJvYXJkO1xuXG5jb25zdCBnYW1lYm9hcmRGYWN0b3J5ID0gKCkgPT4ge1xuICAvLyBhIHR3byBkaW1lbnNpb25hbCBhcnJheVxuICBnYW1lYm9hcmQgPSB7XG4gICAgaWQ6IHVuZGVmaW5lZCxcbiAgICBteUZsZWV0OiBbXSxcbiAgICBwbGFjZVNoaXAodHlwZSwgbGVuZ3RoLCBjb29yZGluYXRlcykge1xuICAgICAgLy8gZ2V0IHRoZSBzaGlwIGZyb20gdGhlIGZhY3RvcnkgZnVuY3Rpb24gYW5kIGdldCBpdHMgcG9zaXRpb25cbiAgICAgIGNvbnN0IHNoaXAgPSBzaGlwRmFjdG9yeSh0eXBlLCBsZW5ndGgsIGNvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gc2hpcC5jb29yZGluYXRlcztcblxuICAgICAgaWYgKHBvc2l0aW9uWzBdID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gZGVmaW5lIHRoZSBwb3NpdGlvbiB0byBsb29rIGZvclxuICAgICAgcG9zaXRpb24uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJ0ID0gaXRlbVswXTtcbiAgICAgICAgY29uc3QgaG9yaXogPSBpdGVtWzFdO1xuXG4gICAgICAgIGNvbnN0IGZpZWxkID0gdGhpc1t2ZXJ0XS5maW5kKCh7IGhvcml6b250YWwgfSkgPT4gaG9yaXpvbnRhbCA9PT0gaG9yaXopO1xuXG4gICAgICAgIGZpZWxkLm9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm15RmxlZXQucHVzaChzaGlwKTtcbiAgICB9LFxuICAgIHJlY2lldmVBdHRhY2socG9zaXRpb24pIHtcbiAgICAgIC8vIHJlY2lldmUgY29vcmRpbmF0ZXMgb2YgYW4gYXR0YWNoIGFuZCBtYXJrIHRoYXQgZmllbGQgYXMgaGl0XG4gICAgICBjb25zdCB2ZXJ0ID0gcG9zaXRpb25bMF07XG4gICAgICBjb25zdCBob3JpeiA9IHBvc2l0aW9uWzFdO1xuXG4gICAgICBjb25zdCBmaWVsZCA9IHRoaXNbdmVydF0uZmluZCgoeyBob3Jpem9udGFsIH0pID0+IGhvcml6b250YWwgPT09IGhvcml6KTtcblxuICAgICAgaWYgKGZpZWxkLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBoaXQhJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkLmhpdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmllbGQuaGl0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5teUZsZWV0LmZvckVhY2goKG9iamVjdCkgPT4ge1xuICAgICAgICBvYmplY3QuY29vcmRpbmF0ZXMuZm9yRWFjaCgoYXJyYXkpID0+IHtcbiAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYXJyYXkpID09PSBKU09OLnN0cmluZ2lmeShwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIG9iamVjdC5oaXQocG9zaXRpb24pO1xuICAgICAgICAgICAgb2JqZWN0LmlzU3VuaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGdhbWVib2FyZDtcbiAgICB9LFxuICAgIGlsbGVnYWxQb3NpdGlvbnM6IFtdLFxuICB9O1xuXG4gIGNvbnN0IGNvbHMgPSAxMDtcbiAgY29uc3Qgcm93cyA9IDEwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHM7IGkrKykge1xuICAgIGdhbWVib2FyZFtpXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93czsgaisrKSB7XG4gICAgICBnYW1lYm9hcmRbaV0ucHVzaCh7XG4gICAgICAgIHZlcnRpY2FsOiBpLFxuICAgICAgICBob3Jpem9udGFsOiBqLFxuICAgICAgICBvY2N1cGllZDogZmFsc2UsXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZCwgYm9hcmRzLCBnYW1lYm9hcmRGYWN0b3J5IH07XG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IGdldFJhbmRvbUZpZWxkID0gKCkgPT4ge1xuICBsZXQgcmFuZG9tSG9yaXRvbnRhbDtcbiAgbGV0IHJhbmRvbVZlcnRpY2FsO1xuICBjb25zdCByYW5kb21Qb3NpdGlvbiA9IFtdO1xuXG4gIGNvbnN0IHJhbmRvbUFycmF5ID0gZ2FtZWJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gIGNvbnN0IHJhbmRvbU9iamVjdCA9IHJhbmRvbUFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gIHJhbmRvbVZlcnRpY2FsID0gcmFuZG9tT2JqZWN0LnZlcnRpY2FsO1xuICByYW5kb21Ib3JpdG9udGFsID0gcmFuZG9tT2JqZWN0Lmhvcml6b250YWw7XG5cbiAgcmFuZG9tUG9zaXRpb24ucHVzaChyYW5kb21WZXJ0aWNhbCk7XG4gIHJhbmRvbVBvc2l0aW9uLnB1c2gocmFuZG9tSG9yaXRvbnRhbCk7XG5cbiAgcmV0dXJuIHJhbmRvbVBvc2l0aW9uO1xufTtcblxuY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSAodHlwZSwgYWxpZ25tZW50LCBwb3NpdGlvbiwgYm9hcmQpID0+IHtcbiAgY29uc3QgaWxsZWdhbCA9IGJvYXJkLmlsbGVnYWxQb3NpdGlvbnM7XG4gIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgY29uc3QgZmxlZXQgPSBbXG4gICAge1xuICAgICAgdHlwZTogJ2NhcnJpZXInLFxuICAgICAgbGVuZ3RoOiA1LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgbGVuZ3RoOiA0LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NydWlzZXInLFxuICAgICAgbGVuZ3RoOiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3N1Ym1hcmluZScsXG4gICAgICBsZW5ndGg6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnZGVzdHJveWVyJyxcbiAgICAgIGxlbmd0aDogMixcbiAgICB9LFxuICBdO1xuXG4gIGNvbnN0IGlsbGVnYWxQb3NpdGlvbnMgPSBbXG4gICAge1xuICAgICAgdHlwZTogJ2NhcnJpZXInLFxuICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbMCwgNl0sXG4gICAgICAgIFswLCA3XSxcbiAgICAgICAgWzAsIDhdLFxuICAgICAgICBbMCwgOV0sXG4gICAgICAgIFsxLCA2XSxcbiAgICAgICAgWzEsIDddLFxuICAgICAgICBbMSwgOF0sXG4gICAgICAgIFsxLCA5XSxcbiAgICAgICAgWzIsIDZdLFxuICAgICAgICBbMiwgN10sXG4gICAgICAgIFsyLCA4XSxcbiAgICAgICAgWzIsIDldLFxuICAgICAgICBbMywgNl0sXG4gICAgICAgIFszLCA3XSxcbiAgICAgICAgWzMsIDhdLFxuICAgICAgICBbMywgOV0sXG4gICAgICAgIFs0LCA2XSxcbiAgICAgICAgWzQsIDddLFxuICAgICAgICBbNCwgOF0sXG4gICAgICAgIFs0LCA5XSxcbiAgICAgICAgWzUsIDZdLFxuICAgICAgICBbNSwgN10sXG4gICAgICAgIFs1LCA4XSxcbiAgICAgICAgWzUsIDldLFxuICAgICAgICBbNiwgNl0sXG4gICAgICAgIFs2LCA3XSxcbiAgICAgICAgWzYsIDhdLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCA2XSxcbiAgICAgICAgWzcsIDddLFxuICAgICAgICBbNywgOF0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDZdLFxuICAgICAgICBbOCwgN10sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhcnJpZXInLFxuICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzYsIDBdLFxuICAgICAgICBbNiwgMV0sXG4gICAgICAgIFs2LCAyXSxcbiAgICAgICAgWzYsIDNdLFxuICAgICAgICBbNiwgNF0sXG4gICAgICAgIFs2LCA1XSxcbiAgICAgICAgWzYsIDZdLFxuICAgICAgICBbNiwgN10sXG4gICAgICAgIFs2LCA4XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgMF0sXG4gICAgICAgIFs3LCAxXSxcbiAgICAgICAgWzcsIDJdLFxuICAgICAgICBbNywgM10sXG4gICAgICAgIFs3LCA0XSxcbiAgICAgICAgWzcsIDVdLFxuICAgICAgICBbNywgNl0sXG4gICAgICAgIFs3LCA3XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCAwXSxcbiAgICAgICAgWzgsIDFdLFxuICAgICAgICBbOCwgMl0sXG4gICAgICAgIFs4LCAzXSxcbiAgICAgICAgWzgsIDRdLFxuICAgICAgICBbOCwgNV0sXG4gICAgICAgIFs4LCA2XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDBdLFxuICAgICAgICBbOSwgMV0sXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgICAgICBbOSwgNF0sXG4gICAgICAgIFs5LCA1XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdiYXR0bGVzaGlwJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzAsIDddLFxuICAgICAgICBbMCwgOF0sXG4gICAgICAgIFswLCA5XSxcbiAgICAgICAgWzEsIDddLFxuICAgICAgICBbMSwgOF0sXG4gICAgICAgIFsxLCA5XSxcbiAgICAgICAgWzIsIDddLFxuICAgICAgICBbMiwgOF0sXG4gICAgICAgIFsyLCA5XSxcbiAgICAgICAgWzMsIDddLFxuICAgICAgICBbMywgOF0sXG4gICAgICAgIFszLCA5XSxcbiAgICAgICAgWzQsIDddLFxuICAgICAgICBbNCwgOF0sXG4gICAgICAgIFs0LCA5XSxcbiAgICAgICAgWzUsIDddLFxuICAgICAgICBbNSwgOF0sXG4gICAgICAgIFs1LCA5XSxcbiAgICAgICAgWzYsIDddLFxuICAgICAgICBbNiwgOF0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDddLFxuICAgICAgICBbNywgOF0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnYmF0dGxlc2hpcCcsXG4gICAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbNywgMF0sXG4gICAgICAgIFs3LCAxXSxcbiAgICAgICAgWzcsIDJdLFxuICAgICAgICBbNywgM10sXG4gICAgICAgIFs3LCA0XSxcbiAgICAgICAgWzcsIDVdLFxuICAgICAgICBbNywgNl0sXG4gICAgICAgIFs3LCA3XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCAwXSxcbiAgICAgICAgWzgsIDFdLFxuICAgICAgICBbOCwgMl0sXG4gICAgICAgIFs4LCAzXSxcbiAgICAgICAgWzgsIDRdLFxuICAgICAgICBbOCwgNV0sXG4gICAgICAgIFs4LCA2XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDBdLFxuICAgICAgICBbOSwgMV0sXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgICAgICBbOSwgNF0sXG4gICAgICAgIFs5LCA1XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjcnVpc2VyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzAsIDhdLFxuICAgICAgICBbMCwgOV0sXG4gICAgICAgIFsxLCA4XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgOF0sXG4gICAgICAgIFsyLCA5XSxcbiAgICAgICAgWzMsIDhdLFxuICAgICAgICBbMywgOV0sXG4gICAgICAgIFs0LCA4XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgOF0sXG4gICAgICAgIFs1LCA5XSxcbiAgICAgICAgWzYsIDhdLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NydWlzZXInLFxuICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzgsIDBdLFxuICAgICAgICBbOCwgMV0sXG4gICAgICAgIFs4LCAyXSxcbiAgICAgICAgWzgsIDNdLFxuICAgICAgICBbOCwgNF0sXG4gICAgICAgIFs4LCA1XSxcbiAgICAgICAgWzgsIDZdLFxuICAgICAgICBbOCwgN10sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgMF0sXG4gICAgICAgIFs5LCAxXSxcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgICAgIFs5LCA0XSxcbiAgICAgICAgWzksIDVdLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3N1Ym1hcmluZScsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA4XSxcbiAgICAgICAgWzAsIDldLFxuICAgICAgICBbMSwgOF0sXG4gICAgICAgIFsxLCA5XSxcbiAgICAgICAgWzIsIDhdLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA4XSxcbiAgICAgICAgWzMsIDldLFxuICAgICAgICBbNCwgOF0sXG4gICAgICAgIFs0LCA5XSxcbiAgICAgICAgWzUsIDhdLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA4XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgOF0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdzdWJtYXJpbmUnLFxuICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzgsIDBdLFxuICAgICAgICBbOCwgMV0sXG4gICAgICAgIFs4LCAyXSxcbiAgICAgICAgWzgsIDNdLFxuICAgICAgICBbOCwgNF0sXG4gICAgICAgIFs4LCA1XSxcbiAgICAgICAgWzgsIDZdLFxuICAgICAgICBbOCwgN10sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgMF0sXG4gICAgICAgIFs5LCAxXSxcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgICAgIFs5LCA0XSxcbiAgICAgICAgWzksIDVdLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2Rlc3Ryb3llcicsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA5XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA5XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnZGVzdHJveWVyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs5LCAwXSxcbiAgICAgICAgWzksIDFdLFxuICAgICAgICBbOSwgMl0sXG4gICAgICAgIFs5LCAzXSxcbiAgICAgICAgWzksIDRdLFxuICAgICAgICBbOSwgNV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnb2NjdXBpZWQnLFxuICAgICAgcG9zaXRpb25zOiBbXSxcbiAgICB9LFxuICBdO1xuXG4gIGlsbGVnYWxQb3NpdGlvbnNbMTBdLnBvc2l0aW9ucy5wdXNoKGlsbGVnYWwpO1xuXG4gIGNvbnN0IHNoaXAgPSB0eXBlO1xuICBjb25zdCBhbGlnbiA9IGFsaWdubWVudDsgLy8gaG9yaXpvdGFsIG9yIHZlcnRpY2FsXG5cbiAgY29uc3QgY2hlY2tQb3NpdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZEZpZWxkID0gcG9zaXRpb247IC8vIFswLCAxXVxuXG4gICAgLy8gY2hlY2sgb2Ygc2VsZWN0ZWQgZmllbGQgaXMgaW5zaWRlIHRoZSBnYW1lIGdyaWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlsbGVnYWxQb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgaWxsZWdhbFBvc2l0aW9uc1tpXS50eXBlID09PSBzaGlwICYmXG4gICAgICAgIGlsbGVnYWxQb3NpdGlvbnNbaV0ub3JpZW50YXRpb24gPT09IGFsaWduICYmXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGlsbGVnYWxQb3NpdGlvbnNbaV0ucG9zaXRpb25zKS5pbmNsdWRlcyhzZWxlY3RlZEZpZWxkKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbGxlZ2FsJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpbGxlZ2FsUG9zaXRpb25zWzEwXS5wb3NpdGlvbnMucHVzaChzZWxlY3RlZEZpZWxkKTtcbiAgICByZXR1cm4gc2VsZWN0ZWRGaWVsZDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQb3NpdGlvbiA9ICgpID0+IHtcbiAgICBsZXQgbGVuZ3RoO1xuXG4gICAgZmxlZXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gc2hpcCkge1xuICAgICAgICBsZW5ndGggPSBpdGVtLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNyZWF0ZUNvb3JkaW5hdGVzID0gKCgpID0+IHtcbiAgICAgIC8vIHJldHVybiBpcyBubyB2YWxpZCBwb3NpdGlvbiBpcyByZXR1cm5lZCBmcm9tIGNoZWNrUG9zaXRpb25cbiAgICAgIGlmICh2YWxpZENvb3JkaW5hdGVzWzBdID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBvcyA9IFsuLi52YWxpZENvb3JkaW5hdGVzWzBdXTtcbiAgICAgIGNvbnN0IGFkZGl0aW9uYWxDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICAvLyBnZXQgdGhlIG51bWJlciBjb3JyZXNwb25kaW5nIHRvIHRoZSBcImhvcml6b250YWxcIiBheGlzIGluIHRoZSBnYW1lYm9hcmQtYXJyYXlcbiAgICAgIC8vIHJlcGVhdCBcImxlbmd0aFwiLXRpbWVzXG4gICAgICBpZiAoYWxpZ25tZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIGFkZCAxIHRvIHRoYXQgbnVtYmVyIGFuZCBwdXNoIG5ldyBjb29yZGluYXRlcyB0byBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMtYXJyYXlcbiAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc1sxXSArIDE7XG4gICAgICAgICAgY29uc3QgYXJyID0gcG9zLnNwbGljZSgxLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgYWRkaXRpb25hbENvb3JkaW5hdGVzLnB1c2goW3Bvc1swXSwgYXJyWzBdXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWxpZ25tZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc1swXSArIDE7XG4gICAgICAgICAgY29uc3QgYXJyID0gcG9zLnNwbGljZSgwLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgYWRkaXRpb25hbENvb3JkaW5hdGVzLnB1c2goW2FyclswXSwgcG9zWzFdXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSBmaXJzdCBpdGVtIHRvIHByZXZlbnQgZHVwbGljYXRlIGNvb3JkaW5hdGVzXG4gICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMuc2hpZnQoKTtcblxuICAgICAgYWRkaXRpb25hbENvb3JkaW5hdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFsaWRDb29yZGluYXRlcy5wdXNoKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lsbGVnYWxQb3NpdGlvbnMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYm9hcmQuaWxsZWdhbFBvc2l0aW9ucykuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBbbnVsbF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNvb3JkaW5hdGVzICE9PSBudWxsKSB7XG4gICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGJvYXJkLmlsbGVnYWxQb3NpdGlvbnMucHVzaChpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSByZXR1cm47XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgdmFsaWRDb29yZGluYXRlcy5wdXNoKGNoZWNrUG9zaXRpb24oKSk7XG4gIGNyZWF0ZVBvc2l0aW9uKCk7XG4gIHJldHVybiBjaGVja0lsbGVnYWxQb3NpdGlvbnModmFsaWRDb29yZGluYXRlcyk7XG59O1xuXG5jb25zdCBzZXR1cEFJID0gKHBBSUJvYXJkKSA9PiB7XG4gIGNvbnN0IGFsaWduID0gWyd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJ107XG4gIGNvbnN0IHJhbmRvbSA9ICgpID0+IGFsaWduW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFsaWduLmxlbmd0aCldO1xuXG4gIGNvbnN0IHBsYWNlQ2FycmllciA9ICgpID0+IHtcbiAgICBwQUlCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAnY2FycmllcicsXG4gICAgICA1LFxuICAgICAgZ2V0Q29vcmRpbmF0ZXMoJ2NhcnJpZXInLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ2NhcnJpZXInKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHBsYWNlQ2FycmllcigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGFjZUJhdHRsZXNoaXAgPSAoKSA9PiB7XG4gICAgcEFJQm9hcmQucGxhY2VTaGlwKFxuICAgICAgJ2JhdHRsZXNoaXAnLFxuICAgICAgNCxcbiAgICAgIGdldENvb3JkaW5hdGVzKCdiYXR0bGVzaGlwJywgcmFuZG9tKCksIGdldFJhbmRvbUZpZWxkKCksIHBBSUJvYXJkKVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgcEFJQm9hcmQubXlGbGVldC5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50LnR5cGUgPT09ICdiYXR0bGVzaGlwJykgPT09XG4gICAgICBmYWxzZVxuICAgICkge1xuICAgICAgcGxhY2VCYXR0bGVzaGlwKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlQ3J1aXNlciA9ICgpID0+IHtcbiAgICBwQUlCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAnY3J1aXNlcicsXG4gICAgICAzLFxuICAgICAgZ2V0Q29vcmRpbmF0ZXMoJ2NydWlzZXInLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ2NydWlzZXInKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGFjZVN1Ym1hcmluZSA9ICgpID0+IHtcbiAgICBwQUlCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAnc3VibWFyaW5lJyxcbiAgICAgIDMsXG4gICAgICBnZXRDb29yZGluYXRlcygnc3VibWFyaW5lJywgcmFuZG9tKCksIGdldFJhbmRvbUZpZWxkKCksIHBBSUJvYXJkKVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgcEFJQm9hcmQubXlGbGVldC5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50LnR5cGUgPT09ICdzdWJtYXJpbmUnKSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHBsYWNlU3VibWFyaW5lKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlRGVzdHJveWVyID0gKCkgPT4ge1xuICAgIHBBSUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICdkZXN0cm95ZXInLFxuICAgICAgMixcbiAgICAgIGdldENvb3JkaW5hdGVzKCdkZXN0cm95ZXInLCByYW5kb20oKSwgZ2V0UmFuZG9tRmllbGQoKSwgcEFJQm9hcmQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBwQUlCb2FyZC5teUZsZWV0LnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQudHlwZSA9PT0gJ2Rlc3Ryb3llcicpID09PSBmYWxzZVxuICAgICkge1xuICAgICAgcGxhY2VEZXN0cm95ZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgcGxhY2VDYXJyaWVyKCk7XG4gIHBsYWNlQmF0dGxlc2hpcCgpO1xuICBwbGFjZUNydWlzZXIoKTtcbiAgcGxhY2VTdWJtYXJpbmUoKTtcbiAgcGxhY2VEZXN0cm95ZXIoKTtcbn07XG5cbmV4cG9ydCB7IGdldENvb3JkaW5hdGVzLCBnZXRSYW5kb21GaWVsZCwgc2V0dXBBSSB9O1xuIiwiaW1wb3J0IHJlbmRlckJvYXJkIGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGdldENvb3JkaW5hdGVzIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgYWN0aXZhdGVQbGFjZW1lbnRCdXR0b25zID0gKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSkgPT4ge1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1jb250YWluZXInKTtcbiAgY29uc3QgcDFpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxaW5mbycpO1xuICBjb25zdCBmbGVldEhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxlZXQtaGVhZGluZycpO1xuICBjb25zdCBwQUlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucEFJLWNvbnRhaW5lcicpO1xuICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm9Db250YWluZXInKTtcbiAgY29uc3QgYWxpZ25tZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsaWdubWVudCcpO1xuICBjb25zdCBwMUZsZWV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAxLWZsZWV0LXdyYXBwZXInKTtcbiAgY29uc3QgY2FycmllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJyaWVyQnV0dG9uJyk7XG4gIGNvbnN0IGJhdHRsZXNoaXBCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGxlc2hpcEJ1dHRvbicpO1xuICBjb25zdCBjcnVpc2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NydWlzZXJCdXR0b24nKTtcbiAgY29uc3Qgc3VibWFyaW5lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1hcmluZUJ1dHRvbicpO1xuICBjb25zdCBkZXN0cm95ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzdHJveWVyQnV0dG9uJyk7XG5cbiAgaW5mb0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAoYWxpZ25tZW50QnRuLmlubmVyVGV4dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBhbGlnbm1lbnRCdG4uaW5uZXJUZXh0ID0gJ3ZlcnRpY2FsJztcbiAgICAgIGluZm9Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgndmVydCcpO1xuICAgIH0gZWxzZSBpZiAoYWxpZ25tZW50QnRuLmlubmVyVGV4dCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgYWxpZ25tZW50QnRuLmlubmVyVGV4dCA9ICdob3Jpem9udGFsJztcbiAgICAgIGluZm9Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgndmVydCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2FycmllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhjYXJyaWVyQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSwgNSwgY2FycmllckJ0bik7XG4gIH0pO1xuXG4gIGJhdHRsZXNoaXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVuZGVyQm9hcmQocDFCb2FyZCwgcEFJQm9hcmQpO1xuICAgIHBsYWNlUGxheWVyU2hpcHMoXG4gICAgICBiYXR0bGVzaGlwQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSxcbiAgICAgIDQsXG4gICAgICBiYXR0bGVzaGlwQnRuXG4gICAgKTtcbiAgfSk7XG5cbiAgY3J1aXNlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhjcnVpc2VyQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSwgMywgY3J1aXNlckJ0bik7XG4gIH0pO1xuXG4gIHN1Ym1hcmluZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZW5kZXJCb2FyZChwMUJvYXJkLCBwQUlCb2FyZCk7XG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhzdWJtYXJpbmVCdG4ucGFyZW50Tm9kZS5pZC50b0xvd2VyQ2FzZSgpLCAzLCBzdWJtYXJpbmVCdG4pO1xuICB9KTtcblxuICBkZXN0cm95ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVuZGVyQm9hcmQocDFCb2FyZCwgcEFJQm9hcmQpO1xuICAgIC8qIHBsYWNlUGxheWVyU2hpcHMoZGVzdHJveWVyQnRuLmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpLCAyLCBkZXN0cm95ZXJCdG4pOyAqL1xuICAgIHBsYWNlUGxheWVyU2hpcHMoZGVzdHJveWVyQnRuLnBhcmVudE5vZGUuaWQudG9Mb3dlckNhc2UoKSwgMiwgZGVzdHJveWVyQnRuKTtcbiAgfSk7XG5cbiAgY29uc3QgcGxhY2VQbGF5ZXJTaGlwcyA9IChzaGlwbmFtZSwgbGVuZ3RoLCBidG4pID0+IHtcbiAgICBwMWluZm8uaW5uZXJUZXh0ID0gYFBsYWNlIHlvdXIgJHtzaGlwbmFtZX1gO1xuICAgIHAxaW5mby5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIGNvbnN0IGZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWVsZC1wMScpO1xuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgdmVydCA9IHBhcnNlSW50KGZpZWxkLmlkWzZdKTtcbiAgICAgIGNvbnN0IGhvcml6ID0gcGFyc2VJbnQoZmllbGQuaWRbZmllbGQuaWQubGVuZ3RoIC0gMV0pO1xuICAgICAgY29uc3QgcG9zID0gW3ZlcnQsIGhvcml6XTtcbiAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGlnbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGlnbm1lbnQnKS50ZXh0Q29udGVudDtcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgc2hpcG5hbWUsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIGdldENvb3JkaW5hdGVzKHNoaXBuYW1lLCBhbGlnbiwgcG9zLCBwMUJvYXJkKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwMUJvYXJkLm15RmxlZXQuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC50eXBlID09PSBzaGlwbmFtZSkpIHtcbiAgICAgICAgICBwMWluZm8uaW5uZXJUZXh0ID0gJ0RlcGxveSB0aGUgcmVzdCBvZiB5b3VyIGZsZWV0ISc7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzaGlwbmFtZX1gKTtcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpO1xuICAgICAgICAgIHAxaW5mby5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCd1bmFibGUgdG8gcGxhY2UgaGVyZS4gdHJ5IGFnYWluIScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwMUJvYXJkLm15RmxlZXQubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgcDFpbmZvLmlubmVyVGV4dCA9ICdZb3VyIGZsZWV0JztcbiAgICAgICAgICBpbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgIHBBSUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICBwMUZsZWV0LmNsYXNzTGlzdC5hZGQoJ2ZsZWV0LXNldCcpO1xuICAgICAgICAgIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLXNldCcpO1xuICAgICAgICAgIGZsZWV0SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlckJvYXJkKHAxQm9hcmQsIHBBSUJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXJBSSk7XG4gICAgICB9KTtcblxuICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBob3ZlckVmZmVjdChwb3MpO1xuICAgICAgfSk7XG4gICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaG92ZXJFZmZlY3QocG9zKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBob3ZlckVmZmVjdChwb3MpIHtcbiAgICAgICAgY29uc3QgYWxpZ24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxpZ25tZW50JykuaW5uZXJUZXh0O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFsuLi5wb3NdO1xuICAgICAgICBjb25zdCBjbGFpbWVkID0gW107XG5cbiAgICAgICAgaWYgKGFsaWduID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc2l0aW9uWzFdICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IHBvc2l0aW9uLnNwbGljZSgxLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgICBjbGFpbWVkLnB1c2goW3Bvc2l0aW9uWzBdLCBhcnJbMF1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYWxpZ24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhZGRpdGlvbiA9IHBvc2l0aW9uWzBdICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IHBvc2l0aW9uLnNwbGljZSgwLCAxLCBhZGRpdGlvbik7XG4gICAgICAgICAgICBjbGFpbWVkLnB1c2goW2FyclswXSwgcG9zaXRpb25bMV1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xhaW1lZC5sZW5ndGggPSBsZW5ndGg7XG5cbiAgICAgICAgY2xhaW1lZC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmVydGljYWwgPSBpdGVtWzBdO1xuICAgICAgICAgIGNvbnN0IGhvcml6b250YWwgPSBpdGVtWzFdO1xuICAgICAgICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQtcDEnKTtcbiAgICAgICAgICBjb25zdCByb3cgPSBib2FyZC5xdWVyeVNlbGVjdG9yKGAjcDEtcm93JHt2ZXJ0aWNhbH1gKTtcbiAgICAgICAgICBpZiAodmVydGljYWwgPD0gOSAmJiBob3Jpem9udGFsIDw9IDkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByb3cucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgYCNwMS1yb3cke3ZlcnRpY2FsfS1maWVsZCR7aG9yaXpvbnRhbH1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdob3ZlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5jb25zdCBhY3RpdmF0ZVJlc2V0QnV0dG9uID0gKCkgPT4ge1xuICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpO1xuXG4gIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlcG9ydFN1bmtTaGlwID0gKGJvYXJkKSA9PiB7XG4gIGJvYXJkLm15RmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGlmIChzaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwLnR5cGUpLmNsYXNzTGlzdC5hZGQoJ3N1bmsnKTtcbiAgICAgIC8vIGdldCB0aGUgY2xvc2VzdCAuZmxlZXQtZWxlbWVudCB0byBwcmVmZW50IGl0IGZyb20gYmVpbmcgdHJhbnNmb3JtZWQgd2hlbiBzaGlwIGlzIHN1bmtcbiAgICAgIGNvbnN0IGNsb3Nlc3RFbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgLmdldEVsZW1lbnRCeUlkKHNoaXAudHlwZSlcbiAgICAgICAgLmNsb3Nlc3QoJy5mbGVldCcpO1xuICAgICAgY2xvc2VzdEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBhY3RpdmF0ZVBsYWNlbWVudEJ1dHRvbnMsIGFjdGl2YXRlUmVzZXRCdXR0b24sIHJlcG9ydFN1bmtTaGlwIH07XG4iLCJpbXBvcnQgeyBib2FyZHMgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IHBsYXllcnMgPSBbXTtcblxuY29uc3QgcGxheWVyRmFjdG9yeSA9IChuYW1lLCBpc0FJKSA9PiB7XG4gIGlmIChpc0FJID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAncGxheWVyMicsXG4gICAgICBuYW1lLFxuICAgICAgaXNBSSxcbiAgICAgIGlzQWN0aXZlOiBmYWxzZSxcblxuICAgICAgZ2V0UmFuZG9tUG9zaXRpb24oKSB7XG4gICAgICAgIGxldCByYW5kb21Ib3JpdG9udGFsO1xuICAgICAgICBsZXQgcmFuZG9tVmVydGljYWw7XG4gICAgICAgIGNvbnN0IHJhbmRvbVBvc2l0aW9uID0gW107XG5cbiAgICAgICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaWQgIT09IGJvYXJkLmlkKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21BcnJheSA9IGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gICAgICAgICAgICBjb25zdCByYW5kb21PYmplY3QgPSByYW5kb21BcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xuICAgICAgICAgICAgcmFuZG9tVmVydGljYWwgPSByYW5kb21PYmplY3QudmVydGljYWw7XG4gICAgICAgICAgICByYW5kb21Ib3JpdG9udGFsID0gcmFuZG9tT2JqZWN0Lmhvcml6b250YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmFuZG9tUG9zaXRpb24ucHVzaChyYW5kb21WZXJ0aWNhbCk7XG4gICAgICAgIHJhbmRvbVBvc2l0aW9uLnB1c2gocmFuZG9tSG9yaXRvbnRhbCk7XG5cbiAgICAgICAgcmV0dXJuIHJhbmRvbVBvc2l0aW9uO1xuICAgICAgfSxcblxuICAgICAgdmFsaWRhdGVQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBjaGVja2VkID0gcG9zaXRpb247XG4gICAgICAgIGNvbnN0IHZlcnQgPSBwb3NpdGlvblswXTtcbiAgICAgICAgY29uc3QgaG9yaXogPSBwb3NpdGlvblsxXTtcbiAgICAgICAgLy8gY2hlY2sgaWYgcG9zaXR0aW9uICB3YXMgYWxyZWR5IGhpdFxuICAgICAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pZCAhPT0gYm9hcmQuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gYm9hcmRbdmVydF0uZmluZChcbiAgICAgICAgICAgICAgKHsgaG9yaXpvbnRhbCB9KSA9PiBob3Jpem9udGFsID09PSBob3JpelxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChmaWVsZC5oaXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGNoZWNrZWQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmllbGQuaGl0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQb3NpdGlvbih0aGlzLmdldFJhbmRvbVBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBhdHRhY2socG9zaXRpb24pIHtcbiAgICAgICAgLy8gYXR0YWNrIGVuZW15IGdhbWVib2FyZFxuICAgICAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pZCAhPT0gYm9hcmQuaWQpIHtcbiAgICAgICAgICAgIGJvYXJkLnJlY2lldmVBdHRhY2socG9zaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHN3aXRjaCBhY3RpdmUgcGxheWVyXG4gICAgICAgIHBsYXllcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgICAgICBpdGVtLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlkICE9PSBpdGVtLmlkKSB7XG4gICAgICAgICAgICBpdGVtLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgaWQ6ICdwbGF5ZXIxJyxcbiAgICBuYW1lLFxuICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIGF0dGFjayhwb3NpdGlvbikge1xuICAgICAgLy8gYXR0YWNrIGVuZW15IGdhbWVib2FyZFxuICAgICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlkICE9PSBib2FyZC5pZCkge1xuICAgICAgICAgIGJvYXJkLnJlY2lldmVBdHRhY2socG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIHN3aXRjaCBhY3RpdmUgcGxheWVyXG4gICAgICBwbGF5ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgICBpdGVtLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pZCAhPT0gaXRlbS5pZCkge1xuICAgICAgICAgIGl0ZW0uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgdHVybkFJID0gKHBBSSkgPT4ge1xuICBjb25zdCBhdHRhY2sgPSBwQUkudmFsaWRhdGVQb3NpdGlvbihwQUkuZ2V0UmFuZG9tUG9zaXRpb24oKSk7XG5cbiAgcmV0dXJuIHBBSTtcbn07XG5cbmV4cG9ydCB7IHBsYXllckZhY3RvcnksIHBsYXllcnMsIHR1cm5BSSB9O1xuIiwiY29uc3Qgc2hpcEZhY3RvcnkgPSAodHlwZSwgbGVuZ3RoLCBjb29yZGluYXRlcykgPT4gKHtcbiAgdHlwZSxcbiAgbGVuZ3RoLFxuICBjb29yZGluYXRlcyxcbiAgaGl0Ym94OiBbXSxcbiAgaGl0KHBvc2l0aW9uKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuY29vcmRpbmF0ZXMpLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5oaXRib3gucHVzaChwb3NpdGlvbik7XG4gICAgfVxuICB9LFxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuICEhKFxuICAgICAgdGhpcy5oaXRib3gubGVuZ3RoID49IDAgJiYgdGhpcy5oaXRib3gubGVuZ3RoID49IHRoaXMuY29vcmRpbmF0ZXMubGVuZ3RoXG4gICAgKTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBzaGlwRmFjdG9yeSB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDJFQUEyRTs7QUFFM0U7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSxpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLDhCQUE4QixFQUFFLE1BQU07QUFDeEM7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLFNBQVM7QUFDWDs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLHVCQUF1QixFQUFFLE1BQU07RUFDL0IsU0FBUyxFQUFFLE1BQU07RUFDakIsaUJBQWlCLEVBQUUsTUFBTTtBQUMzQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxpQ0FBaUMsRUFBRSxNQUFNO0VBQ3pDLGNBQWMsRUFBRSxNQUFNO0FBQ3hCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsbUJBQW1CLEVBQUUsTUFBTTtFQUMzQiwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGlDQUFpQyxFQUFFLE1BQU07QUFDM0M7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsbUJBQW1CO0FBQ3JCOztBQUVBOzs7RUFHRTs7QUFFRjs7O0VBR0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjs7Ozs7RUFLRSxvQkFBb0IsRUFBRSxNQUFNO0VBQzVCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLGlCQUFpQixFQUFFLE1BQU07RUFDekIsU0FBUyxFQUFFLE1BQU07QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1FBQ1EsTUFBTTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTs7O0VBR0U7O0FBRUY7U0FDUyxNQUFNO0VBQ2Isb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsMEJBQTBCO0FBQzVCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDhCQUE4QjtBQUNoQzs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTs7Ozs7RUFLRTs7QUFFRjtFQUNFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsY0FBYyxFQUFFLE1BQU07RUFDdEIsY0FBYyxFQUFFLE1BQU07RUFDdEIsZUFBZSxFQUFFLE1BQU07RUFDdkIsVUFBVSxFQUFFLE1BQU07RUFDbEIsbUJBQW1CLEVBQUUsTUFBTTtBQUM3Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsVUFBVSxFQUFFLE1BQU07QUFDcEI7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsWUFBWTtBQUNkOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDZCQUE2QixFQUFFLE1BQU07RUFDckMsb0JBQW9CLEVBQUUsTUFBTTtBQUM5Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGFBQWEsRUFBRSxNQUFNO0FBQ3ZCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOml0YWwsd2dodEAwLDEwMDswLDIwMDswLDMwMDswLDQwMDswLDUwMDswLDYwMDswLDcwMDswLDgwMDswLDkwMDsxLDEwMDsxLDIwMDsxLDMwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMDsxLDgwMDsxLDkwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcGVuK1NhbnMmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogcmVzZXQgc3R5bGVzICovXFxuKiB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogUG9wcGlucztcXG59XFxuXFxuaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG59XFxuXFxuLmp1c3RpZnktY2VudGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYWxpZ24tY2VudGVyIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAwKSB7XFxuXFxuICAuY29sLTEyLXhzIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XFxuXFxuICAuY29sLTUtc20ge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcblxcbiAgLmNvbC0yLXhsIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxufVxcblxcbi50ZXh0LXdoaXRlIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmNhcmQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAwLjc1cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJveC1zaGFkb3c6IDFweCAzcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuLmNhcmQgLmNhcmQtdGl0bGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjc1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxufVxcblxcbi5idG4tcHJpbWFyeSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNzY4OWY7XFxufVxcbi5idG4tcHJpbWFyeTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg3OGI3O1xcbn1cXG5cXG4uYnRuLWVycm9yIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I4NDA1ZTtcXG59XFxuLmJ0bi1lcnJvcjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzI1MDZjO1xcbn1cXG5cXG4ucC0xIHtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxufVxcblxcbi5tLTEge1xcbiAgbWFyZ2luOiAwLjc1cmVtO1xcbn1cXG5cXG4ubS0yIHtcXG4gIG1hcmdpbjogMS41cmVtO1xcbn1cXG5cXG4ubXQtMiB7XFxuICBtYXJnaW4tdG9wOiAxLjVyZW07XFxufVxcblxcbi5tYi0yIHtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcXG59XFxuXFxuLmZkLWMge1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQ0EsaUJBQWlCO0FBRWpCO0VBQ0UsY0FBYztFQUNkLFNBQVM7QUFDWDs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFO0lBQ0Usc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixXQUFXO0VBQ2I7QUFDRjtBQUNBOztFQUVFO0lBQ0Usc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixxQkFBcUI7RUFDdkI7QUFDRjtBQUNBOztFQUVFO0lBQ0Usc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixxQkFBcUI7RUFDdkI7QUFDRjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLDBDQUEwQztBQUM1QztBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YscUJBQXFCO0VBQ3JCLFNBQVM7RUFDVCx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7OztFQUdFLHNCQUFzQjtBQUN4QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOml0YWwsd2dodEAwLDEwMDswLDIwMDswLDMwMDswLDQwMDswLDUwMDswLDYwMDswLDcwMDswLDgwMDswLDkwMDsxLDEwMDsxLDIwMDsxLDMwMDsxLDQwMDsxLDUwMDsxLDYwMDsxLDcwMDsxLDgwMDsxLDkwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXG4vKiByZXNldCBzdHlsZXMgKi9cXG5AaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcGVuK1NhbnMmZGlzcGxheT1zd2FwXFxcIik7XFxuKiB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogUG9wcGlucztcXG59XFxuXFxuaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG59XFxuXFxuLmp1c3RpZnktY2VudGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYWxpZ24tY2VudGVyIHtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAwKSB7XFxuXFxuICAuY29sLTEyLXhzIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XFxuXFxuICAuY29sLTUtc20ge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcblxcbiAgLmNvbC0yLXhsIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICB3aWR0aDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxufVxcblxcbi50ZXh0LXdoaXRlIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmNhcmQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAwLjc1cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJveC1zaGFkb3c6IDFweCAzcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuLmNhcmQgLmNhcmQtdGl0bGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjc1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBib3JkZXItcmFkaXVzOiAwcHg7XFxufVxcblxcbi5idG4tcHJpbWFyeSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNzY4OWY7XFxufVxcbi5idG4tcHJpbWFyeTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg3OGI3O1xcbn1cXG5cXG4uYnRuLWVycm9yIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I4NDA1ZTtcXG59XFxuLmJ0bi1lcnJvcjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzI1MDZjO1xcbn1cXG5cXG4ucC0xIHtcXG4gIHBhZGRpbmc6IDAuNzVyZW07XFxufVxcblxcbi5tLTEge1xcbiAgbWFyZ2luOiAwLjc1cmVtO1xcbn1cXG5cXG4ubS0yIHtcXG4gIG1hcmdpbjogMS41cmVtO1xcbn1cXG5cXG4ubXQtMiB7XFxuICBtYXJnaW4tdG9wOiAxLjVyZW07XFxufVxcblxcbi5tYi0yIHtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcXG59XFxuXFxuLmZkLWMge1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjZjRmOWY5O1xcbiAgLS1wbGF5ZXJCb2FyZDogI2JhZDdkZjtcXG4gIC0tQUlib2FyZDogI2ZmZTJlMjtcXG4gIC0tZmxlZXQ6ICMwNzY3OWY1ZTtcXG4gIC0tc3VuazogI2Q4MjE0ODtcXG4gIC0taGl0OiAjMTJjYzk0O1xcbiAgLS1taXNzOiAjZTIzZTU3O1xcbiAgLS1ob3ZlcjogI2M0MDg4NWQ3O1xcbiAgLS1zaGlwOiAjMDc2ODlmO1xcbiAgLS1hbGlnbjogIzA3Njg5ZjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgLyogaGVpZ2h0OiAxMDB2aDsgKi9cXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsXFxuICAgICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJyxcXG4gICAgJ1NlZ29lIFVJIEVtb2ppJywgJ1NlZ29lIFVJIFN5bWJvbCc7XFxufVxcblxcbmltZyB7XFxuICBtYXgtd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IDVyZW07XFxufVxcblxcbi5oZWFkaW5nIHtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluO1xcbn1cXG5cXG4uaW5mby1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICAvKiAgIGhlaWdodDogMTAwdmg7ICovXFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ucmVzZXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG5cXG4uZ2FtZS1ncmlkIHtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbi5ncmlkLXAxLFxcbi5ncmlkLXBBSSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZC1wMTpob3ZlcixcXG4uZ3JpZC1wQUk6aG92ZXIge1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5yb3ctcDEsXFxuLnJvdy1wQUkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZmllbGQtcDEsXFxuLmZpZWxkLXBBSSB7XFxuICBib3JkZXI6IGRhc2hlZCAxcHggYmxhY2s7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmZpZWxkLXAxIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllckJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXBBSSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1BSWJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXAxOmhvdmVyLFxcbi5maWVsZC1wQUk6aG92ZXIge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDEyNSUpO1xcbn1cXG5cXG4ucDEtc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwKTtcXG59XFxuXFxuLnBsYWNlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mbGVldCk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyO1xcbiAgYW5pbWF0aW9uOiBwdWxzZSA1cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1bmspO1xcbiAgdHJhbnNpdGlvbjogYWxsIDEwMDBtcyBsaW5lYXI7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1pc3MpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaXQpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGhlaWdodDogMTV2aDtcXG4gIHdpZHRoOiAxNXZoO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmFsaWdubWVudC1pY29uLWhvcml6IHtcXG4gIGhlaWdodDogMXJlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWxpZ24pO1xcbn1cXG5cXG4udmVydCB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTUwbXMgZWFzZS1pbi1vdXQ7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcblxcbi5ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlcik7XFxufVxcblxcbi5maXJlIHtcXG4gIHRyYW5zaXRpb246IGFsbCA3NW1zIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxMjUlKTtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBsaW5lYXI7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIFxcXCJwdWxzZVxcXCIge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDJkZWcpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xcbiAgLmJvYXJkLXNldCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDQwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIC8qIHRyYW5zaXRpb246IGFsbCA1MG1zIGxpbmVhcjsgKi9cXG4gIH1cXG4gIC5mbGVldC1zZXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMHJlbTtcXG4gICAgcmlnaHQ6IC0yMHJlbTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwbXMgbGluZWFyO1xcbiAgfVxcblxcbiAgLmZsZWV0LXNldCA+IC5wMS1mbGVldC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLmZsZWV0LXNldCA+IC5wMS1mbGVldC1jb250YWluZXIgPiAuZmxlZXQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xcbiAgLmhlYWRpbmcge1xcbiAgICBmb250LXNpemU6IG1lZGl1bTtcXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixnQkFBZ0I7QUFDbEI7O0FBRUE7OztFQUdFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1QsbUJBQW1CO0VBQ25CLG1DQUFtQztFQUNuQzs7dUNBRXFDO0FBQ3ZDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osY0FBYztBQUNoQjs7QUFFQTs7RUFFRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDOztBQUVBOztFQUVFLGlCQUFpQjtBQUNuQjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBOztFQUVFLHdCQUF3QjtFQUN4QixZQUFZO0VBQ1osV0FBVztBQUNiO0FBQ0E7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7O0VBRUUsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsOEJBQThCO0VBQzlCLDRCQUE0QjtFQUM1QixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsNEJBQTRCO0VBQzVCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGlDQUFpQztFQUNqQyx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEMsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFO0lBQ0UsMkJBQTJCO0lBQzNCLG1CQUFtQjtJQUNuQix3QkFBd0I7RUFDMUI7RUFDQTtJQUNFLDZCQUE2QjtJQUM3QixxQkFBcUI7SUFDckIsdUJBQXVCO0VBQ3pCO0VBQ0E7SUFDRSwyQkFBMkI7SUFDM0IsbUJBQW1CO0lBQ25CLHdCQUF3QjtFQUMxQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxnQ0FBZ0M7SUFDaEMsaUNBQWlDO0VBQ25DO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULGFBQWE7SUFDYiwyQkFBMkI7RUFDN0I7O0VBRUE7SUFDRSxhQUFhO0lBQ2Isc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0VBQ3JCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgLS1iYWNrZ3JvdW5kOiAjZjRmOWY5O1xcbiAgLS1wbGF5ZXJCb2FyZDogI2JhZDdkZjtcXG4gIC0tQUlib2FyZDogI2ZmZTJlMjtcXG4gIC0tZmxlZXQ6ICMwNzY3OWY1ZTtcXG4gIC0tc3VuazogI2Q4MjE0ODtcXG4gIC0taGl0OiAjMTJjYzk0O1xcbiAgLS1taXNzOiAjZTIzZTU3O1xcbiAgLS1ob3ZlcjogI2M0MDg4NWQ3O1xcbiAgLS1zaGlwOiAjMDc2ODlmO1xcbiAgLS1hbGlnbjogIzA3Njg5ZjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgLyogaGVpZ2h0OiAxMDB2aDsgKi9cXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsXFxuICAgICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJyxcXG4gICAgJ1NlZ29lIFVJIEVtb2ppJywgJ1NlZ29lIFVJIFN5bWJvbCc7XFxufVxcblxcbmltZyB7XFxuICBtYXgtd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IDVyZW07XFxufVxcblxcbi5oZWFkaW5nIHtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluO1xcbn1cXG5cXG4uaW5mby1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICAvKiAgIGhlaWdodDogMTAwdmg7ICovXFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ucmVzZXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG5cXG4uZ2FtZS1ncmlkIHtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbi5ncmlkLXAxLFxcbi5ncmlkLXBBSSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZC1wMTpob3ZlcixcXG4uZ3JpZC1wQUk6aG92ZXIge1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5yb3ctcDEsXFxuLnJvdy1wQUkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZmllbGQtcDEsXFxuLmZpZWxkLXBBSSB7XFxuICBib3JkZXI6IGRhc2hlZCAxcHggYmxhY2s7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmZpZWxkLXAxIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllckJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXBBSSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1BSWJvYXJkKTtcXG59XFxuXFxuLmZpZWxkLXAxOmhvdmVyLFxcbi5maWVsZC1wQUk6aG92ZXIge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDEyNSUpO1xcbn1cXG5cXG4ucDEtc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwKTtcXG59XFxuXFxuLnBsYWNlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mbGVldCk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgbGluZWFyO1xcbiAgYW5pbWF0aW9uOiBwdWxzZSA1cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbi5zdW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1bmspO1xcbiAgdHJhbnNpdGlvbjogYWxsIDEwMDBtcyBsaW5lYXI7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1pc3MpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaXQpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGhlaWdodDogMTV2aDtcXG4gIHdpZHRoOiAxNXZoO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBib3JkZXI6IHNvbGlkIDFweCBibGFjaztcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmFsaWdubWVudC1pY29uLWhvcml6IHtcXG4gIGhlaWdodDogMXJlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWxpZ24pO1xcbn1cXG5cXG4udmVydCB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMTUwbXMgZWFzZS1pbi1vdXQ7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcblxcbi5ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlcik7XFxufVxcblxcbi5maXJlIHtcXG4gIHRyYW5zaXRpb246IGFsbCA3NW1zIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxMjUlKTtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gIHRyYW5zaXRpb246IGFsbCAxNTBtcyBsaW5lYXI7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIFxcXCJwdWxzZVxcXCIge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0yZGVnKTtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDJkZWcpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xcbiAgLmJvYXJkLXNldCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDQwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIC8qIHRyYW5zaXRpb246IGFsbCA1MG1zIGxpbmVhcjsgKi9cXG4gIH1cXG4gIC5mbGVldC1zZXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMHJlbTtcXG4gICAgcmlnaHQ6IC0yMHJlbTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDUwbXMgbGluZWFyO1xcbiAgfVxcblxcbiAgLmZsZWV0LXNldCA+IC5wMS1mbGVldC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLmZsZWV0LXNldCA+IC5wMS1mbGVldC1jb250YWluZXIgPiAuZmxlZXQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xcbiAgLmhlYWRpbmcge1xcbiAgICBmb250LXNpemU6IG1lZGl1bTtcXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5jc3MnO1xuaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCB7IHJ1bkdhbWUgfSBmcm9tICcuL21vZHVsZXMvZ2FtZSc7XG5cbnJ1bkdhbWUoKTtcbiJdLCJuYW1lcyI6WyJnYW1lb3ZlckNoZWNrIiwicmVwb3J0U3Vua1NoaXAiLCJ0dXJuQUkiLCJyZW5kZXJCb2FyZCIsInAxQm9hcmQiLCJwQUlCb2FyZCIsInBsYXllcjEiLCJwbGF5ZXJBSSIsInAxYm9hcmQiLCJwQUlib2FyZCIsInAxIiwicEFJIiwicDFHcmlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBBSUdyaWQiLCJjcmVhdGVHcmlkcyIsImlubmVySFRNTCIsImkiLCJyb3ciLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwiZWxlbWVudCIsImoiLCJmaWVsZCIsIm9jY3VwaWVkIiwiaGl0IiwiaW5uZXJUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZlcnQiLCJ2ZXJ0aWNhbCIsImhvcml6IiwiaG9yaXpvbnRhbCIsImF0dGFjayIsInBhcmVudFNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImNoaWxkRWxlbWVudENvdW50IiwiY2hpbGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiY29udGFpbnMiLCJib2FyZHMiLCJnYW1lYm9hcmRGYWN0b3J5Iiwic2V0dXBBSSIsInNldHVwUGxheWVyIiwiYWN0aXZhdGVQbGFjZW1lbnRCdXR0b25zIiwiYWN0aXZhdGVSZXNldEJ1dHRvbiIsInBsYXllckZhY3RvcnkiLCJwbGF5ZXJzIiwicnVuR2FtZSIsImdhbWVvdmVyIiwiaWQiLCJwdXNoIiwiYm9hcmQiLCJhbGxBcmVUcnVlIiwibXlGbGVldCIsImV2ZXJ5Iiwic2hpcCIsImlzU3VuayIsImNvbnNvbGUiLCJsb2ciLCJzaGlwRmFjdG9yeSIsImdhbWVib2FyZCIsInVuZGVmaW5lZCIsInBsYWNlU2hpcCIsInR5cGUiLCJsZW5ndGgiLCJjb29yZGluYXRlcyIsInBvc2l0aW9uIiwiaXRlbSIsImZpbmQiLCJyZWNpZXZlQXR0YWNrIiwib2JqZWN0IiwiYXJyYXkiLCJKU09OIiwic3RyaW5naWZ5IiwiaWxsZWdhbFBvc2l0aW9ucyIsImNvbHMiLCJyb3dzIiwiZ2V0UmFuZG9tRmllbGQiLCJyYW5kb21Ib3JpdG9udGFsIiwicmFuZG9tVmVydGljYWwiLCJyYW5kb21Qb3NpdGlvbiIsInJhbmRvbUFycmF5IiwicmFuZG9tT2JqZWN0IiwiZ2V0Q29vcmRpbmF0ZXMiLCJhbGlnbm1lbnQiLCJpbGxlZ2FsIiwidmFsaWRDb29yZGluYXRlcyIsImZsZWV0Iiwib3JpZW50YXRpb24iLCJwb3NpdGlvbnMiLCJhbGlnbiIsImNoZWNrUG9zaXRpb24iLCJzZWxlY3RlZEZpZWxkIiwiaW5jbHVkZXMiLCJjcmVhdGVQb3NpdGlvbiIsImNyZWF0ZUNvb3JkaW5hdGVzIiwicG9zIiwiYWRkaXRpb25hbENvb3JkaW5hdGVzIiwiYWRkaXRpb24iLCJhcnIiLCJzcGxpY2UiLCJzaGlmdCIsImNoZWNrSWxsZWdhbFBvc2l0aW9ucyIsInBsYWNlQ2FycmllciIsInNvbWUiLCJwbGFjZUJhdHRsZXNoaXAiLCJwbGFjZUNydWlzZXIiLCJwbGFjZVN1Ym1hcmluZSIsInBsYWNlRGVzdHJveWVyIiwiYm9hcmRDb250YWluZXIiLCJwMWluZm8iLCJmbGVldEhlYWRpbmciLCJwQUlDb250YWluZXIiLCJpbmZvQ29udGFpbmVyIiwiYWxpZ25tZW50QnRuIiwicDFGbGVldCIsImNhcnJpZXJCdG4iLCJiYXR0bGVzaGlwQnRuIiwiY3J1aXNlckJ0biIsInN1Ym1hcmluZUJ0biIsImRlc3Ryb3llckJ0biIsInRvZ2dsZSIsInBsYWNlUGxheWVyU2hpcHMiLCJwYXJlbnROb2RlIiwidG9Mb3dlckNhc2UiLCJzaGlwbmFtZSIsImJ0biIsImZpZWxkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJzZUludCIsInRleHRDb250ZW50IiwiYWxlcnQiLCJob3ZlckVmZmVjdCIsImNsYWltZWQiLCJyZXNldEJ0biIsImxvY2F0aW9uIiwicmVsb2FkIiwiY2xvc2VzdEVsZW1lbnQiLCJjbG9zZXN0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJuYW1lIiwiaXNBSSIsImlzQWN0aXZlIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ2YWxpZGF0ZVBvc2l0aW9uIiwiY2hlY2tlZCIsImhpdGJveCJdLCJzb3VyY2VSb290IjoiIn0=