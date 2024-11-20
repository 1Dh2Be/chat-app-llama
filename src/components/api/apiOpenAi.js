import OpenAI from "openai";
import { API_KEY } from "./apiKey.js"

const openAiClient = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://api.llama-api.com",
    dangerouslyAllowBrowser: true
})

async function askMeOpenAi(ask, messageHistory, onUpdate) {

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
        model: "llama3.2-11b-vision",
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