const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const id = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
 
});

io.on('connection', (socket) => {
  
  console.log('a user connected');
  socket.join("Briiiaaaaa");
  console.log(socket.rooms)


  socket.on("tableau",(inpu)=>{
    console.log(inpu)
    let tempo = new Object()
    tempo.name = inpu
    tempo.id = socket.id
    
    id.push(tempo)
    // id[inpu] = socket.id
   console.log(id)
    io.emit("tableauremplis", id)
  }) 
  socket.on("racc",(tableau2)=>{
    let tempo = new Object()
    tempo.name = tableau2
    tempo.id = socket.id
    id.push(tempo)
    console.log(id)
  })
  
  
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});