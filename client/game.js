let gameScene = new Phaser.Scene("Game");

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: gameScene,
};

let game = new Phaser.Game(config);

// initialize socket
let socket = io();

// game code
let player;

function create() {
  player = this.physics.add.sprite(400, 300, "player");

  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.cursors.left.isDown) {
    player.x -= 5;
  } else if (this.cursors.right.isDown) {
    player.x += 5;
  }

  if (this.cursors.up.isDown) {
    player.y -= 5;
  } else if (this.cursors.down.isDown) {
    player.y += 5;
  }

  socket.emit("playerMovement", {
    x: player.x,
    y: player.y,
  });

  socket.on("playerMoved", (movementData) => {
    otherPlayers[movementData.playerId].setPosition(
      movementData.x,
      movementData.y
    );
  });
}
