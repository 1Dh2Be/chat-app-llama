import OpenAI from "openai";
import { API_KEY } from "./apiKey.js"

const openAiClient = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://api.llama-api.com",
    dangerouslyAllowBrowser: true
})

async function askMeOpenAi(ask, messageHistory, onUpdate, selectedModel) {

    let fullResponse = '';

    const systemPrompt = {
        role: 'system',
        content: `Format your responses using markdown.
        When sharing code, use triple backticks with the language name, like this:
        \`\`\`python
        print("Hello World")
        \`\`\`
        Use markdown features for:
        - Code blocks with syntax highlighting
        - Lists
        - Headers
        - Emphasis when needed`
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