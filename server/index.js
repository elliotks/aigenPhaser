const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static('public'));

const players = {};

io.on('connection', (socket) => {

  players[socket.id] = {
    rotation: 0,
    x: 400,
    y: 300,
    playerId: socket.id
  };
  
  // Send existing players to new player
  socket.emit('currentPlayers', players);

  // Add new player to existing players  
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // Handle player movement  
  socket.on('playerMovement', movementData => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;

    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  // Remove player on disconnect
  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('playerDisconnected', socket.id);
  });
  
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});