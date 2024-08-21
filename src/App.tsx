import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (data: { room: string; message: string }) => {
      setMessages((prevMessages) => [...prevMessages, `${data.room}: ${data.message}`]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const joinRoom = () => {
    if (room) {
      socket.emit('joinRoom', room, (response) => {
        if (response.status === "success") {
          console.log(response.message);
        }
      });
    }
  };

  const leaveRoom = () => {
    if (room) {
      socket.emit('leaveRoom', room, (response) => {
        if (response.status === "success") {
          console.log(response.message);
          setRoom('');
        }
      });
    }
  };

  const sendMessage = () => {
    if (room && message) {
      socket.emit('sendMessage', { room, message }, (response) => {
        if (response.status === "success") {
          console.log(response.message);
          setMessage('');
        }
      });
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name"
        />
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            msg? <li key={index}>{msg}</li>: null
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;