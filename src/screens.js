var TitleScreen = function () {
  //
};
TitleScreen.prototype.create = function() {

  var logo = this.game.add.image(this.game.width / 2 * -2, this.game.height / 4 + 16, 'logo');
  logo.anchor.set(0.5, 0.5);

  var infoText = this.game.add.bitmapText(this.game.width / 2, 200 + this.game.height / 3 * 2, 'font', 'arrow keys to move\n\n\nalign the blocks to step among the\nsmall worlds and find the magic orbs\n\n\npress enter to start', 8);
  infoText.align = 'center';
  infoText.anchor.set(0.5);

  var copyrightText = this.game.add.bitmapText(this.game.width - 4, 32 + this.game.height - 4, 'font', 'Game by Daniel Savage #ld38', 8);
  copyrightText.anchor.setTo(1);
  copyrightText.align = 'right';

  var playerDupe = this.game.add.sprite(-16, this.game.height / 4 + 16, 'test16x16', 0);
  playerDupe.addChild(this.game.add.sprite(10, -8, 'test16x16', 58 + ~~(Math.random() * 6)));
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
  playerTween.to( {x: this.game.width + 17}, 2000);
  playerTween.onComplete.add(function () {
    this.game.time.events.remove(emitLoop);
    logoTween.start();
  }, this);


  var emitter = this.game.add.emitter(0, 0, 30);
  emitter.makeParticles('test16x16', [36]);
  emitter.gravity = 0;
  emitter.lifespan = 250;
  emitter.setScale();
  emitter.setRotation();
  this.emitter = emitter;
  var emitLoop = this.game.time.events.loop(200, function () { 
    for (var i = 0; i < 2; i++) {
      emitter.emitParticle(playerDupe.left + 4, playerDupe.bottom);
    }
  }, this);

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
WinScreen.prototype.init = function (winTime) {
  this.winTime = winTime ? winTime : '???';
}
WinScreen.prototype.create = function () {
  var infoText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'font', 'you won! well done!\n\n\nyour time was ' + this.winTime +' seconds\n\nthink you can top it?\n\n\nPress enter to return to the title\n\nscreen.', 8);
  infoText.align = 'center';
  infoText.anchor.set(0.5);

  var startGameKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  startGameKey.onUp.add(function () {
    this.game.input.keyboard.removeKey(startGameKey);
    this.game.state.start('TitleScreen');
      SoundBank['select'].play();
  }, this);

  this.game.input.gamepad.onDownCallback = function (buttonCode) {
    if (buttonCode === Phaser.Gamepad.XBOX360_START) {
      this.game.state.start('TitleScreen');
      this.game.input.gamepad.onDownCallback = null;
      this.game.input.keyboard.removeKey(startGameKey);
      SoundBank['select'].play();
    }
  };
};