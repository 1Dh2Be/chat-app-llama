//style import
import "./ChatApp.css";

//Component & libraries import
import gsap from "gsap";

//Icons import
import { BiSolidChevronRightCircle } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRef, useState } from "react";
import askMe from "../api/Api";

const ChatApp = () => {

  //Sees if the input is empty or not
  const [inputText, setInputText] = useState('');

  //This is for the animation to put hte input bar to the botom
  const inputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true)
    gsap.to(inputRef.current, {
      position: "fixed",
      bottom: '20px',
      padding: "0 20px",
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const message = inputText;
    const response = askMe(message)
    .then((joke) => {
      console.log('Response:', joke);
    });

    console.log(response)
    setInputText('')
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
          <div className="greeting">
            <h2>
              <span className="greeting-text">Good Evening,</span>
              <span className="name"> Mimoun</span>
            </h2>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage}>
            <div className={`input-container`} ref={inputRef}>
              <div className="input-wrapper">
                <RiImageAddLine id="add-image-icon" className="icon" size="27px"/>
                <textarea
                  placeholder="What's on your mind?"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  rows="1"
                />
                <button id="send-button" className="icon" disabled={!inputText} style={{opacity: inputText? 1 : 0.5}}>
                  <BiSolidChevronRightCircle size="31px"/>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;