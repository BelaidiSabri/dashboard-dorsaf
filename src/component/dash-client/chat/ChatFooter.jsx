import React, { useState } from 'react';

const ChatFooter = ({ selectedContact, socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit('typing', { message: `${localStorage.getItem("userName")} is typing`, receiver: selectedContact._id });
    setTimeout(() => {
      socket.emit('typing', { message: "", receiver: selectedContact._id });
    }, 2000); // Adjust the typing timeout as needed
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(selectedContact._id);
    console.log(localStorage.getItem("userId"));
    console.log(message);
    if (message.trim() && localStorage.getItem("userId")) {
      socket.emit('message', {
        message,
        sender: localStorage.getItem("userId"),
        receiver: selectedContact._id,
        timestamp: new Date()
      });
      setMessage("");
    }
  };

  return (
    <footer className='chat__footer'>
      <form className='form' onSubmit={handleSendMessage}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={handleTyping}
          placeholder='Type a message...'
        />
        <button type='submit'>Send</button>
      </form>
    </footer>
  );
};

export default ChatFooter;
