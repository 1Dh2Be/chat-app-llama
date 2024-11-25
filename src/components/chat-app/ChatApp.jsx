//style import
import "./ChatApp.css";

//Component & libraries import
import ChatDiscussion from "../chat-discussion/ChatDiscussion";
import { useState } from "react";
import ModelDropDown from "./components/model-selection/ModelDropDown.jsx";
import { handleNewChat } from './utils/handlers.js';
import { cardsData } from "./components/cards/cards-data.js";
import TextArea from "./components/text-area/TextArea.jsx";

//Icons import
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import PromptCards from "./components/cards/PromptCards.jsx";

const ChatApp = () => {

  //Sees if the input is empty or not
  const [messages, setMessages] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);

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
          <GiHamburgerMenu size="16px"/>
        </div>
        <div  id="add-button-icon" className={`icon ${isSideBar ? 'active' : ''}`} onClick={newMessage}>
          <GoPlus className="GoPlus" size="31px"/>
          {isSideBar && <span className="icon-text">New chat</span>}
        </div>
        <div className="spacer"></div>
        <div id="settings-button-icon" className="icon">
          <IoIosSettings size="22px"/>
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
            <div className="greeting">
              <h2>
                <span className="greeting-text">Hello, Mimoun<br/></span>
                <span>What's the subject for today?</span>
              </h2>
              <div className="cards">
                {cardsData.map((data, index) => (
                  <PromptCards
                    key={index}
                    text={data.text}
                    icon={data.icon}
                    messages={messages}
                    setMessages={setMessages}
                    setIsActive={setIsActive}
                  />
                ))}
            </div>
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