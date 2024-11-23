import { createContext, useContext, useRef, useState } from "react";

const TextAreaContext = createContext();

export const TextAreaProvider = ({ children }) => {
    const [inputText, setInputText] = useState('');
    const textareaRef = useRef(null);
    const inputRef = useRef(null);

    return (
        <TextAreaContext.Provider
        value={{
            inputText,
            setInputText,
            textareaRef,
            inputRef
            }}
        >
         {children}
        </TextAreaContext.Provider>
    );
};

export const useTextArea = () => {
    return useContext(TextAreaContext);
}