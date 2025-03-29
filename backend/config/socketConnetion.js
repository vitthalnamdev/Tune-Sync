const socket = require("socket.io");
const User = require("../models/User");

const socketConnection = (server) => {
  
  const io = socket(server,{
      cors: {
        origin: "*", // Allow all origins (adjust in production)
    }
  }); 

  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", async(userId) => {
      onlineUsers.set(userId, socket.id);
      
      //notify all clients that this user is online
      io.emit("user-online", userId);
      //send all online user list to all user
      const onlineUserIds = Array.from(onlineUsers.keys());
      io.emit("recieve-user", onlineUserIds);
      const user =  await User.findByIdAndUpdate(userId, { lastOnline: new Date() });
    });

    socket.on("disconnect", async() => {
      // Find the user who disconnected and remove them from the onlineUsers Map

      for (let [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          // Notify all clients that this user is offline
          io.emit("user-offline", userId);
          //send all online user list to all user
          const onlineUserIds = Array.from(onlineUsers.keys());
          io.emit("recieve-user", onlineUserIds);
          const user = await User.findByIdAndUpdate(userId,{lastOnline:new Date()});
          console.log("ofline",user);
          break;
        }
      }
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      console.log("msg",data);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });

    // Add a new event to check if a user is online
    socket.on("check-online", (userId) => {
      const isOnline = onlineUsers.has(userId);
      socket.emit("user-online-status", { userId, isOnline });
    });

    // get list of all online user
    socket.on("getAll-user",()=>{
        const onlineUserIds = Array.from(onlineUsers.keys());
        socket.emit("recieve-user",onlineUserIds);
    })
  });
};

module.exports = socketConnection;
