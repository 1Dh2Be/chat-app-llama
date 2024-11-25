import OpenAI from "openai";
import { API_KEY } from "./apiKey.js"

const openAiClient = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://api.llama-api.com",
    dangerouslyAllowBrowser: true
});

async function askMeOpenAi(ask, messageHistory, onUpdate, selectedModel) {
    try {
        const systemPrompt = {
            role: 'system',
            content: 'You are a helpful AI assistant. Provide clear and friendly responses.'
        };

        const messages = [
            systemPrompt,
            ...messageHistory,
            { role: 'user', content: ask }
        ];

        // Single streaming request
        const stream = await openAiClient.chat.completions.create({
            model: selectedModel,
            messages: messages,
            stream: true,
            temperature: 0.7,
            max_tokens: 2048,
            presence_penalty: 0.6,
            frequency_penalty: 0.5,
        });

        let formattedContent = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            formattedContent += content;
            if (onUpdate) onUpdate(formattedContent);
        }

        return formattedContent;

    } catch (error) {
        console.error('Error in askMeOpenAi:', error);
        throw error;
    }
}

export default askMeOpenAi;