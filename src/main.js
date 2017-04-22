var Preload = function () {
	//
};
Preload.prototype.init = function() {
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.refresh();

  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;

  // enable crisp rendering
  this.game.stage.smoothed = false;
  this.game.renderer.renderSession.roundPixels = true;  
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL

  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

  this.game.input.gamepad.start();
};
Preload.prototype.preload = function() {

  // Font is Gamegirl Classic by freakyfonts
  // License is for noncommercial use
  // http://www.fontspace.com/freaky-fonts/gamegirl-classic
  this.game.load.bitmapFont('font', 'asset/font/font.png', 'asset/font/font.json');
};
Preload.prototype.create = function() {

  var instructions = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 , 'font', 'loading...\n\nPlease wait!', 8);
  instructions.align = 'center';
  instructions.anchor.x = 0.5;

  this.game.input.gamepad.start();

 	this.game.state.start('Load', false);
};

var main = function () {
	console.log('hello, jam! 😊');

	var game = new Phaser.Game(320, 240);
	game.state.add('Gameplay', Gameplay, false);
	game.state.add('Load', Load, false);
	game.state.add('Preload', Preload, false);

	game.state.start('Preload');
};