import './ChatDiscussion.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { RiFileCopyLine } from "react-icons/ri";
import LlmIcon from '../chat-app/components/icons-component/llm-icon/LlmIcon';

const ChatDiscussion = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simplified markdown components
  const markdownComponents = {
    // Only keep essential formatting
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
            <div className="message-wrapper">
              {message.type === 'user' ? (
                ''
              ) : (
                <LlmIcon />
              )}
            </div>
            <div className="message-content">
              <ReactMarkdown
                components={markdownComponents}
                className="markdown-content"
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