import OpenAI from "openai";
import { API_KEY } from "./apiKey.js"
import { useModel } from "../chat-app/components/model-selection/ModelContext.js";

const openAiClient = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://api.llama-api.com",
    dangerouslyAllowBrowser: true
})

async function askMeOpenAi(ask, messageHistory, onUpdate, selectedModel) {

    let fullResponse = '';

    const systemPrompt = {
        role: 'system',
        content: 'Format your responses using markdown'
    }

    const messages = [
        systemPrompt,
        ...messageHistory,
        { role: 'user', content: ask }
    ]

    const stream = await openAiClient.chat.completions.create({
        model: selectedModel,
        messages: messages,
        stream: true,
    });

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        if (onUpdate) onUpdate(fullResponse);
    }
    
    return fullResponse;
}

export default askMeOpenAi