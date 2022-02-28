/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard),
/* harmony export */   "myFleet": () => (/* binding */ myFleet),
/* harmony export */   "gameboardFactory": () => (/* binding */ gameboardFactory)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* module decorator */ module = __webpack_require__.hmd(module);

/* const shipFactory = require('./ship'); */

var gameboard;
var myFleet = [];

var gameboardFactory = function gameboardFactory() {
  // a two dimensional array
  gameboard = {
    placeShip: function placeShip(id, length, coordinates) {
      var _this = this;

      // get the ship from the factory function and get its position
      var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(id, length, coordinates);
      var position = ship.coordinates;

      if (position[0] === null) {
        return;
      } // define the position to look for


      position.forEach(function (item) {
        var vert = item[0];
        var horiz = item[1];

        for (var property in gameboard) {
          for (var i = 0; i < gameboard[property].length; i++) {
            if (_this[property][i].vertical === vert && _this[property][i].horizontal === horiz) {
              _this[property][i].occupied = true;
              return;
            }
          }
        }
      });
      myFleet.push(ship);
    },
    recieveAttack: function recieveAttack() {// recieve coordinates of an attach and mark that field as hit
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


module.exports = {
  gameboardFactory: gameboardFactory,
  gameboard: gameboard,
  myFleet: myFleet
};

/***/ }),

/***/ "./src/modules/helpers.js":
/*!********************************!*\
  !*** ./src/modules/helpers.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCoordinates": () => (/* binding */ getCoordinates)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* module decorator */ module = __webpack_require__.hmd(module);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var getCoordinates = function getCoordinates(id, alignment, position) {
  var illegal = _gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard.illegalPositions;
  var validCoordinates = [];
  var fleet = [{
    id: 'carrier',
    length: 5
  }, {
    id: 'battleship',
    length: 4
  }, {
    id: 'cruiser',
    length: 3
  }, {
    id: 'submarine',
    length: 2
  }, {
    id: 'destroyer',
    length: 2
  }];
  var illegalPositions = [{
    id: 'carrier',
    orientation: 'horizontal',
    positions: [[0, 6], [0, 7], [0, 8], [0, 9], [1, 6], [1, 7], [1, 8], [1, 9], [2, 6], [2, 7], [2, 8], [2, 9], [3, 6], [3, 7], [3, 8], [3, 9], [4, 6], [4, 7], [4, 8], [4, 9], [5, 6], [5, 7], [5, 8], [5, 9], [6, 6], [6, 7], [6, 8], [6, 9], [7, 6], [7, 7], [7, 8], [7, 9], [8, 6], [8, 7], [8, 8], [8, 9], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    id: 'carrier',
    orientation: 'vertical',
    positions: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    id: 'battleship',
    orientation: 'horizontal',
    positions: [[0, 7], [0, 8], [0, 9], [1, 7], [1, 8], [1, 9], [2, 7], [2, 8], [2, 9], [3, 7], [3, 8], [3, 9], [4, 7], [4, 8], [4, 9], [5, 7], [5, 8], [5, 9], [6, 7], [6, 8], [6, 9], [7, 7], [7, 8], [7, 9], [8, 7], [8, 8], [8, 9], [9, 7], [9, 8], [9, 9]]
  }, {
    id: 'battleship',
    orientation: 'vertical',
    positions: [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    id: 'cruiser',
    orientation: 'horizontal',
    positions: [[0, 8], [0, 9], [1, 8], [1, 9], [2, 8], [2, 9], [3, 8], [3, 9], [4, 8], [4, 9], [5, 8], [5, 9], [6, 8], [6, 9], [7, 8], [7, 9], [8, 8], [8, 9], [9, 8], [9, 9]]
  }, {
    id: 'cruiser',
    orientation: 'vertical',
    positions: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    id: 'submarine',
    orientation: 'horizontal',
    positions: [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]]
  }, {
    id: 'submarine',
    orientation: 'vertical',
    positions: [[9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    id: 'destroyer',
    orientation: 'horizontal',
    positions: [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]]
  }, {
    id: 'destroyer',
    orientation: 'vertical',
    positions: [[9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
  }, {
    id: 'occupied',
    positions: []
  }];
  illegalPositions[10].positions.push(illegal);
  var ship = id;
  var align = alignment; // horizotal or vertical

  var checkPosition = function checkPosition() {
    var selectedField = position; // [0, 1]
    // check of selected field is inside the game grid

    for (var i = 0; i < illegalPositions.length; i++) {
      if (illegalPositions[i].id === ship && illegalPositions[i].orientation === align && JSON.stringify(illegalPositions[i].positions).includes(selectedField)) {
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
      if (item.id === ship) {
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
      if (JSON.stringify(_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard.illegalPositions).includes(item)) {
        coordinates = [null];
      }
    });

    if (coordinates !== null) {
      coordinates.forEach(function (item) {
        _gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard.illegalPositions.push(item);
      });
    } else return;

    return coordinates;
  };

  validCoordinates.push(checkPosition());
  createPosition();
  return checkIllegalPositions(validCoordinates);
};


module.exports = getCoordinates;

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
var shipFactory = function shipFactory(id, length, coordinates) {
  return {
    id: id,
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


module.exports = shipFactory;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
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

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

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
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _modules_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/helpers */ "./src/modules/helpers.js");
/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/ship */ "./src/modules/ship.js");




var test = (0,_modules_gameboard__WEBPACK_IMPORTED_MODULE_1__.gameboardFactory)();
var flotte = _modules_gameboard__WEBPACK_IMPORTED_MODULE_1__.myFleet;
var board = document.getElementById('board');
var btn1 = document.getElementById('ship1');
var btn2 = document.getElementById('ship2');
board.addEventListener('click', function () {
  (0,_modules_gameboard__WEBPACK_IMPORTED_MODULE_1__.gameboardFactory)();
  console.log(test);
});
btn1.addEventListener('click', function () {
  test.placeShip('carrier', 5, (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_2__.getCoordinates)('carrier', 'horizontal', [0, 5]));
  console.log(test);
  console.log(flotte);
});
btn2.addEventListener('click', function () {
  test.placeShip('battleship', 4, (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_2__.getCoordinates)('battleship', 'vertical', [1, 2]));
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGlwRmFjdG9yeSB9IGZyb20gJy4vc2hpcCc7XG5cbi8qIGNvbnN0IHNoaXBGYWN0b3J5ID0gcmVxdWlyZSgnLi9zaGlwJyk7ICovXG5cbmxldCBnYW1lYm9hcmQ7XG5jb25zdCBteUZsZWV0ID0gW107XG5cbmNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIC8vIGEgdHdvIGRpbWVuc2lvbmFsIGFycmF5XG4gIGdhbWVib2FyZCA9IHtcbiAgICBwbGFjZVNoaXAoaWQsIGxlbmd0aCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIC8vIGdldCB0aGUgc2hpcCBmcm9tIHRoZSBmYWN0b3J5IGZ1bmN0aW9uIGFuZCBnZXQgaXRzIHBvc2l0aW9uXG4gICAgICBjb25zdCBzaGlwID0gc2hpcEZhY3RvcnkoaWQsIGxlbmd0aCwgY29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBzaGlwLmNvb3JkaW5hdGVzO1xuXG4gICAgICBpZiAocG9zaXRpb25bMF0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWZpbmUgdGhlIHBvc2l0aW9uIHRvIGxvb2sgZm9yXG4gICAgICBwb3NpdGlvbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHZlcnQgPSBpdGVtWzBdO1xuICAgICAgICBjb25zdCBob3JpeiA9IGl0ZW1bMV07XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBnYW1lYm9hcmQpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZFtwcm9wZXJ0eV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eV1baV0udmVydGljYWwgPT09IHZlcnQgJiZcbiAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eV1baV0uaG9yaXpvbnRhbCA9PT0gaG9yaXpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5XVtpXS5vY2N1cGllZCA9IHRydWU7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBteUZsZWV0LnB1c2goc2hpcCk7XG4gICAgfSxcbiAgICByZWNpZXZlQXR0YWNrKCkge1xuICAgICAgLy8gcmVjaWV2ZSBjb29yZGluYXRlcyBvZiBhbiBhdHRhY2ggYW5kIG1hcmsgdGhhdCBmaWVsZCBhcyBoaXRcbiAgICB9LFxuICAgIGlsbGVnYWxQb3NpdGlvbnM6IFtdLFxuICB9O1xuXG4gIGNvbnN0IGNvbHMgPSAxMDtcbiAgY29uc3Qgcm93cyA9IDEwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHM7IGkrKykge1xuICAgIGdhbWVib2FyZFtpXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93czsgaisrKSB7XG4gICAgICBnYW1lYm9hcmRbaV0ucHVzaCh7XG4gICAgICAgIHZlcnRpY2FsOiBpLFxuICAgICAgICBob3Jpem9udGFsOiBqLFxuICAgICAgICBvY2N1cGllZDogZmFsc2UsXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZCwgbXlGbGVldCwgZ2FtZWJvYXJkRmFjdG9yeSB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZ2FtZWJvYXJkRmFjdG9yeSwgZ2FtZWJvYXJkLCBteUZsZWV0IH07XG4iLCJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IGdldENvb3JkaW5hdGVzID0gKGlkLCBhbGlnbm1lbnQsIHBvc2l0aW9uKSA9PiB7XG4gIGNvbnN0IGlsbGVnYWwgPSBnYW1lYm9hcmQuaWxsZWdhbFBvc2l0aW9ucztcbiAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IFtdO1xuICBjb25zdCBmbGVldCA9IFtcbiAgICB7XG4gICAgICBpZDogJ2NhcnJpZXInLFxuICAgICAgbGVuZ3RoOiA1LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdiYXR0bGVzaGlwJyxcbiAgICAgIGxlbmd0aDogNCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnY3J1aXNlcicsXG4gICAgICBsZW5ndGg6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3N1Ym1hcmluZScsXG4gICAgICBsZW5ndGg6IDIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2Rlc3Ryb3llcicsXG4gICAgICBsZW5ndGg6IDIsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBpbGxlZ2FsUG9zaXRpb25zID0gW1xuICAgIHtcbiAgICAgIGlkOiAnY2FycmllcicsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA2XSxcbiAgICAgICAgWzAsIDddLFxuICAgICAgICBbMCwgOF0sXG4gICAgICAgIFswLCA5XSxcbiAgICAgICAgWzEsIDZdLFxuICAgICAgICBbMSwgN10sXG4gICAgICAgIFsxLCA4XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgNl0sXG4gICAgICAgIFsyLCA3XSxcbiAgICAgICAgWzIsIDhdLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA2XSxcbiAgICAgICAgWzMsIDddLFxuICAgICAgICBbMywgOF0sXG4gICAgICAgIFszLCA5XSxcbiAgICAgICAgWzQsIDZdLFxuICAgICAgICBbNCwgN10sXG4gICAgICAgIFs0LCA4XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgNl0sXG4gICAgICAgIFs1LCA3XSxcbiAgICAgICAgWzUsIDhdLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA2XSxcbiAgICAgICAgWzYsIDddLFxuICAgICAgICBbNiwgOF0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDZdLFxuICAgICAgICBbNywgN10sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgNl0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2NhcnJpZXInLFxuICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzYsIDBdLFxuICAgICAgICBbNiwgMV0sXG4gICAgICAgIFs2LCAyXSxcbiAgICAgICAgWzYsIDNdLFxuICAgICAgICBbNiwgNF0sXG4gICAgICAgIFs2LCA1XSxcbiAgICAgICAgWzYsIDZdLFxuICAgICAgICBbNiwgN10sXG4gICAgICAgIFs2LCA4XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgMF0sXG4gICAgICAgIFs3LCAxXSxcbiAgICAgICAgWzcsIDJdLFxuICAgICAgICBbNywgM10sXG4gICAgICAgIFs3LCA0XSxcbiAgICAgICAgWzcsIDVdLFxuICAgICAgICBbNywgNl0sXG4gICAgICAgIFs3LCA3XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCAwXSxcbiAgICAgICAgWzgsIDFdLFxuICAgICAgICBbOCwgMl0sXG4gICAgICAgIFs4LCAzXSxcbiAgICAgICAgWzgsIDRdLFxuICAgICAgICBbOCwgNV0sXG4gICAgICAgIFs4LCA2XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDBdLFxuICAgICAgICBbOSwgMV0sXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgICAgICBbOSwgNF0sXG4gICAgICAgIFs5LCA1XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnYmF0dGxlc2hpcCcsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA3XSxcbiAgICAgICAgWzAsIDhdLFxuICAgICAgICBbMCwgOV0sXG4gICAgICAgIFsxLCA3XSxcbiAgICAgICAgWzEsIDhdLFxuICAgICAgICBbMSwgOV0sXG4gICAgICAgIFsyLCA3XSxcbiAgICAgICAgWzIsIDhdLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA3XSxcbiAgICAgICAgWzMsIDhdLFxuICAgICAgICBbMywgOV0sXG4gICAgICAgIFs0LCA3XSxcbiAgICAgICAgWzQsIDhdLFxuICAgICAgICBbNCwgOV0sXG4gICAgICAgIFs1LCA3XSxcbiAgICAgICAgWzUsIDhdLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA3XSxcbiAgICAgICAgWzYsIDhdLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCA3XSxcbiAgICAgICAgWzcsIDhdLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCA3XSxcbiAgICAgICAgWzgsIDhdLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdiYXR0bGVzaGlwJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs3LCAwXSxcbiAgICAgICAgWzcsIDFdLFxuICAgICAgICBbNywgMl0sXG4gICAgICAgIFs3LCAzXSxcbiAgICAgICAgWzcsIDRdLFxuICAgICAgICBbNywgNV0sXG4gICAgICAgIFs3LCA2XSxcbiAgICAgICAgWzcsIDddLFxuICAgICAgICBbNywgOF0sXG4gICAgICAgIFs3LCA5XSxcbiAgICAgICAgWzgsIDBdLFxuICAgICAgICBbOCwgMV0sXG4gICAgICAgIFs4LCAyXSxcbiAgICAgICAgWzgsIDNdLFxuICAgICAgICBbOCwgNF0sXG4gICAgICAgIFs4LCA1XSxcbiAgICAgICAgWzgsIDZdLFxuICAgICAgICBbOCwgN10sXG4gICAgICAgIFs4LCA4XSxcbiAgICAgICAgWzgsIDldLFxuICAgICAgICBbOSwgMF0sXG4gICAgICAgIFs5LCAxXSxcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgICAgIFs5LCA0XSxcbiAgICAgICAgWzksIDVdLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdjcnVpc2VyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzAsIDhdLFxuICAgICAgICBbMCwgOV0sXG4gICAgICAgIFsxLCA4XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgOF0sXG4gICAgICAgIFsyLCA5XSxcbiAgICAgICAgWzMsIDhdLFxuICAgICAgICBbMywgOV0sXG4gICAgICAgIFs0LCA4XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgOF0sXG4gICAgICAgIFs1LCA5XSxcbiAgICAgICAgWzYsIDhdLFxuICAgICAgICBbNiwgOV0sXG4gICAgICAgIFs3LCA4XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdjcnVpc2VyJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs4LCAwXSxcbiAgICAgICAgWzgsIDFdLFxuICAgICAgICBbOCwgMl0sXG4gICAgICAgIFs4LCAzXSxcbiAgICAgICAgWzgsIDRdLFxuICAgICAgICBbOCwgNV0sXG4gICAgICAgIFs4LCA2XSxcbiAgICAgICAgWzgsIDddLFxuICAgICAgICBbOCwgOF0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDBdLFxuICAgICAgICBbOSwgMV0sXG4gICAgICAgIFs5LCAyXSxcbiAgICAgICAgWzksIDNdLFxuICAgICAgICBbOSwgNF0sXG4gICAgICAgIFs5LCA1XSxcbiAgICAgICAgWzksIDZdLFxuICAgICAgICBbOSwgN10sXG4gICAgICAgIFs5LCA4XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnc3VibWFyaW5lJyxcbiAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBwb3NpdGlvbnM6IFtcbiAgICAgICAgWzAsIDldLFxuICAgICAgICBbMSwgOV0sXG4gICAgICAgIFsyLCA5XSxcbiAgICAgICAgWzMsIDldLFxuICAgICAgICBbNCwgOV0sXG4gICAgICAgIFs1LCA5XSxcbiAgICAgICAgWzYsIDldLFxuICAgICAgICBbNywgOV0sXG4gICAgICAgIFs4LCA5XSxcbiAgICAgICAgWzksIDldLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnc3VibWFyaW5lJyxcbiAgICAgIG9yaWVudGF0aW9uOiAndmVydGljYWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFs5LCAwXSxcbiAgICAgICAgWzksIDFdLFxuICAgICAgICBbOSwgMl0sXG4gICAgICAgIFs5LCAzXSxcbiAgICAgICAgWzksIDRdLFxuICAgICAgICBbOSwgNV0sXG4gICAgICAgIFs5LCA2XSxcbiAgICAgICAgWzksIDddLFxuICAgICAgICBbOSwgOF0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2Rlc3Ryb3llcicsXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgcG9zaXRpb25zOiBbXG4gICAgICAgIFswLCA5XSxcbiAgICAgICAgWzEsIDldLFxuICAgICAgICBbMiwgOV0sXG4gICAgICAgIFszLCA5XSxcbiAgICAgICAgWzQsIDldLFxuICAgICAgICBbNSwgOV0sXG4gICAgICAgIFs2LCA5XSxcbiAgICAgICAgWzcsIDldLFxuICAgICAgICBbOCwgOV0sXG4gICAgICAgIFs5LCA5XSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2Rlc3Ryb3llcicsXG4gICAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgIHBvc2l0aW9uczogW1xuICAgICAgICBbOSwgMF0sXG4gICAgICAgIFs5LCAxXSxcbiAgICAgICAgWzksIDJdLFxuICAgICAgICBbOSwgM10sXG4gICAgICAgIFs5LCA0XSxcbiAgICAgICAgWzksIDVdLFxuICAgICAgICBbOSwgNl0sXG4gICAgICAgIFs5LCA3XSxcbiAgICAgICAgWzksIDhdLFxuICAgICAgICBbOSwgOV0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdvY2N1cGllZCcsXG4gICAgICBwb3NpdGlvbnM6IFtdLFxuICAgIH0sXG4gIF07XG5cbiAgaWxsZWdhbFBvc2l0aW9uc1sxMF0ucG9zaXRpb25zLnB1c2goaWxsZWdhbCk7XG5cbiAgY29uc3Qgc2hpcCA9IGlkO1xuICBjb25zdCBhbGlnbiA9IGFsaWdubWVudDsgLy8gaG9yaXpvdGFsIG9yIHZlcnRpY2FsXG5cbiAgY29uc3QgY2hlY2tQb3NpdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZEZpZWxkID0gcG9zaXRpb247IC8vIFswLCAxXVxuXG4gICAgLy8gY2hlY2sgb2Ygc2VsZWN0ZWQgZmllbGQgaXMgaW5zaWRlIHRoZSBnYW1lIGdyaWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlsbGVnYWxQb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgaWxsZWdhbFBvc2l0aW9uc1tpXS5pZCA9PT0gc2hpcCAmJlxuICAgICAgICBpbGxlZ2FsUG9zaXRpb25zW2ldLm9yaWVudGF0aW9uID09PSBhbGlnbiAmJlxuICAgICAgICBKU09OLnN0cmluZ2lmeShpbGxlZ2FsUG9zaXRpb25zW2ldLnBvc2l0aW9ucykuaW5jbHVkZXMoc2VsZWN0ZWRGaWVsZClcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLmxvZygnaWxsZWdhbCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWxsZWdhbFBvc2l0aW9uc1sxMF0ucG9zaXRpb25zLnB1c2goc2VsZWN0ZWRGaWVsZCk7XG4gICAgcmV0dXJuIHNlbGVjdGVkRmllbGQ7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgbGV0IGxlbmd0aDtcblxuICAgIGZsZWV0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmlkID09PSBzaGlwKSB7XG4gICAgICAgIGxlbmd0aCA9IGl0ZW0ubGVuZ3RoO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlQ29vcmRpbmF0ZXMgPSAoKCkgPT4ge1xuICAgICAgLy8gcmV0dXJuIGlzIG5vIHZhbGlkIHBvc2l0aW9uIGlzIHJldHVybmVkIGZyb20gY2hlY2tQb3NpdGlvblxuICAgICAgaWYgKHZhbGlkQ29vcmRpbmF0ZXNbMF0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcG9zID0gWy4uLnZhbGlkQ29vcmRpbmF0ZXNbMF1dO1xuICAgICAgY29uc3QgYWRkaXRpb25hbENvb3JkaW5hdGVzID0gW107XG5cbiAgICAgIC8vIGdldCB0aGUgbnVtYmVyIGNvcnJlc3BvbmRpbmcgdG8gdGhlIFwiaG9yaXpvbnRhbFwiIGF4aXMgaW4gdGhlIGdhbWVib2FyZC1hcnJheVxuICAgICAgLy8gcmVwZWF0IFwibGVuZ3RoXCItdGltZXNcbiAgICAgIGlmIChhbGlnbm1lbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gYWRkIDEgdG8gdGhhdCBudW1iZXIgYW5kIHB1c2ggbmV3IGNvb3JkaW5hdGVzIHRvIGFkZGl0aW9uYWxDb29yZGluYXRlcy1hcnJheVxuICAgICAgICAgIGNvbnN0IGFkZGl0aW9uID0gcG9zWzFdICsgMTtcbiAgICAgICAgICBjb25zdCBhcnIgPSBwb3Muc3BsaWNlKDEsIDEsIGFkZGl0aW9uKTtcbiAgICAgICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMucHVzaChbcG9zWzBdLCBhcnJbMF1dKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhbGlnbm1lbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGFkZGl0aW9uID0gcG9zWzBdICsgMTtcbiAgICAgICAgICBjb25zdCBhcnIgPSBwb3Muc3BsaWNlKDAsIDEsIGFkZGl0aW9uKTtcbiAgICAgICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMucHVzaChbYXJyWzBdLCBwb3NbMV1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIGZpcnN0IGl0ZW0gdG8gcHJldmVudCBkdXBsaWNhdGUgY29vcmRpbmF0ZXNcbiAgICAgIGFkZGl0aW9uYWxDb29yZGluYXRlcy5zaGlmdCgpO1xuXG4gICAgICBhZGRpdGlvbmFsQ29vcmRpbmF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YWxpZENvb3JkaW5hdGVzLnB1c2goaXRlbSk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSWxsZWdhbFBvc2l0aW9ucyA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChKU09OLnN0cmluZ2lmeShnYW1lYm9hcmQuaWxsZWdhbFBvc2l0aW9ucykuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBbbnVsbF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNvb3JkaW5hdGVzICE9PSBudWxsKSB7XG4gICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGdhbWVib2FyZC5pbGxlZ2FsUG9zaXRpb25zLnB1c2goaXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgcmV0dXJuO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9O1xuXG4gIHZhbGlkQ29vcmRpbmF0ZXMucHVzaChjaGVja1Bvc2l0aW9uKCkpO1xuICBjcmVhdGVQb3NpdGlvbigpO1xuICByZXR1cm4gY2hlY2tJbGxlZ2FsUG9zaXRpb25zKHZhbGlkQ29vcmRpbmF0ZXMpO1xufTtcblxuZXhwb3J0IHsgZ2V0Q29vcmRpbmF0ZXMgfTtcbm1vZHVsZS5leHBvcnRzID0gZ2V0Q29vcmRpbmF0ZXM7XG4iLCJjb25zdCBzaGlwRmFjdG9yeSA9IChpZCwgbGVuZ3RoLCBjb29yZGluYXRlcykgPT4gKHtcbiAgaWQsXG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMsXG4gIGhpdGJveDogW10sXG4gIGhpdChwb3NpdGlvbikge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLmNvb3JkaW5hdGVzKS5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgIHRoaXMuaGl0Ym94LnB1c2gocG9zaXRpb24pO1xuICAgIH1cbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiAhIShcbiAgICAgIHRoaXMuaGl0Ym94Lmxlbmd0aCA+PSAwICYmIHRoaXMuaGl0Ym94Lmxlbmd0aCA+PSB0aGlzLmNvb3JkaW5hdGVzLmxlbmd0aFxuICAgICk7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgc2hpcEZhY3RvcnkgfTtcbm1vZHVsZS5leHBvcnRzID0gc2hpcEZhY3Rvcnk7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIG15RmxlZXQgfSBmcm9tICcuL21vZHVsZXMvZ2FtZWJvYXJkJztcbmltcG9ydCB7IGdldENvb3JkaW5hdGVzIH0gZnJvbSAnLi9tb2R1bGVzL2hlbHBlcnMnO1xuaW1wb3J0IHsgc2hpcEZhY3RvcnkgfSBmcm9tICcuL21vZHVsZXMvc2hpcCc7XG5cbmNvbnN0IHRlc3QgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5cbmNvbnN0IGZsb3R0ZSA9IG15RmxlZXQ7XG5cbmNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJyk7XG5jb25zdCBidG4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXAxJyk7XG5jb25zdCBidG4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXAyJyk7XG5cbmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBnYW1lYm9hcmRGYWN0b3J5KCk7XG4gIGNvbnNvbGUubG9nKHRlc3QpO1xufSk7XG5cbmJ0bjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHRlc3QucGxhY2VTaGlwKCdjYXJyaWVyJywgNSwgZ2V0Q29vcmRpbmF0ZXMoJ2NhcnJpZXInLCAnaG9yaXpvbnRhbCcsIFswLCA1XSkpO1xuICBjb25zb2xlLmxvZyh0ZXN0KTtcbiAgY29uc29sZS5sb2coZmxvdHRlKTtcbn0pO1xuXG5idG4yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB0ZXN0LnBsYWNlU2hpcChcbiAgICAnYmF0dGxlc2hpcCcsXG4gICAgNCxcbiAgICBnZXRDb29yZGluYXRlcygnYmF0dGxlc2hpcCcsICd2ZXJ0aWNhbCcsIFsxLCAyXSlcbiAgKTtcbiAgY29uc29sZS5sb2codGVzdCk7XG4gIGNvbnNvbGUubG9nKGZsb3R0ZSk7XG59KTtcblxuLyogdGVzdC5wbGFjZVNoaXAoJ2NhcnJpZXInLCA1LCBnZXRDb29yZGluYXRlcygnY2FycmllcicsICdob3Jpem9udGFsJywgWzAsIDVdKSk7XG5cbnRlc3QucGxhY2VTaGlwKFxuICAnYmF0dGxlc2hpcCcsXG4gIDQsXG4gIGdldENvb3JkaW5hdGVzKCdiYXR0bGVzaGlwJywgJ3ZlcnRpY2FsJywgWzEsIDJdKVxuKTtcblxudGVzdC5wbGFjZVNoaXAoXG4gICdiYXR0bGVzaGlwJyxcbiAgNCxcbiAgZ2V0Q29vcmRpbmF0ZXMoJ2JhdHRsZXNoaXAnLCAnaG9yaXpvbnRhbCcsIFsxLCAxXSlcbik7ICovXG5cbi8qIGV4cG9ydCB7IG15RmxlZXQsIGdhbWVib2FyZCB9OyAqL1xuIl0sIm5hbWVzIjpbInNoaXBGYWN0b3J5IiwiZ2FtZWJvYXJkIiwibXlGbGVldCIsImdhbWVib2FyZEZhY3RvcnkiLCJwbGFjZVNoaXAiLCJpZCIsImxlbmd0aCIsImNvb3JkaW5hdGVzIiwic2hpcCIsInBvc2l0aW9uIiwiZm9yRWFjaCIsIml0ZW0iLCJ2ZXJ0IiwiaG9yaXoiLCJwcm9wZXJ0eSIsImkiLCJ2ZXJ0aWNhbCIsImhvcml6b250YWwiLCJvY2N1cGllZCIsInB1c2giLCJyZWNpZXZlQXR0YWNrIiwiaWxsZWdhbFBvc2l0aW9ucyIsImNvbHMiLCJyb3dzIiwiaiIsImhpdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRDb29yZGluYXRlcyIsImFsaWdubWVudCIsImlsbGVnYWwiLCJ2YWxpZENvb3JkaW5hdGVzIiwiZmxlZXQiLCJvcmllbnRhdGlvbiIsInBvc2l0aW9ucyIsImFsaWduIiwiY2hlY2tQb3NpdGlvbiIsInNlbGVjdGVkRmllbGQiLCJKU09OIiwic3RyaW5naWZ5IiwiaW5jbHVkZXMiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlUG9zaXRpb24iLCJjcmVhdGVDb29yZGluYXRlcyIsInBvcyIsImFkZGl0aW9uYWxDb29yZGluYXRlcyIsImFkZGl0aW9uIiwiYXJyIiwic3BsaWNlIiwic2hpZnQiLCJjaGVja0lsbGVnYWxQb3NpdGlvbnMiLCJoaXRib3giLCJpc1N1bmsiLCJ0ZXN0IiwiZmxvdHRlIiwiYm9hcmQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYnRuMSIsImJ0bjIiLCJhZGRFdmVudExpc3RlbmVyIl0sInNvdXJjZVJvb3QiOiIifQ==