//style import
import "./ChatApp.css";

//Component & libraries import
import ChatDiscussion from "../chat-discussion/ChatDiscussion";
import { handleSendMessage, isTextEmpty } from './utils/handlers.js';

//Icons import
import { BiSolidChevronRightCircle } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRef, useState } from "react";

const ChatApp = () => {

  //Sees if the input is empty or not
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const textareaRef = useRef(null);

  //This is for the animation to put hte input bar to the botom
  const inputRef = useRef(null);
  const greetingRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleLocalSendMessage = (e) => {
    handleSendMessage(
        e,
        inputText,
        setInputText,
        setMessages,
        messages,
        textareaRef,
        inputRef,
        setIsActive
    );
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div id="menu-icon" className="icon">
          <GiHamburgerMenu size="21px"/>
        </div>
        <div id="add-button-icon" className="icon">
          <BsPlusCircleFill size="31px"/>
        </div>
        <div className="spacer"></div>
        <div id="settings-button-icon" className="icon">
          <IoIosSettings size="27px"/>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <section className="left-section">
            <h1>Models</h1>
            <RiArrowDropDownLine className="icon" size="25px"/>
          </section>
          <section className="right-section">
            <div className="profile-icon">MI</div>
          </section>
        </header>

        <div className="middle-container">
          {/* Greeting */}
          {!isActive && (
            <div className="greeting" ref={greetingRef}>
              <h2>
                <span className="greeting-text">Good Evening,</span>
                <span className="name"> Mimoun</span>
              </h2>
            </div>
          )}

          {isActive && <ChatDiscussion messages={messages} />}

          {/* Input Box */}
          <form onSubmit={handleLocalSendMessage} ref={inputRef}>
            <div className= "input-container">
              <div className="input-wrapper">
                <RiImageAddLine id="add-image-icon" className="icon" size="27px"/>
                <textarea
                  ref={textareaRef}
                  placeholder="What's on your mind?"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.shiftKey) {
                        e.preventDefault();
                        const cursorPosition = e.target.selectionStart;
                        const textBeforeCursor = inputText.substring(0, cursorPosition);
                        const textAfterCursor = inputText.substring(cursorPosition);
                        setInputText(textBeforeCursor + '\n' + textAfterCursor);

                        setTimeout(() => {
                          const textarea = e.target;
                          textarea.style.height = 'auto';
                          textarea.style.height = `${textarea.scrollHeight}px`;
                        }, 0);
                      } else {
                        e.preventDefault();
                        if (!isTextEmpty(inputText)) {
                          handleLocalSendMessage(e)
                          e.target.style.height = 'auto';
                        }
                      }
                    }
                  }}
                  rows="1"
                />
                <button id="send-button" className="icon" disabled={isTextEmpty(inputText)} style={{opacity: !isTextEmpty(inputText)? 1 : 0.5}}>
                  <BiSolidChevronRightCircle size="31px"/>
                </button>
              </div>
              <div><p className={`caution-message ${isActive? 'active' : ''}`}>Naplo may make mistakes. Please double-check its responses.</p></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;