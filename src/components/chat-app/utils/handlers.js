import gsap from 'gsap';
import askMeOpenAi from "../../api/apiOpenAi.js";

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
    messages,
    textareaRef,
    inputRef,
    setIsActive
) => {
    e.preventDefault();
    setInputText('');
    handleClick(inputRef, setIsActive);

    const messageHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
    }))

    // Add user message
    const userMessage = {
        type: 'user',
        text: inputText
    };
    setMessages(prev => [...prev, userMessage]);

    try {
        // Add initial empty bot message
        setMessages(prev => [...prev, {
            type: 'bot',
            text: '',
            isStreaming: true // Add this flag to indicate streaming
        }]);

        // Call API with streaming updates
        await askMeOpenAi(
            inputText,
            messageHistory,
            (partialResponse) => {
                // Update the bot message as new content arrives
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        type: 'bot',
                        text: partialResponse,
                        isStreaming: true
                    };
                    return newMessages;
                });
            }
        ).then((finalResponse) => {
            // Update with final response and remove streaming flag
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    type: 'bot',
                    text: finalResponse,
                    isStreaming: false
                };
                return newMessages;
            });
        });

    } catch (error) {
        console.error('Error getting response:', error);
        // Handle error by updating the last message
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
                type: 'bot',
                text: 'Sorry, there was an error processing your request.',
                isError: true
            };
            return newMessages;
        });
    }

    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.rows = 1;
    }
};

export const isTextEmpty = (text) => {
    return text.trim() === '';
};