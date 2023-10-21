// WorldScene.js
// Main world scene

class WorldScene extends Phaser.Scene {
  create() {
    // Create world
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("tiles");
    this.groundLayer = this.map.createLayer("Ground", this.tileset);
    this.groundLayer.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 100, 300);
    this.physics.add.collider(this.player, this.groundLayer);

    this.npcGroup = this.add.group({ runChildUpdate: true });

    this.npc1 = new NPC(this, 500, 300, "john");
    this.npcGroup.add(this.npc1);

    this.npc2 = new NPC(this, 700, 500, "jane");
    this.npcGroup.add(this.npc2);

    this.dialogueBox = this.add.rectangle(400, 300, 300, 80, 0x000000);
    this.dialogueBox.alpha = 0.8;
    this.dialogueText = this.add.text(
      this.dialogueBox.x,
      this.dialogueBox.y,
      "",
      { color: "#FFFFFF" }
    );
    this.dialogueText.setOrigin(0.5);

    this.player.on("player-interact", this.handleInteraction, this);
  }

  update() {
    // Game loop
  }
}
