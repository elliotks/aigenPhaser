let gameScene = new Phaser.Scene("Game");

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: gameScene,
};

function getRandomColor() {
  let colors = ["0xRED", "0xBLUE", "0xGREEN"];
  return colors[Math.floor(Math.random() * colors.length)];
}

let game = new Phaser.Game(config);

// initialize socket
let socket = io();

const maxPlayers = 20;
let numPlayers = 0;

socket.on('playerLimitReached', () => {
  alert('Server player limit reached!');
  socket.disconnect(); 
});

this.load.tilemapTiledJSON("map", "assets/map.json");
// game code
let player;
let playerColor = getRandomColor();

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("tiles", "assets/tiles.png");
  const layer = map.createStaticLayer("Ground", tileset, 0, 0);
  player = this.physics.add.sprite(400, 300, 'player', playerColor);

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

  socket.on('playerDisconnected', (playerId) => {
    delete otherPlayers[playerId];
  });
}
