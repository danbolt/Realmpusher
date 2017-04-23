var MagicOrb = function (game, x, y, index) {
  Phaser.Sprite.call(this, game, x, y, 'test16x16', 1 + index);

  this.anchor.set(0.5, 0.5);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.moves = false; // we are tweening this object

  this.index = index;

  var bobble = this.game.add.tween(this);
  bobble.to({ y: this.y - 10 }, 1700, Phaser.Easing.Cubic.InOut, true, 100, -1, true);

  var emitter = this.game.add.emitter(0, 0, 30);
  emitter.makeParticles('test16x16', [35, 36]);
  emitter.gravity = 0;
  emitter.lifespan = 350;
  emitter.setScale();
  emitter.setRotation();
  var emitLoop = this.game.time.events.loop(100, function () { 
    for (var i = 0; i < 2; i++) {
      emitter.emitParticle(this.x, this.y);
    }
  }, this);

  this.events.onKilled.add(function () {
    SoundBank['item_get'].play();

    this.game.time.events.remove(emitLoop);
    emitter.lifespan = 1000;
    for (var i = 0; i < 10; i++) {
      emitter.setXSpeed(500 * Math.cos(i / 10 * Math.PI * 2), 500 * Math.cos(i / 10 * Math.PI * 2));
      emitter.setYSpeed(500 * Math.sin(i / 10 * Math.PI * 2), 500 * Math.sin(i / 10 * Math.PI * 2));
      emitter.emitParticle(this.x, this.y);
    }
  }, this);
};
MagicOrb.prototype = Object.create(Phaser.Sprite.prototype);
MagicOrb.prototype.constructor = MagicOrb;


