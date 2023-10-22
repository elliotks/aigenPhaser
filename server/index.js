let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  // socket.io connection logic
  socket.on('playerMovement', (movementData) => {
      socket.broadcast.emit('playerMoved', movementData);  
    });
});

server.listen(3000);