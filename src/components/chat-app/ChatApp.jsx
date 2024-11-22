//style import
import "./ChatApp.css";

//Component & libraries import
import ChatDiscussion from "../chat-discussion/ChatDiscussion";
import { useRef, useState } from "react";
import ModelDropDown from "./components/model-selection/ModelDropDown.jsx";
import { handleNewChat } from './utils/handlers.js';

//Icons import
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import TextArea from "./components/text-area/TextArea.js";

const ChatApp = () => {

  //Sees if the input is empty or not
  const [messages, setMessages] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);

  const greetingRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const newMessage = () => {
    handleNewChat(messages, setMessages, setIsNewChat, setIsActive);
    setIsNewChat(false)
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <div className={`sidebar ${isSideBar? 'active' : ''}`}>
        <div id="menu-icon" className="icon" onClick={() => setIsSideBar(!isSideBar)}>
          <GiHamburgerMenu size="21px"/>
        </div>
        <div id="add-button-icon" className="icon" onClick={newMessage}>
          <BsPlusCircleFill size="31px"/>
        </div>
        <div className="spacer"></div>
        <div id="settings-button-icon" className="icon">
          <IoIosSettings size="27px"/>
          <span className="icon-text">Settings</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <ModelDropDown />
          <section className="right-section">
            <div className="profile-icon">MI</div>
          </section>
        </header>

        <div className="middle-container">
          {/* Greeting */}
          {(!isActive || isNewChat) && (
            <div className="greeting" ref={greetingRef}>
              <h2>
                <span className="greeting-text">Good Evening,</span>
                <span className="name"> Mimoun</span>
              </h2>
            </div>
          )}

          {isActive && <ChatDiscussion messages={messages} />}

          {/* Input Box */}
          <TextArea
            isActive={isActive}
            setIsActive={setIsActive}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;