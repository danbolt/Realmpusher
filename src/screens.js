var TitleScreen = function () {
  //
};
TitleScreen.prototype.create = function() {
  this.game.add.bitmapText(16, 16, 'font', 'title screen yo', 8);
};

var WinScreen = function () {
  //
};
WinScreen.prototype.create = function () {
  this.game.add.bitmapText(16, 16, 'font', 'you win k', 8);
};