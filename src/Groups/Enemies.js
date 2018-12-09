import 'phaser';
import Enemy from '../Sprites/Enemy';

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    this.spriteFrames = [0, 1, 54, 55, 108, 109, 162, 163];

    this.createEnemies(scene, spriteArray);
  }

  createEnemies (scene, spriteArray) {
    spriteArray.forEach((sprite) => {
      const randNumber = Math.floor(Math.random() * this.spriteFrames.length - 1);

      const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);

      this.add(enemy);
      sprite.destroy();
    });
  }
}