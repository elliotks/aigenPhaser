let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io").listen(server);
let numPlayers = 0;
const maxPlayers = 20;

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  // socket.io connection logic
  numPlayers++;
  if (numPlayers > maxPlayers) {
    socket.emit("playerLimitReached");
    return;
  }
  
  socket.on('chatMessage', (message) => {
    socket.broadcast.emit('chatMessage', socket.username, message);
  });

  socket.on("playerMovement", (movementData) => {
    socket.broadcast.emit("playerMoved", movementData);
  });
});

io.on("disconnect", () => {
  numPlayers--;
  socket.on("disconnect", () => {
    socket.broadcast.emit("playerDisconnected", socket.id);
  });
});

server.listen(3000);
