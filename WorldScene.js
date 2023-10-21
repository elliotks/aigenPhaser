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

    // Add a key input to open inventory
    this.inventoryKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.I
    );

    // Create inventory menu group
    this.inventoryMenu = this.add.group();

    // Hide by default
    this.inventoryMenu.visible = false;

    // Create background
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.8);
    graphics.fillRect(240, 150, 320, 420);
    this.inventoryMenu.add(graphics);

    // Add text title
    let title = this.add.text(380, 170, "Inventory");
    title.setFontSize(40);
    title.setColor("#fff");
    this.inventoryMenu.add(title);

    // Add close button
    let closeBtn = this.add.text(620, 170, "X");
    closeBtn.setFontSize(40);
    closeBtn.setColor("#f00");
    closeBtn.setInteractive();
    closeBtn.on("pointerup", () => {
      this.inventoryMenu.visible = false;
    });
    this.inventoryMenu.add(closeBtn);
  }

  update() {
    // Game loop
  }
}
