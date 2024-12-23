//style import
import "./ChatApp.css";

//Component & libraries import
import ChatDiscussion from "../chat-discussion/ChatDiscussion";
import { useEffect, useState } from "react";
import ModelDropDown from "./components/model-selection/ModelDropDown.jsx";
import { handleNewChat } from './utils/handlers.js';
import { cardsData } from "./components/cards/cards-data.js";
import TextArea from "./components/text-area/TextArea.jsx";
import PromptCards from "./components/cards/PromptCards.jsx";
import SideBar from "./components/side-bar/SideBar.jsx";
import UserIcon from "./components/icons-component/user-icon/UserIcon.jsx"
import { useTranslation } from "react-i18next";

const ChatApp = () => {

  //Sees if the input is empty or not
  const [messages, setMessages] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);
  const { t } = useTranslation();

  const [isActive, setIsActive] = useState(false);

  const newMessage = () => {
    handleNewChat(messages, setMessages, setIsNewChat, setIsActive);
    setIsNewChat(false)
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  return (
    <div className="app">
      {/* Sidebar */}
      {!isMobile && (
              <SideBar
              isSideBar={isSideBar}
              setIsSideBar={setIsSideBar}
              handleNewMessage={newMessage}
              />
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          {isMobile && (
            <SideBar
            isSideBar={isSideBar}
            setIsSideBar={setIsSideBar}
            handleNewMessage={newMessage}
            />
          )}
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
                <span className="greeting-text">{t("greeting")}, Mimoun<br/></span>
                <span>{t("topic")}</span>
              </h2>
                <div className="cards">
                  {cardsData.map((data, index) => (
                    <PromptCards
                      key={index}
                      text={t(data.text)}
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