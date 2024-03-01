import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("recive_message", (s) => {
      console.log(s);
    });

    socket.on("welcome_room", (s) => {
      console.log(s);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      message,
      room,
    };

    socket.emit("send_message", data);
    setMessage("");
  };

  return (
    <>
      <div>Chat Sample </div>

      <div>
        <form onSubmit={submitHandler}>
          <label>Type Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">Send message</button>

          <lable htmlFor="room">Room</lable>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            id="room"
          />
        </form>

        <p>{message}</p>
      </div>
    </>
  );
}

export default App;
