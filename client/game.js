// Import Phaser 
import Phaser from 'phaser';

// Game config
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
    preload,
    create,
    update
  }
};

// Initialize game
const game = new Phaser.Game(config);

// Load assets
function preload() {
  this.load.image('player', 'assets/player.png');
  this.load.tilemapTiledJSON('map', 'assets/map.json'); 
}

// Socket connection
let socket = io();
const otherPlayers = {};

// Create map 
function create() {
  const map = this.make.tilemap({key: 'map'});

  // Parameters: name, key, x, y
  const tiles = map.addTilesetImage('tiles', 'tiles');
  const layer = map.createDynamicLayer('World', tiles, 0, 0);

  // Create player  
  const player = this.add.sprite(400, 300, 'player');

  // Camera follow player
  this.cameras.main.startFollow(player);

  // Movement
  this.input.keyboard.on('keydown', (event) => {
    // Emit key press over socket
    socket.emit('playerInput', event.keyCode);
  });
}

// Game loop
function update() {
  // Sync player positions  
  Object.values(otherPlayers).forEach(player => {
    player.x = player.getData('x');
    player.y = player.getData('y'); 
  });
}

// Socket events
socket.on('currentPlayers', players => {
  Object.keys(players).forEach(id => {
    if (id === socket.id) {
      addPlayer(players[id]);
    } else {
      addOtherPlayers(players[id]);
    }
  });
});

socket.on('newPlayer', playerInfo => {
  addOtherPlayers(playerInfo);
});

socket.on('playerMoved', playerInfo => {    
  otherPlayers[playerInfo.playerId].setData({
    x: playerInfo.x,
    y: playerInfo.y
  });
});

// Add other players
function addOtherPlayers(playerInfo) {
  const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'player');
  otherPlayer.playerId = playerInfo.playerId;
  otherPlayers[playerInfo.playerId] = otherPlayer;
}

// Add self
function addPlayer(playerInfo) {
  const player = this.add.sprite(playerInfo.x, playerInfo.y, 'player');
  player.playerId = playerInfo.playerId; 
}