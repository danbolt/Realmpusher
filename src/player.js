var Player = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'test16x16', 13);

  this.walkSpeed = 100;
  this.disableMovement = false;

  this.animations.add('idle_right', [21]);
  this.animations.add('idle_down', [13]);
  this.animations.add('idle_left', [29]);
  this.animations.add('idle_up', [37]);
  this.animations.add('walk_right', [22, 23], 4, true);
  this.animations.add('walk_down', [14, 15], 4, true);
  this.animations.add('walk_left', [30, 31], 4, true);
  this.animations.add('walk_up', [38, 39], 4, true);
  this.animations.play('idle_down');

  this.facing = Directions.SOUTH;

  this.gamepad = this.game.input.gamepad.pad1;

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(10, 8);
  this.body.offset.x = 3;
  this.body.offset.y = 8;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
  if (this.disableMovement === false)
  {
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT) || this.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.3) {
      this.body.velocity.x = this.walkSpeed;

      this.facing = Directions.EAST;
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT) || this.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.3) {
      this.body.velocity.x = -this.walkSpeed;

      this.facing = Directions.WEST;
    } else {
      this.body.velocity.x = 0;
    }

    if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN) || this.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.3) {
      this.body.velocity.y = this.walkSpeed;

      this.facing = Directions.SOUTH;
    } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP) || this.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.3) {
      this.body.velocity.y = -this.walkSpeed;

      this.facing = Directions.NORTH;
    } else {
      this.body.velocity.y = 0;
    }
  }
  else 
  {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }

  if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
    switch (this.facing) {
      case Directions.EAST:
        this.animations.play('idle_right');
        break;
      case Directions.SOUTH:
        this.animations.play('idle_down');
        break;
      case Directions.WEST:
        this.animations.play('idle_left');
        break;
      case Directions.NORTH:
        this.animations.play('idle_up');
        break;
    }
  } else {
    switch (this.facing) {
      case Directions.EAST:
        this.animations.play('walk_right');
        break;
      case Directions.SOUTH:
        this.animations.play('walk_down');
        break;
      case Directions.WEST:
        this.animations.play('walk_left');
        break;
      case Directions.NORTH:
        this.animations.play('walk_up');
        break;
    }
  }
};