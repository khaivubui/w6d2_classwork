class Snake {
  constructor () {
    this.direction = 'D';
    this.segments = [[0,0]];
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
    this.segments.push(this.coordInFront());
    this.segments.shift();
  }
}

Snake.DIRECTIONS = ['W', 'A', 'S', 'D'];

module.exports = Snake;
