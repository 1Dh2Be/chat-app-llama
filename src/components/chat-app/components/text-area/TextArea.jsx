import "./TextArea.css"
import { useRef, useState } from 'react';
import { handleSendMessage, isTextEmpty } from '../../utils/handlers.js';
import { useModel } from '../model-selection/ModelContext.js';
import { useTextArea } from './TextAreaContext.js'

//Icons import
import { RiImageAddLine } from "react-icons/ri";
import { FaCircleArrowRight } from "react-icons/fa6";


const TextArea = ({messages, setMessages, setIsActive}) => {

    const { inputText, setInputText, textareaRef, inputRef } = useTextArea();
    const { selectedModel } = useModel();

    const handleLocalSendMessage = (e) => {
        handleSendMessage(
            e,
            inputText,
            setInputText,
            setMessages,
            messages,
            textareaRef,
            inputRef,
            setIsActive,
            selectedModel
        );
      };


    return (
        <form onSubmit={handleLocalSendMessage} ref={inputRef}>
        <div className= "input-container">
          <div className="input-wrapper">
            <RiImageAddLine id="add-image-icon" className="icon" size="27px"/>
            <textarea
              ref={textareaRef}
              placeholder="Message me"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.shiftKey) {
                    e.preventDefault();
                    const cursorPosition = e.target.selectionStart;
                    const textBeforeCursor = inputText.substring(0, cursorPosition);
                    const textAfterCursor = inputText.substring(cursorPosition);
                    setInputText(textBeforeCursor + '\n' + textAfterCursor);

                    setTimeout(() => {
                      const textarea = e.target;
                      textarea.style.height = 'auto';
                      textarea.style.height = `${textarea.scrollHeight}px`;
                    }, 0);
                  } else {
                    e.preventDefault();
                    if (!isTextEmpty(inputText)) {
                      handleLocalSendMessage(e)
                      e.target.style.height = 'auto';
                    }
                  }
                }
              }}
              rows="1"
            />
            <button id="send-button" className="icon" disabled={isTextEmpty(inputText)} style={{opacity: !isTextEmpty(inputText)? 1 : 0.5}}>
              <FaCircleArrowRight size="31px"/>
            </button>
          </div>
          <div><p className="caution-message">Naplo may make mistakes. Please double-check its responses.</p></div>
        </div>
      </form>
    )
}

export default TextArea