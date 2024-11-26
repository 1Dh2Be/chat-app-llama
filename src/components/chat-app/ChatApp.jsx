//style import
import "./ChatApp.css";

//Component & libraries import
import ChatDiscussion from "../chat-discussion/ChatDiscussion";
import { useState } from "react";
import ModelDropDown from "./components/model-selection/ModelDropDown.jsx";
import { handleNewChat } from './utils/handlers.js';
import { cardsData } from "./components/cards/cards-data.js";
import TextArea from "./components/text-area/TextArea.jsx";
import PromptCards from "./components/cards/PromptCards.jsx";
import SideBar from "./components/side-bar/SideBar.jsx";
import UserIcon from "./components/icons-component/user-icon/UserIcon.jsx"

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
      <SideBar
        isSideBar={isSideBar}
        setIsSideBar={setIsSideBar}
        handleNewMessage={newMessage}
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <ModelDropDown />
          <section className="right-section">
            <UserIcon />
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