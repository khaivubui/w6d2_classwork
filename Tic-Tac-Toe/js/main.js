const View = require('./ttt-view.js'); // require appropriate file
const Game = require('../solution/game.js'); // require appropriate file

$( () => {
  // Your code here
  const g = new Game();
  const $container = $('.ttt');
  const v = new View(g, $container);
  v.setupBoard();
  v.bindEvents();
});
