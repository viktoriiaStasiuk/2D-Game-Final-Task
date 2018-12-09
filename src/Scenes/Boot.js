import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.levels = {
      1: 'level1',
      2: 'level2'
    };
    this.load.tilemapTiledJSON('level1', 'assets/tilemaps/level1.json');
    this.load.tilemapTiledJSON('level2', 'assets/tilemaps/level2.json');

    this.load.spritesheet('RPGpack_sheet', 'assets/images/RPGpack_sheet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('characters', 'assets/images/players-mages.png', { frameWidth: 17, frameHeight: 17 });
    this.load.spritesheet('player', 'assets/images/player1.png', { frameWidth: 64, frameHeight: 64 });

    /*this.load.image('player', 'assets/images/player2.png');*/

    this.load.image('portal', 'assets/images/gate.png');
    this.load.image('coin', 'assets/images/gem3.png');

    this.load.image('bullet', 'assets/images/fire.png');

    this.load.audio('theme', 'assets/coin-drop-1.wav');

    this.load.audio('bg', 'assets/BoxCat.mp3');

    /*this.load.atlas('coin', 'assets/gems.png', 'assets/gems.json');*/
    /*this.game.load.spritesheet('coin', 'assets/gems.png', 22, 22);*/
  }



  create () {
    this.scene.start('Game', { level: 1, newGame: true, levels: this.levels });
var bgmusic = this.sound.add('bg');
    bgmusic.play();


  }


};
