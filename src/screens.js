var TitleScreen = function () {
  //
};
TitleScreen.prototype.create = function() {
  var infoText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 3 * 2 + 8, 'font', 'arrow keys to move\n\nmove the blocks to step among the\nrealms and find the magic orbs\n\n\npress enter to start', 8);
  infoText.align = 'center';
  infoText.anchor.set(0.5);

  var copyrightText = this.game.add.bitmapText(this.game.width - 4, this.game.height - 4, 'font', 'Game by Daniel Savage #ld38', 8);
  copyrightText.anchor.setTo(1);
  copyrightText.align = 'right';

  var startGameKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  startGameKey.onUp.add(function () {
    this.game.input.keyboard.removeKey(startGameKey);
    this.game.state.start('Gameplay');
  }, this);

  this.game.input.gamepad.onDownCallback = function (buttonCode) {
    if (buttonCode === Phaser.Gamepad.XBOX360_START) {
      this.game.state.start('Gameplay');
      this.game.input.gamepad.onDownCallback = null;
      this.game.input.keyboard.removeKey(startGameKey);
    }
  };
};

var WinScreen = function () {
  //
};
WinScreen.prototype.create = function () {
  this.game.add.bitmapText(16, 16, 'font', 'you win k', 8);

  var startGameKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  startGameKey.onUp.add(function () {
    this.game.input.keyboard.removeKey(startGameKey);
    this.game.state.start('TitleScreen');
  }, this);

  this.game.input.gamepad.onDownCallback = function (buttonCode) {
    if (buttonCode === Phaser.Gamepad.XBOX360_START) {
      this.game.state.start('TitleScreen');
      this.game.input.gamepad.onDownCallback = null;
      this.game.input.keyboard.removeKey(startGameKey);
    }
  };
};