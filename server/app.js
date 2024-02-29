import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 3000;
const app = express();

const server = createServer(app);// attaching socket io to http server
const io = new Server(server); // circuit

io.on("connection", (socket) => {
  console.log("user is connected ");
  console.log("user  id ", socket.id);
});

app.get("/", (req, res) => {
  res.send("welcome to krishn a server");
});

app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
