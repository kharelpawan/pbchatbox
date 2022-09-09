const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  // socket.join(socket.userID);
  console.log("Connected..");

  socket.on("message", (msg) => {
    // console.log(msg);
    socket.broadcast.emit("message", msg);
  });
});

// io.on("connection", (socket) => {
//   socket.join(socket.userID);
//   // ...
//   socket.on("message", ({ msg, to }) => {
//     socket.to(to).to(socket.userID).emit("message", {
//       msg,
//       from: socket.userID,
//       to,
//     });
//   });
//   // ...
// });

// io.on("connection", (socket) => {
//   // ...
//   socket.on("disconnect", async () => {
//     const matchingSockets = await io.in(socket.userID).allSockets();
//     const isDisconnected = matchingSockets.size === 0;
//     if (isDisconnected) {
//       // notify other users
//       socket.broadcast.emit("user disconnected", socket.userID);
//       // update the connection status of the session
//       sessionStore.saveSession(socket.sessionID, {
//         userID: socket.userID,
//         username: socket.username,
//         connected: false,
//       });
//     }
//   });
// });
