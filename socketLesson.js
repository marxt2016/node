const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "socket.html");
  const readStream = fs.createReadStream(indexPath);
  readStream.pipe(res);
});

const io = socket(server);
let users = {};
io.on("connection", (client) => {
  client.on("connect-user", (data) => {
    console.log("Connected to server " + client.id);
    client.broadcast.emit("server-msg", data);
    client.emit("server-msg", data);
    users[client.id] = client.id;
    client.broadcast.emit("update-counter", users);
    client.emit("update-counter", users);
    console.log(users);
  });

  client.on("client-msg", (data) => {
    const payload = {
      message: data.message.split("").reverse().join(""),
      id: client.id,
    };
    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });

  client.on("disconnect", () => {
    client.broadcast.emit("server-msg", { message: "User " + client.id + " disconnected!" });
    console.log("Disconnected from server " + client.id);
    delete users[client.id];
    client.broadcast.emit("update-counter", users);
    client.emit("update-counter", users);
    console.log(users);
  });
});

server.listen(5555);
