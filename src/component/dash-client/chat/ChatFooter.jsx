import React, { useState } from "react";

const ChatFooter = ({ selectedContact, socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit("typing", {
      message: `${localStorage.getItem("userName")} is typing`,
      receiver: selectedContact._id,
    });
    setTimeout(() => {
      socket.emit("typing", { message: "", receiver: selectedContact._id });
    }, 2000); // Adjust the typing timeout as needed
  };

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(selectedContact._id);
    console.log(localStorage.getItem("userId"));
    console.log(message);
    if (message.trim() && localStorage.getItem("userId")) {
      socket.emit("message", {
        message,
        sender: localStorage.getItem("userId"),
        receiver: selectedContact._id,
        timestamp: new Date(),
      });
      setMessage(""); // Clear the input after sending
    }
  };

  const handleKeyDown = (e) => {
    // Check if Enter is pressed without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior
      handleSendMessage(e); // Call the send message function
    }
  };

  return (
    <footer className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={handleTyping}
          onKeyDown={handleKeyDown} // Handle key down event
          placeholder="Tapez un message..."
          className="message-type"
          rows={1} // Start with one row
          style={{ overflow: "hidden", resize: "none" }} // Hide the resize handle
        />
        <div className="buttons-wrapper">
          <button type="submit" className="send-button">
            <i className="fa fa-paper-plane send-icon" aria-hidden="true"></i>
          </button>
          <text className="exchange-button" type="button">Échanger</text>
        </div>
      </form>
    </footer>
  );
};

export default ChatFooter;
