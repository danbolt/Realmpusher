var Player = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'test16x16', 5);

  this.walkSpeed = 100;
  this.disableMovement = false;

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
  if (this.disableMovement === false)
  {
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
      this.body.velocity.x = this.walkSpeed;
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
      this.body.velocity.x = -this.walkSpeed;
    } else {
      this.body.velocity.x = 0;
    }

    if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      this.body.velocity.y = this.walkSpeed;
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      this.body.velocity.y = -this.walkSpeed;
    } else {
      this.body.velocity.y = 0;
    }
  }
  else 
  {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
};