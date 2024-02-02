var app = require('express')();
var cors = require('cors')
var server = require('http').Server(app);
var io = require('socket.io')(server);


require('dotenv').config()


const port = process.env.PORT || 4001;


app.use(cors())

server.listen(port, () => console.log(`Listening on port ${port}`));

io.origins((origin, callback) => {

  if (origin !== process.env.FRONTEND_URL) {
    return callback('origin not allowed', false);
  }
  console.log("allowed")
  callback(null, true);

});

io.on("connection", socket => {
  socket.on('hello',() =>{console.log('hello')})
  socket.on('tick',(playState) =>{
    io.emit('tick-on',playState)
  })
  socket.on('gameOver',(gameState) =>{
    io.emit('applyGameOver',gameState)
  })
  socket.on('reset',() =>{
    io.emit('applyReset')
  })
  console.log("New client connected")
  socket.on("disconnect", () => console.log("Client disconnected"));
});
