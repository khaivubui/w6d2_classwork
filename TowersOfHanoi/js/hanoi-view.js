

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
    $('li').on('click', function () {
      if (typeof startTowerIdx === undefined) {
        endTowerIdx = $(this).attr('data-stack');
        endTowerIdx = parseInt(endTowerIdx);
      } else {
        startTowerIdx = $(this).attr('data-stack');
        startTowerIdx = parseInt(startTowerIdx);
      }
      console.log(startTowerIdx, endTowerIdx);
    });
  }

}

module.exports = View;
