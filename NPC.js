// NPC.js
// Basic NPC class

class NPC extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    // Init NPC
    this.setTexture("characters", key);

    this.dialogue = ["Hello there!", "How are you doing?", "Bye for now!"];

    this.currentDialogue = 0;

    this.interactionZone = this.scene.add
      .zone(this.x, this.y)
      .setCircleDropZone(100);

    this.scene.physics.add.overlap(
      this.interactionZone,
      this.scene.player,
      this.interact,
      this
    );
  }

  update() {
    // Update NPC
  }

  interact(player) {
      this.scene.dialogueTarget = this;
      this.scene.dialogueBox.visible = true;
      this.scene.dialogueText.setText(this.dialogue[this.currentDialogue]);
    }
}
