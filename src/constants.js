var Directions = {
  EAST : 0,
  SOUTH : 1,
  WEST : 2,
  NORTH : 3,

  COUNT : 4,
};

var soundEffectsToLoad = ['push0',
                          'push1',
                          'push2',
                          'item_get',
                          'reset',
                          'select'
                          ];
/*
var soundEffectsToLoad = ['alarm',
                          'bip',
                          'codec',
                          'exclaim',
                          'hurt',
                          'select',
                          'shoot1',
                          'shoot2',
                          'shoot3'];
                          */

var SoundBank = {};

var RoomSize = { Width: 20, Height: 15 };
var MarginX = 180;

var BlockOffsetX = 6;
var BlockOffsetY = 4;