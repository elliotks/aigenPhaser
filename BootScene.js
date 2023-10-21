// BootScene.js
// Boot scene to load assets

class BootScene extends Phaser.Scene {
  preload() {
    // Load assets
    this.load.image("player", "assets/player.png");
    this.load.spritesheet("player_walk", "assets/player_walk.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("tiles", "assets/tileset.png");
    this.load.tilemapTiledJSON("map", "assets/map1.json");
  }

  create() {
    // Start next scene
  }
}
