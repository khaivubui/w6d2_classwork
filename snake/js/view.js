const Board = require('./board.js');
const Snake = require('./snake.js');

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
