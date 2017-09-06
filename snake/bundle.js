/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(3);


$(() => {
  const $main = $('.snakegame');
  const v = new View($main);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Snake {
  constructor (board) {
    this.board = board;
    this.direction = 'D';
    this.segments = [[0,0]];
  }

  oppositeDirection() {
    switch (this.direction) {
      case 'W':
        return 'S';
      case 'A':
        return 'D';
      case 'S':
        return 'W';
      case 'D':
        return 'A';
    }
  }

  length() {
    return this.segments.length;
  }

  head() {
    return this.segments[this.length() - 1];
  }

  coordInFront() {
    const head = this.head();
    const row = head[0];
    const col = head[1];
    let coordInFront;
    switch (this.direction) {
      case 'W':
        coordInFront = [row - 1, col];
        break;
      case 'A':
        coordInFront = [row, col - 1];
        break;
      case 'S':
        coordInFront = [row + 1, col];
        break;
      case 'D':
        coordInFront = [row, col + 1];
        break;
    }
    return coordInFront;
  }

  move() {
    const coordInFront = this.coordInFront();
    const apple = this.board.apple;
    if (coordInFront[0] === apple[0] &&
        coordInFront[1] === apple[1]) {
      this.segments.push(coordInFront);
      this.board.generateApple();
    }
    this.segments.push(coordInFront);
    this.segments.shift();
  }
}

Snake.DIRECTIONS = ['W', 'A', 'S', 'D'];

module.exports = Snake;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(1);

class Board {
  constructor() {
    this.snake = new Snake(this);
    this.apple = [Math.round(Math.random() * 20),
                  Math.round(Math.random() * 20)];
  }

  generateApple() {
    this.apple = [Math.round(Math.random() * 20),
                  Math.round(Math.random() * 20)];
  }
}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);
const Snake = __webpack_require__(1);

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    $(document).on('keydown', (e) => {
      const keyPressed = String.fromCharCode(e.keyCode);
      if (Snake.DIRECTIONS.includes(keyPressed)) {
        if (!(this.board.snake.oppositeDirection() ===
            keyPressed)) {
          this.board.snake.direction = keyPressed;
        }
      }
    });

    this.setupBoard();
    this.render();

    setInterval(() => {
      this.step();
      this.render();
    }, 100);
  }

  setupBoard() {
    for (var row = 0; row < 20; row++) {
      const $row = $('<ul>');
      $row.addClass('row');
      $row.attr('data-row', row);

      for (var col = 0; col < 20; col++) {
        const $cell = $('<li>');
        $cell.addClass('cell');
        $cell.attr('data-row', row);
        $cell.attr('data-col', col);
        $row.append($cell);
      }

      this.$el.append($row);
    }
  }

  render() {
    const snake = this.board.snake;
    const apple = this.board.apple;
    $('li').removeClass('snake').removeClass('apple');
    $(`li[data-row=${apple[0]}][data-col=${apple[1]}]`).addClass('apple');
    snake.segments.forEach((segment) => {
      const row = segment[0];
      const col = segment[1];
      console.log(snake.segments);
      $(`li[data-row=${row}][data-col=${col}]`).addClass('snake');
    });
  }

  step() {
    this.board.snake.move();
  }
}

module.exports = View;


/***/ })
/******/ ]);