let users = [];

const newUser = (username, id, room)=>{
    const user = {
        username,
        id, 
        room
    }
    users.push(user);
}

const findUser = (id)=>{
    users = users.filter(user=>user.id!==id);
    return users;
}

const getUsers = (room) =>{
    return users.filter(user=>user.room ===room);
}

module.exports = {
    getUsers,
    newUser,
    findUser
}