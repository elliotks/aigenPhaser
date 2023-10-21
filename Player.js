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

    // Add inventory array
    this.inventory = [];

    // Add item on overlap
    this.on("overlapstart", (sprite, item) => {
      this.inventory.push(item);
      item.destroy();
    });

    // Add quantity property
    this.inventory = [
      {
        key: "key",
        name: "Dungeon Key",
        description: "Opens dungeon door",
        quantity: 1,
      },
    ];

    // Increase quantity on overlap
    this.on("overlapstart", (sprite, item) => {
      let index = this.inventory.findIndex(
        (invItem) => invItem.key === item.key
      );
      this.inventory[index].quantity++;

      // Destroy item in scene
      item.destroy();
    });

    // Load inventory on create
    this.scene.events.on("create", () => {
      // Get saved data
      let inventoryData = localStorage.getItem("inventory");

      // Parse JSON back to array
      this.inventory = JSON.parse(inventoryData);

      // Re-create icons
      this.inventory.forEach((item) => {
        let icon = this.scene.add.image(0, 0, item.key);
        // Set properties from save data
        icon.name = item.name;
        icon.description = item.description;

        this.scene.inventoryItems.add(icon);
      });
    });

    // Save inventory on game exit
    this.scene.events.on("shutdown", () => {
      // Save inventory array to player data
      // Convert inventory array to JSON
      let inventoryData = JSON.stringify(this.inventory);

      // Save to localStorage
      localStorage.setItem("inventory", inventoryData);
    });
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
      this.anims.play("walk", true);
      this.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.anims.play("walk", true);
      this.flipX = false;
    } else {
      this.anims.stop();
    }

    if (this.inventoryKey.isDown) {
      this.scene.inventoryMenu.visible = true;
    }
  }

  // Use inventory items
  useItem(item) {
    if (item.name === "Key") {
      this.canOpenDoor = true;
    }
  }
}
