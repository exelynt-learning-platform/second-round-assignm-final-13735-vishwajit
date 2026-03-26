const Message = ({ msg }) => {
  return (
    <div className={msg.role === "user" ? "user-msg" : "ai-msg"}>
      {msg.content}
    </div>
  );
};

export default Message;