import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 3000;
const app = express();

const server = createServer(app); // attaching socket io to http server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true, // inside header credentials allow true
  },
}); // circuit

io.on("connection", (socket) => {
  console.log("some user is connected ", socket.id);
  socket.on("send_message", ({ message, room }) => {
    // io.emit("recive_message", data);
    // socket.broadcast.emit("recive_message", data);
    io.to(room).emit("recive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("welcome to krishn a server");
});

server.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
