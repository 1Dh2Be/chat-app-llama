// Sidebar.jsx
import "./SideBar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoHelpCircleOutline } from 'react-icons/io5';
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef, useState } from "react";


const SideBar = ({ isSideBar, setIsSideBar, handleNewMessage }) => {
  const [showSettings, setShowSettings] = useState(false);
  const {toggleTheme, isLightTheme} = useTheme();
  const settingMenuRef = useRef();
  const settingsButtonRef = useRef(); // Added ref for the button

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if click is outside both the menu and the settings button
      if (
        settingMenuRef.current && 
        !settingMenuRef.current.contains(e.target) &&
        !settingsButtonRef.current.contains(e.target)
      ) {
        setShowSettings(false);
      }
    }

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSettings])

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    setShowSettings(prev => !prev);
  };

  const SettingsOptions = () => {
    return (
      <div className="settings-options" ref={settingMenuRef}>
        <div className="settings-row" onClick={toggleTheme}>
          <div className="row-left">
            {isLightTheme ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            <span>Theme</span>
          </div>
          <div className="current-theme">
            {isLightTheme ? 'Light' : 'Dark'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`sidebar ${isSideBar ? 'active' : ''}`}>
      <div id="menu-icon" className="icon" onClick={() => setIsSideBar(!isSideBar)}>
        <GiHamburgerMenu size="18px"/>
      </div>
      <div className={`add-button-icon ${isSideBar ? 'active' : ''}`} onClick={handleNewMessage}>
        <GoPlus className="GoPlus" size="31px"/>
        {isSideBar && <span className="icon-text">New chat</span>}
      </div>

      <div className="spacer"></div>

      <div className="bottom-icons">
        <div className={`help-button-icon ${isSideBar ? 'active' : ''}`}>
          <IoHelpCircleOutline className="IoHelpCircleOutline" size="22px"/>
          {isSideBar && <span className="icon-text">Docs</span>}
        </div>
        <div
          ref={settingsButtonRef} // Added ref here
          className={`settings-button-icon ${isSideBar ? 'active' : ''}`}
          onClick={handleSettingsClick}
        >
          <IoIosSettings className="IoIosSettings" size="22px"/>
          {isSideBar && <span className="icon-text">Settings</span>}
        </div>
        {showSettings && <SettingsOptions />}
      </div>
    </div>
  );
};

export default SideBar;