var Gameplay = function () {
  this.player = null;
};

Gameplay.prototype.placeRoomOnMap = function(roomIndex, x, y) {
  for (var xi = 0; xi < RoomSize.Width; xi++) {
    for (var yi = 0; yi < RoomSize.Height; yi++) {
      var tile = this.map.getTile(180 + xi, (roomIndex * RoomSize.Height) + yi, this.foreground);

      this.map.putTile(tile, x * RoomSize.Width + xi, y * RoomSize.Height + yi, this.foreground);
    }
  }
};
Gameplay.prototype.clearRoomOnArea = function(x, y) {
  for (var xi = 0; xi < RoomSize.Width; xi++) {
    for (var yi = 0; yi < RoomSize.Height; yi++) {
      this.map.removeTile(x * RoomSize.Width + xi, y * RoomSize.Height + yi, this.foreground);
    }
  }
};

Gameplay.prototype.init = function() {
  //
};
Gameplay.prototype.preload = function() {
  //
};
Gameplay.prototype.create = function() {
  // closure context
  var that = this;

  // create map
  this.map = this.game.add.tilemap('level1');
  this.map.addTilesetImage('sheet', 'test16x16_tile');
  this.background = this.map.createLayer('Background');
  this.foreground = this.map.createLayer('Foreground');
  this.map.setCollisionByExclusion([0], true, this.foreground);

  // sample text
  this.game.add.bitmapText(16, 16, 'font', 'font', 8);

  // enable collision detections with map
  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);

  this.placeRoomOnMap(0, 2, 2);
  this.placeRoomOnMap(8, 1, 5);
  this.clearRoomOnArea(2, 2);
};
Gameplay.prototype.update = function () {
  //
};
Gameplay.prototype.shutdown = function () {
  this.player = null;
};