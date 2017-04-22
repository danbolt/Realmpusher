var Rooms = [
  { x: 0, y: 0 },
  { x: 3, y: 5 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 6 }
];
Rooms.startingRoom = 1;


var Gameplay = function () {
  this.player = null;
  this.roomBlocks = [];
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

Gameplay.prototype.tweenCameraToPlayersRoom = function (x, y) {
  var t = this.game.add.tween(this.game.camera);
  t.to({ x: (16 * RoomSize.Width * x), y: (16 * RoomSize.Height * y) }, 300);
  t.onComplete.add(function () { this.scrolling = false; this.player.disableMovement = false; }, this);
  t.start();
};
Gameplay.prototype.getRoomXFromWorldX = function(x) {
  return ~~((x / 16) / RoomSize.Width);
};
Gameplay.prototype.getRoomYFromWorldY = function(y) {
  return ~~((y / 16) / RoomSize.Height);
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

  this.player = this.game.add.existing(new Player(this.game, 16 * Rooms[Rooms.startingRoom].x * RoomSize.Width + (RoomSize.Width * 16 / 2), 16 * Rooms[Rooms.startingRoom].y * RoomSize.Height + (RoomSize.Width * 16 / 2)));
  this.scrolling = false;

  this.roomBlocks = [];
  var testRoomBlock = this.game.add.existing(new RoomBlock(this.game, 16 * Rooms[Rooms.startingRoom].x * RoomSize.Width + 128, 16 * Rooms[Rooms.startingRoom].y * RoomSize.Height + 128, 1));
  this.roomBlocks.push(testRoomBlock);

  this.game.camera.bounds = null;
  this.game.camera.setPosition(this.getRoomXFromWorldX(this.player.x) * RoomSize.Width * 16, this.getRoomYFromWorldY(this.player.y) * RoomSize.Height * 16);
};
Gameplay.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.foreground);
  this.game.physics.arcade.collide(this.player, this.roomBlocks);

  if (this.scrolling === false && this.game.camera.view.contains(this.player.x, this.player.y) === false) {
    this.scrolling = true;
    this.player.disableMovement = true;

    this.tweenCameraToPlayersRoom(this.getRoomXFromWorldX(this.player.x), this.getRoomYFromWorldY(this.player.y));
  }
};
Gameplay.prototype.shutdown = function () {
  this.player = null;
  this.roomBlocks = null;
};