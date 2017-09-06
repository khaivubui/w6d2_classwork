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
