import 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children) {
    super(world, scene, children);
    this.scene = scene;

    this.createMultiple({
      frameQuantity: 1,
      key: 'bullet',
      active: false,
      visible: false
    });
  }

  enemyCollision (bullet, enemy) {
    bullet.active = false;
    bullet.visible = false;
    bullet.disableBody();
    enemy.loseHealth();
  }

  fireBullet (x, y, direction) {
    const bullet = this.getFirstDead(false); // getFirstDead( [createIfNull] [, x] [, y] [, key] [, frame] [, visible])
                                             // Scans the group for the first member that has an 
                                             // Phaser.GameObjects.GameObject#active state set to false,
                                             // assigns x and y, and returns the member.
    if (bullet) {
      bullet.enableBody(true);
      bullet.active = true;
      bullet.visible = true;
      bullet.setPosition(x, y);
      bullet.setScale(0.1);

      switch (direction) {
        case 'up':
          bullet.setVelocityY(-350);
          break;
        case 'down':
          bullet.setVelocityY(350);
          break;
        case 'left':
          bullet.setVelocityX(-350);
          break;
        case 'right':
          bullet.setVelocityX(350);
          break;
        default:
          bullet.setVelocityY(-350);
      }

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          bullet.disableBody();
          bullet.active = false;
          bullet.visible = false;
          bullet.setVelocity(0);
        }
      });
    }
  }
}