var OriginalRooms = [
  { x: 2, y: 1, doors: [false, true, false, true] },
  { x: 2, y: 2, doors: [false, true, false, true] },
  { x: 4, y: 4, doors: [false, true, true, false] },
  { x: 0, y: 2, doors: [false, true, true, false] },
  { x: 5, y: 1, doors: [true, true, false, false] },
  { x: 1, y: 5, doors: [true, false, false, true] },
  { x: 3, y: 3, doors: [true, true, true, true] },
  { x: 1, y: 0, goal: true, doors: [true, false, false, false] },
  { x: 3, y: 0, goal: true, doors: [false, true, false, false] },
  { x: 5, y: 2, goal: true, doors: [false, false, true, false] },
  { x: 3, y: 5, goal: true, doors: [false, false, true, false] },
  { x: 5, y: 5, goal: true, doors: [false, false, true, false] },
];


var Rooms = [
  { x: 0, y: 0 },
  { x: 3, y: 5 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 6 },
  { x: 1, y: 0, goal: true },
  { x: 3, y: 0, goal: true },
  { x: 5, y: 2, goal: true },
  { x: 3, y: 6, goal: true },
  { x: 6, y: 6, goal: true },
];
Rooms.startingRoom = 6;


var Gameplay = function () {
  this.player = null;
  this.magicOrbs = null;
};

var isIndexAPushableBlock = function(index) {
  return (index >= 59 && index <= 64);
}

