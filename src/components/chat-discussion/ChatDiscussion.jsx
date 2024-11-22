import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ChatDiscussion.css';

const ChatDiscussion = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-discussion">
      <div className='test'>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
        >
          <div className="message-content">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="code-block">
                      <div className="code-block-header">
                        <span>{match[1]}</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(String(children))}
                          className="copy-button"
                        >
                          Copy code
                        </button>
                      </div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatDiscussion;