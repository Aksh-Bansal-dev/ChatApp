const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");

const socket = io();
//connection
socket.emit("join",window.location.href);

//users online
socket.on("users", users=>{
  usersList.innerHTML = "";
  users.map(user=>{
    const li = document.createElement("li");
    li.innerHTML = user.username;
    usersList.appendChild(li);
  })
})

//listen to message
socket.on("message",msg=>{
  console.log(msg);
  if(msg.room){
    roomName.innerHTML = msg.room;
  }
  const elem = document.createElement("div");
  elem.className= "message";
  elem.innerHTML = `
    <p class="meta">${msg.username} &nbsp;&nbsp;&nbsp;&nbsp; <span >${msg.time}</span></p>
    <p>${msg.msg}</p>
  `;
  chatMessage.appendChild(elem);


  //scroll down
  chatMessage.scrollTop = chatMessage.scrollHeight;
})

//send message
chatForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const msg = e.target.msg.value;
  // const payload = {
  //   msg, 
  //   link: window.location.href
  // }
  socket.emit("message", msg);
  e.target.msg.value = "";
  e.target.msg.focus();
})

