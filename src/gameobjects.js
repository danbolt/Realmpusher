var RoomBlock = function (game, x, y, roomIndex) {
  Phaser.Sprite.call(this, game, ~~(x / 16) * 16, ~~(y / 16) * 16, 'test16x16', 6);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.roomIndex = roomIndex;
};
RoomBlock.prototype = Object.create(Phaser.Sprite.prototype);
RoomBlock.prototype.constructor = RoomBlock;


