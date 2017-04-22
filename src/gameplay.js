var Rooms = [
  { x: 0, y: 0 },
  { x: 3, y: 5 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 6 }
];


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
Gameplay.prototype.initializeRoomsOnMap = function() {
  Rooms.forEach(function (room, index) {
    this.placeRoomOnMap(index, room.x, room.y);
  }, this);
};
Gameplay.prototype.moveRoom = function(roomIndex, destX, destY) {
  this.clearRoomOnArea(Rooms[roomIndex].x, Rooms[roomIndex].y);
  this.placeRoomOnMap(roomIndex, destX, destY);
  Rooms[roomIndex].x = destX;
  Rooms[roomIndex].y = destY;
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

  this.initializeRoomsOnMap();
};
Gameplay.prototype.update = function () {
  //
};
Gameplay.prototype.shutdown = function () {
  this.player = null;
};