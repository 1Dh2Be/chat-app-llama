import "./PromptCards.css"
import { useModel } from '../model-selection/ModelContext.js';
import { handleCardClick } from "../../utils/handlers.js";

const PromptCards = ({text, icon, messages, setMessages, setIsActive}) => {

    const { selectedModel } = useModel();

    return (
        <div className="card-container" onClick={() => handleCardClick(
            text,
            messages,
            setMessages,
            setIsActive,
            selectedModel
        )}>
            <div className="card-content">
                <span className="cards-icon">{icon}</span>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default PromptCards