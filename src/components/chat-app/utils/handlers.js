import gsap from 'gsap';
import askMe from "../../api/Api.js";

export const handleClick = (inputRef, setIsActive) => {
    setIsActive(true);
    gsap.to(inputRef.current, {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
    });
};

export const handleSendMessage = async (
    e,
    inputText,
    setInputText,
    setMessages,
    textareaRef,
    inputRef,
    setIsActive
) => {
    e.preventDefault();
    setInputText('');
    handleClick(inputRef, setIsActive);

    const userMessage = {
        type: 'user',
        text: inputText
    };
    setMessages(prev => [...prev, userMessage]);

    try {
        const response = await askMe(inputText);
        const botMessage = {
            type: 'bot',
            text: response
        };
        setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        console.error('Error getting response:', error);
    }

    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.rows = 1;
    }
};

export const isTextEmpty = (text) => {
    return text.trim() === '';
};