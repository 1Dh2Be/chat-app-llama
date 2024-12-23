// SettingsModal.jsx
import { memo } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import LngSelect from "./LngSelect";

const SettingsModal = memo(({
  isOpen,
  onClose,
  isLightTheme,
  toggleTheme,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="settings-overlay" onClick={onClose} />
      <div className="settings-modal">
        <div className="settings-row">
          <div className="row-left">
            <IoLanguageSharp className="icon" />
            <span>{t("language")}</span>
          </div>
          <LngSelect />
        </div>
        <div className="settings-row" onClick={toggleTheme}>
          <div className="row-left">
            {isLightTheme ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            <span>{t("theme")}</span>
          </div>
          <div className="current-theme">
            {isLightTheme ? t("light_theme") : t("dark_theme")}
          </div>
        </div>
      </div>
    </>
  );
});

export default SettingsModal;