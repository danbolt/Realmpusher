var TitleScreen = function () {
  //
};
TitleScreen.prototype.create = function() {

  var logo = this.game.add.image(this.game.width / 2 * -2, this.game.height / 4 + 16, 'logo');
  logo.anchor.set(0.5, 0.5);

  var infoText = this.game.add.bitmapText(this.game.width / 2, 200 + this.game.height / 3 * 2, 'font', 'arrow keys to move\n\n\nalign the blocks to step among the\nrealms and find the magic orbs\n\n\npress enter to start', 8);
  infoText.align = 'center';
  infoText.anchor.set(0.5);

  var copyrightText = this.game.add.bitmapText(this.game.width - 4, 32 + this.game.height - 4, 'font', 'Game by Daniel Savage #ld38', 8);
  copyrightText.anchor.setTo(1);
  copyrightText.align = 'right';

  var playerDupe = this.game.add.sprite(-16, this.game.height / 4 + 16, 'test16x16', 0);
  playerDupe.anchor.set(0.5, 0.5);
  playerDupe.animations.add('run', [22, 23], 4, true);
  playerDupe.animations.play('run');

  var infoTextTween = this.game.add.tween(infoText);
  infoTextTween.to( {y: this.game.height / 3 * 2}, 300);
  var copyrightTween = this.game.add.tween(copyrightText);
  copyrightTween.to( {y: this.game.height - 4}, 100, undefined, false, 200);
  var logoTween = this.game.add.tween(logo);
  logoTween.to( {x: this.game.width / 2 }, 1000);
  logoTween.onComplete.add(function () {
    infoTextTween.start();
    copyrightTween.start();
  }, this);
  var playerTween = this.game.add.tween(playerDupe);
  playerTween.to( {x: this.game.width + 17}, 1350);
  playerTween.onComplete.add(function () { logoTween.start(); }, this);

  var startGameKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  startGameKey.onUp.add(function () {
    SoundBank['select'].play();
    this.game.input.keyboard.removeKey(startGameKey);
    this.game.state.start('Gameplay');
  }, this);

  this.game.input.gamepad.onDownCallback = function (buttonCode) {
    if (buttonCode === Phaser.Gamepad.XBOX360_START) {
      SoundBank['select'].play();
      this.game.state.start('Gameplay');
      this.game.input.gamepad.onDownCallback = null;
      this.game.input.keyboard.removeKey(startGameKey);
    }
  };

  playerTween.start();
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