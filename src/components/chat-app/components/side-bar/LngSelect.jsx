import { useState } from "react"
import "./LngSelect.css"
import { TiArrowSortedDown } from "react-icons/ti";
import { useTranslation } from "react-i18next";

const LngSelect = () => {

    const { i18n } = useTranslation();
    const [lng, setLng] = useState(i18n.language);
    const [openLngMenu, setOpenLngMenu] = useState(false);

    const changeLng = (language) => {
        i18n.changeLanguage(language);
        setLng(language);
    }

    return (
        <div className="lng-container" onClick={() => setOpenLngMenu(!openLngMenu)}>
            <div className="current-lng">
                {lng}
                <TiArrowSortedDown className="dropdown-lng-icon"/>
            </div>

            {openLngMenu &&
            <div className="lng-menu" >
                <span onClick={() => changeLng("fr")}>fr</span>
                <span onClick={() => changeLng("en")}>en</span>
                <span onClick={() => changeLng("nl")}>nl</span>
            </div>}
        </div>
    )
}

export default LngSelect