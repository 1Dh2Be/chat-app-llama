import "./PromptCards.css"
import { useModel } from '../model-selection/ModelContext.js';
import { handleCardClick } from "../../utils/handlers.js";

const PromptCards = ({text, icon, messages, setMessages, setIsActive}) => {

    const { selectedModel } = useModel();

    const model = selectedModel[Object.keys(selectedModel)]

    return (
        <div className="card-wrapper">
            <div className="card-container" onClick={() => handleCardClick(
                text,
                messages,
                setMessages,
                setIsActive,
                model
            )}>
                <div className="card-content">
                    <span className="cards-icon">{icon}</span>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default PromptCards