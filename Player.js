// Player.js
// Player class

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    // Init player
    this.scene.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNumbers("player_walk"),
      frameRate: 12,
      repeat: -1,
    });

    this.speed = 150;

    this.cursors = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    
    this.interactKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );
  }

  update() {
      const speed = this.speed;
      
      if (this.cursors.left.isDown) {
        this.setVelocityX(-speed);
      } else if (this.cursors.right.isDown) { 
        this.setVelocityX(speed);
      } else {
        this.setVelocityX(0);
      }
      
      if (this.cursors.up.isDown) {
        this.setVelocityY(-speed);
      } else if (this.cursors.down.isDown) {
        this.setVelocityY(speed);
      } else {
        this.setVelocityY(0);
      }  
      
      if (this.cursors.left.isDown) {
        this.anims.play('walk', true);
        this.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.anims.play('walk', true);
        this.flipX = false;
      } else {
        this.anims.stop(); 
      }
    }
}
