import React, { useEffect, useRef } from 'react';
import './ChatDiscussion.css';

const ChatDiscussion = ({ messages }) => {

  const messagesEndRef  = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom();
  },[messages]);

  return (
    <div className="chat-discussion">
      <div className="messages-wrapper">
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
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatDiscussion;