import React from 'react';
import './ChatDiscussion.css';

const ChatDiscussion = ({ messages }) => {
  return (
    <div className="chat-discussion">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
        >
          <div className="message-content">
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDiscussion;