const express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require("path");
const messageFormat = require("./messageFormat");
const getUsername = require("./getUsername");
const {newUser, findUser, getUsers} = require('./users');

//static folder 
app.use(express.static(path.join(__dirname, "public")));

// socket io magic 
io.on('connection', (socket) => {
  socket.on("join", link =>{
    const {username, room} = getUsername(link);
    socket.join(room);
    newUser(username, socket.id, room);

    //welcome 
    socket.broadcast.to(room).emit("message", messageFormat("ChatBot", `${username} entered the chat`,null ))
    socket.emit("message", messageFormat("ChatBot", "Welcome to ChatCord", room));
    io.to(room).emit("users", getUsers(room));

    //message logic
    socket.on("message",(msg)=>{
      io.to(room).emit("message", messageFormat(username, msg));
    })

    // bye bye
    socket.on("disconnect", ()=>{
      socket.broadcast.to(room).emit("message", messageFormat("ChatBot", `${username} just left the chat`));
      findUser(socket.id);
      io.to(room).emit("users", getUsers(room));
    })
  })
});

//server running
const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log('listening on 5000');
});
 
