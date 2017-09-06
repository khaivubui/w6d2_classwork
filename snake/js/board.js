const Snake = require('./snake.js');

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
