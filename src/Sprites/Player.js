import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'player');
    this.scene = scene;
    this.health = 2;
    this.hitDelay = false; //The hitDelay is to avoid to have more damage meanwhile is colliding. 
                           // Change the color/sound meanwhile is being damaged.
    this.direction = 'up';

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setScale(2);
    
  }

  update (cursors) {
    this.setVelocity(0);

    if (cursors.up.isDown) {
      this.direction = 'up';
      this.setVelocityY(-150);
      this.anims.play('up', true);
    } else if (cursors.down.isDown) {
      this.direction = 'down';
      this.setVelocityY(150);
      this.anims.play('down', true);
    }

    if (cursors.left.isDown) {
      this.direction = 'left';
      this.setVelocityX(-150);
      this.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.direction = 'right';
      this.setVelocityX(150);
      this.anims.play('right', true);
      } else {
      this.anims.play('stop', true);

    }
  }

  loseHealth () {
    this.health--;
    this.scene.events.emit('loseHealth', this.health);
    if (this.health === 0) {
      this.scene.loadNextLevel(true);
    }
  }

  enemyCollision (player, enemy) {
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0x000000;
      this.scene.time.addEvent({
        delay: 900,
        callback: () => {
          this.hitDelay = false;
          this.tint = 0xffffff;

        },
        callbackScope: this
      });
    }
  }
}