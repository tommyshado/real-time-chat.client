import { useState, useEffect } from "react";
import io from "socket.io-client";
import JoinAndLeaveRoom from "../pages/JoinAndLeaveRoom";
import RenderMessages from "../pages/RenderMessages";

const socket = io("http://localhost:3000");

function App() {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("message", (data: { room: string; message: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${data.room}: ${data.message}`,
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinRoom = () => {
    if (room) {
      socket.emit("joinRoom", room, (response) => {
        if (response.status === "success") {
          console.log(response.message);
        }
      });
    }
  };

  const leaveRoom = () => {
    if (room) {
      socket.emit("leaveRoom", room, (response) => {
        if (response.status === "success") {
          console.log(response.message);
          setRoom("");
        }
      });
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <JoinAndLeaveRoom
        room={room}
        setRoom={setRoom}
        joinRoom={joinRoom}
        leaveRoom={leaveRoom}
      />
      <RenderMessages messages={messages} />
    </div>
  );
}

export default App;
