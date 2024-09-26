import React from 'react';
import './ChatBody.css'
const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  return (
    <>
      <header className='chat__mainHeader'>
        <p>Chat with {messages[0]?.sender === localStorage.getItem('userName') ? 'You' : 'Contact'}</p>
      </header>

      <div className='message__container'>
        {messages.map(message => (
          message.sender === localStorage.getItem("userId") ? (
            <div className="message__chats message__chats--right" key={message.timestamp}>
              <p className='sender__name'>You</p>
              <div className='message__sender message__sender--highlight'>
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats message__chats--left" key={message.timestamp}>
              <p>{message.sender}</p>
              <div className='message__recipient'>
                <p>{message.message}</p>
              </div>
            </div>
          )
        ))}

        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
