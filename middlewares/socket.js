module.exports = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("signin", (id) => {
      clients[id] = socket;
    });
    socket.on("chat", (payload) => {
      let receiver_userId = payload.receiver_userId;
      if (clients[receiver_userId])
        clients[receiver_userId].emit("chat", payload);
    });
    socket.on("message", (payload) => {
      let receiver_userId = payload.receiver_userId;
      if (clients[receiver_userId])
        clients[receiver_userId].emit("message", payload);
    });
  });
};