Gameplay.prototype.placeRoomOnMap = function(roomIndex, x, y) {
  for (var xi = 0; xi < RoomSize.Width; xi++) {
    for (var yi = 0; yi < RoomSize.Height; yi++) {
      var tile = this.map.getTile(180 + xi, (roomIndex * RoomSize.Height) + yi, this.foreground);
      this.map.putTile(tile, x * RoomSize.Width + xi, y * RoomSize.Height + yi, this.foreground);

      var tile2 = this.map.getTile(180 + xi, (roomIndex * RoomSize.Height) + yi, this.background);
      this.map.putTile(tile2, x * RoomSize.Width + xi, y * RoomSize.Height + yi, this.background);
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
Gameplay.prototype.initializeRoomsOnMap = function(reset) {
  // reset all rooms
  for (var i = 0; i < OriginalRooms.length; i++) {
    Rooms[i].x = OriginalRooms[i].x;
    Rooms[i].y = OriginalRooms[i].y;
    Rooms[i].doors = OriginalRooms[i].doors;
  }

  if (reset) {
    this.placeRoomOnMap(Rooms.startingRoom, Rooms[Rooms.startingRoom].x, Rooms[Rooms.startingRoom].y);

    this.game.camera.shake(0.008, 350);
  } else {
    var goalCount = 0;

    Rooms.forEach(function (room, index) {
      this.placeRoomOnMap(index, room.x, room.y);

      if (room.goal) {
        var newOrb = this.game.add.existing(new MagicOrb(this.game, (room.x + 0.5) * RoomSize.Width * 16, (room.y + 0.25) * RoomSize.Height * 16, goalCount));
        this.magicOrbs.push(newOrb);
        goalCount++;
      }
    }, this);
  }


  for (var xi = 0; xi < 6; xi++) {
    for (var yi = 0; yi < 6; yi++) {
      this.map.removeTile(BlockOffsetX + Rooms[Rooms.startingRoom].x * RoomSize.Width + xi, BlockOffsetY + Rooms[Rooms.startingRoom].y * RoomSize.Height + yi, this.foreground);
    }
  }
  Rooms.forEach(function (room, index) {
    var blockTile = this.map.putTile((index === Rooms.startingRoom || room.goal) ? (53 + (index - 6)) : (59 + index), BlockOffsetX + Rooms[Rooms.startingRoom].x * RoomSize.Width + room.x, BlockOffsetY + Rooms[Rooms.startingRoom].y * RoomSize.Height + room.y, this.foreground);
    blockTile.roomIndex = index;
  }, this);
};
Gameplay.prototype.moveRoom = function(roomIndex, destX, destY) {
  var data = this.map.copy(180, roomIndex * RoomSize.Height, RoomSize.Width, RoomSize.Height, this.foreground);
  this.map.paste(destX * RoomSize.Width, destY * RoomSize.Height, data, this.foreground);
  var bgData = this.map.copy(180, roomIndex * RoomSize.Height, RoomSize.Width, RoomSize.Height, this.background);
  this.map.paste(destX * RoomSize.Width, destY * RoomSize.Height, bgData, this.background);
  Rooms[roomIndex].x = destX;
  Rooms[roomIndex].y = destY;

  var openDoor = function(index, direction) {
    var room = Rooms[index];

    if (direction === Directions.EAST) {
      for (var iy = 4; iy < 9; iy++) {
        this.map.removeTile(room.x * (RoomSize.Width) + (RoomSize.Width - 1), room.y * RoomSize.Height + iy, this.foreground);
      }
    }

    if (direction === Directions.WEST) {
      for (var iy = 4; iy < 9; iy++) {
        this.map.removeTile(room.x * RoomSize.Width, room.y * RoomSize.Height + iy, this.foreground);
      }
    }

    if (direction === Directions.SOUTH) {
      for (var ix = 8; ix < 12; ix++) {
        this.map.removeTile(room.x * (RoomSize.Width) + ix, room.y * (RoomSize.Height) + (RoomSize.Height - 1), this.foreground);
      }
    }

    if (direction === Directions.NORTH) {
      for (var ix = 8; ix < 12; ix++) {
        this.map.removeTile(room.x * (RoomSize.Width) + ix, room.y * (RoomSize.Height), this.foreground);
      }
    }
  };

  var closeDoor = function(index, direction) {
    var room = Rooms[index];

    if (direction === Directions.EAST) {
      for (var iy = 4; iy < 9; iy++) {
        if (this.map.getTile(room.x * (RoomSize.Width) + (RoomSize.Width - 1), room.y * RoomSize.Height + iy, this.foreground, true).index === -1) {
          this.map.putTile(this.map.getTile(room.x * (RoomSize.Width), room.y * RoomSize.Height, this.foreground, true).index, room.x * (RoomSize.Width) + (RoomSize.Width - 1), room.y * RoomSize.Height + iy, this.foreground);
        }
      }
    }

    if (direction === Directions.WEST) {
      for (var iy = 4; iy < 9; iy++) {
        if (this.map.getTile(room.x * RoomSize.Width, room.y * RoomSize.Height + iy, this.foreground, true).index === -1) {
          this.map.putTile(this.map.getTile(room.x * (RoomSize.Width), room.y * RoomSize.Height, this.foreground, true).index, room.x * RoomSize.Width, room.y * RoomSize.Height + iy, this.foreground);
        }
      }
    }

    if (direction === Directions.SOUTH) {
      for (var ix = 8; ix < 12; ix++) {
        if (this.map.getTile(room.x * (RoomSize.Width) + ix, room.y * (RoomSize.Height) + (RoomSize.Height - 1), this.foreground, true).index === -1) {
          this.map.putTile(this.map.getTile(room.x * (RoomSize.Width), room.y * RoomSize.Height, this.foreground, true).index, room.x * (RoomSize.Width) + ix, room.y * (RoomSize.Height) + (RoomSize.Height - 1), this.foreground);
        }
      }
    }

    if (direction === Directions.NORTH) {
      for (var ix = 8; ix < 12; ix++) {
        if (this.map.getTile(room.x * (RoomSize.Width) + ix, room.y * (RoomSize.Height), this.foreground, true).index === -1) {
          this.map.putTile(this.map.getTile(room.x * (RoomSize.Width), room.y * RoomSize.Height, this.foreground, true).index, room.x * (RoomSize.Width) + ix, room.y * (RoomSize.Height), this.foreground);
        }
      }
    }
  };

  // Open/close doors that are necessary for the new construction
  Rooms.forEach(function (room, index) {
    var opened = [false, false, false, false];

    Rooms.forEach(function (otherRoom, otherIndex) {
      // check east doors
      if (room.x + 1 === otherRoom.x && room.y === otherRoom.y && (room.doors[Directions.EAST] && otherRoom.doors[Directions.WEST])) {
        openDoor.call(this, index, Directions.EAST);
        openDoor.call(this, otherIndex, Directions.WEST);

        opened[Directions.EAST] = true;
      }

      // check west doors
      if (room.x - 1 === otherRoom.x && room.y === otherRoom.y && (room.doors[Directions.WEST] && otherRoom.doors[Directions.EAST])) {
        openDoor.call(this, index, Directions.WEST);
        openDoor.call(this, otherIndex, Directions.EAST);

        opened[Directions.WEST] = true;
      }

      // check south doors
      if (room.x === otherRoom.x && room.y + 1 === otherRoom.y && (room.doors[Directions.SOUTH] && otherRoom.doors[Directions.NORTH])) {
        openDoor.call(this, index, Directions.SOUTH);
        openDoor.call(this, otherIndex, Directions.NORTH);

        opened[Directions.SOUTH] = true;
      }

      // check north doors
      if (room.x === otherRoom.x && room.y - 1 === otherRoom.y && (room.doors[Directions.NORTH] && otherRoom.doors[Directions.SOUTH])) {
        openDoor.call(this, index, Directions.NORTH);
        openDoor.call(this, otherIndex, Directions.SOUTH);

        opened[Directions.NORTH] = true;
      }
    }, this);

    // close any doors that were opened
    for (var i = 0; i < Directions.COUNT; i++) {
      if (opened[i] === false) {
        closeDoor.call(this, index, i);
      }
    }
  }, this);
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

  this.foundOrbs = [false, false, false, false, false];

  // create map
  this.map = this.game.add.tilemap('level1');
  this.map.addTilesetImage('sheet', 'test16x16_tile');
  this.background = this.map.createLayer('Background');
  this.foreground = this.map.createLayer('Foreground');
  this.map.setCollisionByExclusion([0], true, this.foreground);

  // enable collision detections with map
  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);

  this.magicOrbs = [];

  this.initializeRoomsOnMap();

  this.player = this.game.add.existing(new Player(this.game, 16 * Rooms[Rooms.startingRoom].x * RoomSize.Width + (RoomSize.Width * 16 / 2), 16 * Rooms[Rooms.startingRoom].y * RoomSize.Height + (RoomSize.Width * 16 / 2)));
  this.scrolling = false;

  this.game.camera.bounds = null;
  this.game.camera.setPosition(this.getRoomXFromWorldX(this.player.x) * RoomSize.Width * 16, this.getRoomYFromWorldY(this.player.y) * RoomSize.Height * 16);

  // Allow the player to reset  the map if we're in the starting room
  var resetKey = this.game.input.keyboard.addKey(Phaser.KeyCode.R);
  resetKey.onDown.add(function () {
    if ((this.player.x >= (Rooms[Rooms.startingRoom].x * RoomSize.Width * 16)) && 
        (this.player.x < ((Rooms[Rooms.startingRoom].x + 1) * RoomSize.Width * 16)) && 
        (this.player.y >= (Rooms[Rooms.startingRoom].y * RoomSize.Height * 16)) && 
        (this.player.y < ((Rooms[Rooms.startingRoom].y + 1) * RoomSize.Height * 16))) {
      this.initializeRoomsOnMap(true);
    }
  }, this);
};
Gameplay.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.foreground, undefined, function (player, tile) {
    var topCornerX = Rooms[Rooms.startingRoom].x * RoomSize.Width + BlockOffsetX;
    var topCornerY = Rooms[Rooms.startingRoom].y * RoomSize.Height + BlockOffsetY;

    if ( isIndexAPushableBlock(tile.index)) {
      // push right
      if (player.x < tile.worldX && player.body.velocity.x > 0) {
        if (this.map.getTile(tile.x + 1, tile.y, this.foreground) === null && ((tile.x + 1) <= (topCornerX + 6))) {
          var newTile = this.map.putTile(tile.index, tile.x + 1, tile.y, this.foreground);
          newTile.roomIndex = tile.roomIndex;
          this.map.removeTile(tile.x, tile.y, this.foreground);
          this.moveRoom(tile.roomIndex, Rooms[tile.roomIndex].x + 1, Rooms[tile.roomIndex].y);
          this.game.camera.shake(0.008, 250);

          return false;
        }
      }

      // push left
      if (player.x > tile.worldX && player.body.velocity.x < 0) {
        if (this.map.getTile(tile.x - 1, tile.y, this.foreground) === null && (tile.x - 1 >= topCornerX)) {
          var newTile = this.map.putTile(tile.index, tile.x - 1, tile.y, this.foreground);
          newTile.roomIndex = tile.roomIndex;
          this.map.removeTile(tile.x, tile.y, this.foreground);
          this.moveRoom(tile.roomIndex, Rooms[tile.roomIndex].x - 1, Rooms[tile.roomIndex].y);
          this.game.camera.shake(0.008, 250);

          return false;
        }
      }

      // push down
      if (player.y < tile.worldY && player.body.velocity.y > 0) {
        if (this.map.getTile(tile.x, tile.y + 1, this.foreground) === null && ((tile.y + 1) <= (topCornerY + 6))) {
          var newTile = this.map.putTile(tile.index, tile.x, tile.y + 1, this.foreground);
          newTile.roomIndex = tile.roomIndex;
          this.map.removeTile(tile.x, tile.y, this.foreground);
          this.moveRoom(tile.roomIndex, Rooms[tile.roomIndex].x, Rooms[tile.roomIndex].y + 1);
          this.game.camera.shake(0.008, 250);

          return false;
        }
      }

      // push up
      if (player.y > tile.worldY && player.body.velocity.y < 0) {
        if (this.map.getTile(tile.x, tile.y - 1, this.foreground) === null && (tile.y - 1 >= topCornerY)) {
          var newTile = this.map.putTile(tile.index, tile.x, tile.y - 1, this.foreground);
          newTile.roomIndex = tile.roomIndex;
          this.map.removeTile(tile.x, tile.y, this.foreground);
          this.moveRoom(tile.roomIndex, Rooms[tile.roomIndex].x, Rooms[tile.roomIndex].y - 1);
          this.game.camera.shake(0.008, 250);

          return false;
        }
      }
    }

    return true;
  }, this);
  this.game.physics.arcade.collide(this.player, this.magicOrbs, function (player, orb) {
    this.foundOrbs[orb.index] = true;

    orb.kill();

    // if we've found all five orbs, we've won the puzzle
    if (this.foundOrbs[0] && this.foundOrbs[1] && this.foundOrbs[2] && this.foundOrbs[3] && this.foundOrbs[4]) {
      this.player.disableMovement = true;
      this.player.facing = Directions.SOUTH;

      this.game.time.events.add(1000, function () {
        this.game.state.start('WinScreen');
      }, this);
    }
  }, undefined, this);

  if (this.scrolling === false && this.game.camera.view.contains(this.player.x, this.player.y) === false) {
    this.scrolling = true;
    this.player.disableMovement = true;

    this.tweenCameraToPlayersRoom(this.getRoomXFromWorldX(this.player.x), this.getRoomYFromWorldY(this.player.y));
  }
};
Gameplay.prototype.shutdown = function () {
  this.player = null;
  this.magicOrbs = null;
  this.foundOrbs = [false, false, false, false, false];
};