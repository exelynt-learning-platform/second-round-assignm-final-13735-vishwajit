import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/chat/chatSlice";
import Message from "./Message";
import Loader from "./Loader";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

  const bottomRef = useRef();

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    dispatch(sendMessage(input));
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}

        {loading && <Loader />}
        <div ref={bottomRef}></div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="input-box">
        <input
          value={input}
          placeholder="Type message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;