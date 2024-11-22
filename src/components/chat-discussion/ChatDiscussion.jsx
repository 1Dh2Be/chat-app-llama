import './ChatDiscussion.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { RiFileCopyLine } from "react-icons/ri";

const ChatDiscussion = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Custom components for markdown rendering
  const markdownComponents = {
    h1: ({ node, ...props }) => <h1 style={{ marginTop: '1.5em', marginBottom: '1em' }} {...props} />,
    h2: ({ node, ...props }) => <h2 style={{ marginTop: '1.5em', marginBottom: '1em' }} {...props} />,
    h3: ({ node, ...props }) => <h3 style={{ marginTop: '1.2em', marginBottom: '0.8em' }} {...props} />,
    p: ({ node, ...props }) => <p style={{ marginBottom: '1em', lineHeight: '1.6' }} {...props} />,
    ul: ({ node, ...props }) => <ul style={{ marginTop: '1em', marginBottom: '1em' }} {...props} />,
    ol: ({ node, ...props }) => <ol style={{ marginTop: '1em', marginBottom: '1em' }} {...props} />,
    li: ({ node, ...props }) => <li style={{ marginBottom: '0.5em' }} {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote 
        style={{ 
          marginTop: '1em', 
          marginBottom: '1em',
          paddingLeft: '1em',
          borderLeft: '3px solid #4a4a4a',
          color: '#ececf1'
        }} 
        {...props} 
      />
    ),
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
              <RiFileCopyLine/>
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
  };

  return (
    <div className="chat-discussion">
      <div className='discussion-container'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.type === 'user' ? (
                // For user messages, render plain text
                <p>{message.text}</p>
              ) : (
                // For bot messages, render with markdown
                <ReactMarkdown
                  components={markdownComponents}
                  className="markdown-content"
                >
                  {message.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatDiscussion;