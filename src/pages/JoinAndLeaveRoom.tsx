export default function JoinAndLeaveRoom({room, setRoom, joinRoom, leaveRoom}) {
  return (
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
  );
}
