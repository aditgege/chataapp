// berisi event yang akan dijalankan
// Aditia dwi pratomo
/*
*
*Aditia Dwi Pratomo 1942806
*Erio Hermawan 1942808
*
*
*/

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const usersDB = require("../utils/users")();
const seenDB = require("../utils/seen")();

const Message = require("../models/Message")();

io.on("connection", (socket) => {
  socket.on("createUser", (user) => {
    usersDB.addUser({
      ...user,
      id: socket.id,
    });

    return { id: socket.id };
  });

  socket.on("joinRoom", ({ name, room }) => {
    socket.join(room);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
    socket.emit("newMessage", new Message("admin", `Hallo, ${name}`));
    socket.broadcast
      .to(room)
      .emit(
        "newMessage",
        new Message("admin", ` ${name} bergabung dengan obrolan `),
      );
  });

  socket.on("createMessage", ({ id, msg }) => {
    const user = usersDB.getUser(id);
    if (user) {
      io.to(user.room).emit("newMessage", new Message(user.name, msg, id));
    }
  });

  socket.on("setTypingStatus", ({ room, typingStatus, id }) => {
    usersDB.setTypingStatus(id, typingStatus);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
  });

  socket.on("addSeen", ({ id, msg }) => {
    const user = usersDB.getUser(id);
    if (msg.name !== 'admin') {
      seenDB.addSeen({
        ...msg,
        id: socket.id,
        user
      });
      io.to(user.room).emit("updateSeen", seenDB.getAllSeen());
    }
    // console.log(seenDB)
    // return seenDB.get()
  });

  socket.on("messageSeen", (id) => {
    let seen = seenDB.getSeen(id);
    const { data } = seen
    return data
  });


  const exitEvents = ["leftChat", "disconnect"];

  exitEvents.forEach((event) => {
    socket.on(event, () => {
      const id = socket.id;
      const user = usersDB.getUser(id);
      if (!user) {
        seenDB.removeAll()
        return
      };
      const { room, name } = user;
      usersDB.removeUser(id);
      socket.leave(room);
      io.to(user.room).emit("updateSeen", seenDB.getAllSeen());
      io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
      // io.to(room).emit("updateSeen", usersDB.getSeen(room));
      io.to(room).emit(
        "newMessage",
        new Message("admin", `${name} keluar dari obrolan`),
      );
    });
  });
});

module.exports = {
  app,
  server,
};