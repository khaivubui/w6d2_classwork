class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents() {
    const game = this.game;
    const view = this;
    $('li').on('click', function () {

      // this === li item
      const row = $(this).data('row');
      const col = $(this).data('col');

      const pos = [parseInt(row), parseInt(col)];
      try {
        game.playMove(pos);
      } catch (e) {
        alert(e.msg);
      }
      view.makeMove($(this));
    });

  }

  makeMove($square) {


    $square.css('background-color', 'white');
    $square.text(this.game.currentPlayer);
    $square.css('color', (this.game.currentPlayer === 'x' ? 'blue' : 'red'));

    if (this.game.isOver()) {
      this.$el.append($(`<h1>${this.game.currentPlayer.toUpperCase()} WON</h1>`));
      $('li').off('click');
      $(`li:contains(${this.game.currentPlayer})`).css('background-color', 'purple');
    }
  }

  setupBoard() {
    const $row = $('<ul></ul>');
    const $square = $('<li></li>');
    $square.addClass('group square');
    $row.addClass('group row');
    $row.append($square.clone()).append($square.clone()).append($square.clone());

    this.$el.append($row.clone()) ;

    this.$el.append($row.clone()) ;
    this.$el.append($row.clone()) ;

    const $li = $('li');
    $li.each( function(index) {
      $(this).attr('data-row', Math.floor(index / 3))
            .attr('data-col', index % 3);
    });
  }
}

module.exports = View;
