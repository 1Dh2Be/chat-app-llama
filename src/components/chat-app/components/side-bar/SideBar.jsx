// Sidebar.jsx
import "./SideBar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoHelpCircleOutline } from 'react-icons/io5';


const SideBar = ({ isSideBar, setIsSideBar, handleNewMessage }) => {
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
        <div className={`settings-button-icon ${isSideBar ? 'active' : ''}`}>
          <IoIosSettings className="IoIosSettings" size="22px"/>
          {isSideBar && <span className="icon-text">Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;