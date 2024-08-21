export default function RenderMessages({ messages }) {
  return (
    <div>
      <h2>Messages:</h2>
      <ul>
        {messages.map((msg, index) =>
          msg ? <li key={index}>{msg}</li> : null
        )}
      </ul>
    </div>
  );
}
