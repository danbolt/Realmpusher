var MagicOrb = function (game, x, y, index) {
  Phaser.Sprite.call(this, game, x, y, 'test16x16', 1 + index);

  this.anchor.set(0.5, 0.5);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.moves = false; // we are tweening this object

  this.index = index;

  var bobble = this.game.add.tween(this);
  bobble.to({ y: this.y - 10 }, 1700, Phaser.Easing.Cubic.InOut, true, 100, -1, true);
};
MagicOrb.prototype = Object.create(Phaser.Sprite.prototype);
MagicOrb.prototype.constructor = MagicOrb;


