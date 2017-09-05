

class View {
  constructor(game, $dom) {
    this.game = game;
    this.$dom = $dom;
    this.setupTowers();
    this.render();
    this.clickTower();
  }

  setupTowers() {
    for (let stack = 0; stack < 3; stack++) {
      const $stack = $('<ul>');
      $stack.addClass('stack');
      $stack.attr('data-stack', stack);
      for (let slot = 0; slot < 3; slot++) {
        const $li = $('<li>');
        $li.attr('data-stack', stack);
        $li.attr('data-slot', slot);
        $stack.append($li);
      }

      this.$dom.append($stack);
    }
  }

  render() {
    $('li').removeClass('disc-1').removeClass('disc-2').removeClass('disc-3');
    const towers = this.game.towers;
    for (let stack = 0; stack < 3; stack++) {
      if (towers[stack].length > 0) {
        for (let slot = 0; slot < towers[stack].length; slot++) {
          const discSize = towers[stack][slot];
          $(`li[data-stack=${stack}][data-slot=${slot}]`).addClass(`disc-${discSize}`);
        }
      }
    }
  }

  clickTower() {
    let startTowerIdx;
    let endTowerIdx;
    const view = this;
    $('ul').on('click', function () {
      if (typeof startTowerIdx !== 'undefined') {
        endTowerIdx = $(this).attr('data-stack');
        endTowerIdx = parseInt(endTowerIdx);
        view.game.move(startTowerIdx, endTowerIdx);
        view.render();
        startTowerIdx = undefined;
        endTowerIdx = undefined;
        $('ul').css('border-color', 'black');
        if (view.game.isWon()) {
          view.$dom.parent().append($('<h1>YOU WON</h1>'));
          $('ul').off('click');
        }
      } else {
        startTowerIdx = $(this).attr('data-stack');
        startTowerIdx = parseInt(startTowerIdx);
        $(this).css('border-color', '#3498db');
      }
      console.log(startTowerIdx, endTowerIdx);
    });
  }

}

module.exports = View;
