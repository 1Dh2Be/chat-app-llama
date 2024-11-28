// Sidebar.jsx
import "./SideBar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoHelpCircleOutline } from 'react-icons/io5';
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { IoLanguageSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";


const SideBar = ({ isSideBar, setIsSideBar, handleNewMessage }) => {
  const [showSettings, setShowSettings] = useState(false);
  const {toggleTheme, isLightTheme} = useTheme();


  const settingMenuRef = useRef(null);
  const settingsButtonRef = useRef(null);

  const [buttonWidth, setButtonWidth] = useState(35)
  const newChatRef = useRef(null)

  const { t, i18n  } = useTranslation()

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
      <div className={`settings-options ${isSideBar ? 'active' : ''}`} ref={settingMenuRef}>
        <div className="settings-row">
          <div className="row-left">
            {isLightTheme ? <IoLanguageSharp className="icon" /> : <IoLanguageSharp className="icon" />}
            <span>{t("language")}</span>
          </div>
            <select
            className="language-select"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
            >
              <option value="en">en</option>
              <option value="fr">fr</option>
              <option value="nl">nl</option>
            </select>
        </div>
        <div className="settings-row" onClick={toggleTheme}>
          <div className="row-left">
            {isLightTheme ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            <span>{t("theme")}</span>
          </div>
          <div className="current-theme">
            {isLightTheme ? 'Light' : 'Dark'}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isSideBar && newChatRef.current) {
      const newWidth = newChatRef.current.offsetWidth + 60;
      setButtonWidth(newWidth);
    } else {
      setButtonWidth(35);
    }
  }, [isSideBar, t])

  return (
    <div className={`sidebar ${isSideBar ? 'active' : ''}`}>
      <div id="menu-icon" className="icon" onClick={() => setIsSideBar(!isSideBar)}>
        <GiHamburgerMenu size="18px"/>
      </div>
      <div
        className={`add-button-icon ${isSideBar ? 'active' : ''}`}
        onClick={handleNewMessage}
        style={{width: `${buttonWidth}px`}}
      >
        <GoPlus className="GoPlus" size="31px"/>
        {isSideBar && <span className="icon-text" ref={newChatRef}>{t("newChat")}</span>}
      </div>

      <div className="spacer"></div>

      <div className="bottom-icons">
        <div className={`help-button-icon ${isSideBar ? 'active' : ''}`}>
          <IoHelpCircleOutline className="IoHelpCircleOutline" size="22px"/>
          {isSideBar && <span className="icon-text">{t("docs")}</span>}
        </div>
        <div
          ref={settingsButtonRef} // Added ref here
          className={`settings-button-icon ${isSideBar ? 'active' : ''}`}
          onClick={handleSettingsClick}
        >
          <IoIosSettings className="IoIosSettings" size="22px"/>
          {isSideBar && <span className="icon-text">{t("settings")}</span>}
        </div>
        {showSettings && <SettingsOptions />}
      </div>
    </div>
  );
};

export default SideBar;